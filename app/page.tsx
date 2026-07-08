"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Engine from "@/components/Engine";
import FeatureRows from "@/components/FeatureRows";
import Security from "@/components/Security";
import Brands from "@/components/Brands";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import { CardLight } from "@/components/ui";

const Scene = dynamic(() => import("@/components/scene/Scene"), {
  ssr: false,
});

const MIN_LOADER_MS = 1600;

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const ready = sceneReady && minElapsed;

  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), MIN_LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative z-0">
        <Loader done={ready} />
        <SmoothScroll />
        <CardLight />
        <Scene onLoaded={() => setSceneReady(true)} />
        <Navbar />
        <Hero ready={ready} />
        <Engine />
        <FeatureRows />
        <Security />
        <Brands />
        <Testimonials />
        <Stats />
        <Pricing />
        <CTA />
      </main>
    </MotionConfig>
  );
}
