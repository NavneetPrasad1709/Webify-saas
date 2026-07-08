"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, PerformanceMonitor } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { samplePose, scrollToProgress, rebuildAnchorMap } from "@/lib/timeline";

useGLTF.setDecoderPath("/draco/");

const MODEL_URL = "/3d/model.glb";
const ALPHA_MAP_URL = "/3d/alpha-map.png";

/** GLB model with the reference's physical-material override applied. */
function Model() {
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, scene);

  const alphaMap = useMemo(() => {
    const tex = new THREE.TextureLoader().load(ALPHA_MAP_URL);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  useEffect(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#006cff"),
      emissive: new THREE.Color("#65a5ff"),
      emissiveIntensity: 1,
      metalness: 1,
      roughness: 1,
      alphaMap,
      alphaTest: 0.1,
      transparent: false,
      side: THREE.FrontSide,
      specularIntensity: 0,
      reflectivity: 0.5,
    });
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const prev = mesh.material as THREE.MeshStandardMaterial;
        if (prev?.map) {
          material.map = prev.map;
          material.map.wrapS = THREE.RepeatWrapping;
          material.map.wrapT = THREE.RepeatWrapping;
        }
        mesh.material = material;
        mesh.receiveShadow = true;
      }
    });
  }, [scene, alphaMap]);

  useEffect(() => {
    const action = actions["Animation"];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.timeScale = 0.5;
      action.play();
    }
  }, [actions]);

  return <primitive object={scene} scale={1.5} />;
}

/**
 * Object rig: model + the two coloured point lights move together,
 * driven by the scroll timeline.
 */
function ObjectRig() {
  const group = useRef<THREE.Group>(null);
  const pose = useMemo(
    () => ({ px: 0, py: 0, pz: 0, rx: 0, ry: 0, rz: 0 }),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const t = scrollToProgress(window.scrollY);
    samplePose(t, pose);
    group.current.position.set(pose.px, pose.py, pose.pz);
    group.current.rotation.set(pose.rx, pose.ry, pose.rz);
  });

  return (
    <group ref={group}>
      <Model />
      {/* Reference intensities (25) predate three's physical light units — ×π restores the legacy energy. */}
      <pointLight
        color="#18caff"
        intensity={25 * Math.PI}
        distance={20}
        decay={1.76}
        position={[-1.0800012920987254, -0.9419390674979656, 1.2214126197837032]}
      />
      <pointLight
        color="#00e7ff"
        intensity={25 * Math.PI}
        distance={34.15}
        decay={0}
        position={[0.8663944921239622, 1.1823807542632467, 1.2214126197837032]}
      />
    </group>
  );
}

/** Mouse-tilt camera (±1°, ~0.6s easing), matching the TILT control. */
function TiltCamera() {
  const { camera, size } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      const MAX = 0.017453292519943295;
      target.current.x = -ny * MAX;
      target.current.y = -nx * MAX;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = 30;
    cam.position.set(0, -0.02141615313266465, 8.391871340979279);
    cam.zoom = size.width < 992 ? 0.7 : 1;
    cam.updateProjectionMatrix();
  }, [camera, size.width]);

  useFrame((_, delta) => {
    const k = 1 - Math.exp((-4 * delta) / 0.6);
    camera.rotation.x += (target.current.x - camera.rotation.x) * k;
    camera.rotation.y += (target.current.y - camera.rotation.y) * k;
  });

  return null;
}

/** Rebuilds the anchor map when layout changes. */
function AnchorSync() {
  useEffect(() => {
    rebuildAnchorMap();
    const onResize = () => rebuildAnchorMap();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => rebuildAnchorMap());
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);
  return null;
}

export default function Scene({ onLoaded }: { onLoaded?: () => void }) {
  const [dpr, setDpr] = useState<number>(1.5);
  const baseDpr = useRef(1.5);

  useEffect(() => {
    baseDpr.current = Math.min(window.devicePixelRatio, 2);
    setDpr(baseDpr.current);
  }, []);

  return (
    <div id="scene" className="fixed inset-0 -z-10 h-screen w-screen bg-black">
      <AnchorSync />
      <Canvas
        dpr={dpr}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{
          fov: 30,
          near: 0.1,
          far: 1000,
          position: [0, -0.02141615313266465, 8.391871340979279],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
          onLoaded?.();
        }}
      >
        {/* Hold 60fps on weak GPUs by scaling render resolution, never below 0.7× */}
        <PerformanceMonitor
          onDecline={() => setDpr(Math.max(0.7 * baseDpr.current, 1))}
          onIncline={() => setDpr(baseDpr.current)}
        />
        <ambientLight color="#ffffff" intensity={2} />
        <Suspense fallback={null}>
          <ObjectRig />
        </Suspense>
        <TiltCamera />
        <EffectComposer multisampling={4}>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.02849}
            radius={0.75}
            mipmapBlur
            blendFunction={BlendFunction.ADD}
          />
          <HueSaturation hue={-0.22235494670407757} saturation={0.21} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
