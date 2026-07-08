/**
 * Scroll-driven 3D timeline, reverse-engineered from the reference scene state.
 *
 * The page timeline runs 0 → 1. Anchor elements ([data-tl]) pin timeline
 * percentages to document positions; scroll progress between two anchors is
 * interpolated linearly (matching the reference's positional sequence whose
 * keyframe handles are all linear).
 */

type Keyframe = [position: number, value: number];

export interface ObjectPose {
  px: number;
  py: number;
  pz: number;
  rx: number;
  ry: number;
  rz: number;
}

/* Keyframe tracks for the "Object" group (model + its two point lights). */
const POS_X: Keyframe[] = [
  [0, 0],
  [0.08999999347755844, 0],
  [0.12507142627270104, 0],
  [0.22499998639770272, 0.0036343919856900025],
  [0.25000000977617237, 0.025810745516824826],
  [0.35019999356356285, 0.025810745516824826],
  [0.4001905379341966, 2.113644177859174],
];

const POS_Y: Keyframe[] = [
  [0, -0.8727387364142434],
  [0.08999999347755844, 3.2648407505690358],
  [0.12507142627270104, 3.2648407505690358],
  [0.22499998639770272, -0.00048453749511540023],
  [0.25000000977617237, 3.8231090581218607],
  [0.35019999356356285, 3.8231090581218607],
  [0.4001905379341966, 0],
];

const POS_Z: Keyframe[] = [
  [0, 3.996385590577242],
  [0.08999999347755844, 3.9963855905772427],
  [0.12507142627270104, 3.9963855905772427],
  [0.22499998639770272, 3.9863477717478295],
  [0.25000000977617237, 3.9864075000013943],
  [0.35019999356356285, 3.9864075000013943],
  [0.4001905379341966, 4.65027512027074],
];

const ROT_X: Keyframe[] = [
  [0, -1.5707963267948966],
  [0.08999999347755844, -1.5707963267948966],
  [0.12507142627270104, -1.5707963267948966],
  [0.22499998639770272, 0],
  [0.25000000977617237, 0],
  [0.35019999356356285, 0],
  [0.4001905379341966, 0],
];

const ROT_Y: Keyframe[] = [
  [0, 0],
  [0.08999999347755844, 0],
  [0.12507142627270104, 0],
  [0.22499998639770272, 1.5681030026170655],
  [0.25000000977617237, 1.5681030026170655],
  [0.35019999356356285, 1.5681030026170655],
  [0.4001905379341966, 0],
];

function sample(track: Keyframe[], t: number): number {
  if (t <= track[0][0]) return track[0][1];
  const last = track[track.length - 1];
  if (t >= last[0]) return last[1];
  for (let i = 0; i < track.length - 1; i++) {
    const [p0, v0] = track[i];
    const [p1, v1] = track[i + 1];
    if (t >= p0 && t <= p1) {
      const f = p1 === p0 ? 0 : (t - p0) / (p1 - p0);
      return v0 + (v1 - v0) * f;
    }
  }
  return last[1];
}

export function samplePose(t: number, out: ObjectPose): ObjectPose {
  out.px = sample(POS_X, t);
  out.py = sample(POS_Y, t);
  out.pz = sample(POS_Z, t);
  out.rx = sample(ROT_X, t);
  out.ry = sample(ROT_Y, t);
  out.rz = 0;
  return out;
}

/* ------------------------------------------------------------------ */
/* Anchor → scroll mapping                                             */
/* ------------------------------------------------------------------ */

let anchorMap: { scroll: number; progress: number }[] = [];

export function rebuildAnchorMap(): void {
  if (typeof window === "undefined") return;
  const docH = document.documentElement.scrollHeight;
  const maxScroll = Math.max(1, docH - window.innerHeight);
  const anchors = Array.from(
    document.querySelectorAll<HTMLElement>("[data-tl]"),
  );
  const entries = anchors
    .map((el) => {
      const rect = el.getBoundingClientRect();
      const docY = rect.top + window.scrollY;
      return {
        scroll: (docY / docH) * maxScroll,
        progress: parseFloat(el.dataset.tl || "0"),
      };
    })
    .sort((a, b) => a.scroll - b.scroll);
  anchorMap = entries;
}

export function scrollToProgress(scrollY: number): number {
  if (anchorMap.length === 0) return 0;
  if (scrollY <= anchorMap[0].scroll) return anchorMap[0].progress;
  const last = anchorMap[anchorMap.length - 1];
  if (scrollY >= last.scroll) return last.progress;
  for (let i = 0; i < anchorMap.length - 1; i++) {
    const a = anchorMap[i];
    const b = anchorMap[i + 1];
    if (scrollY >= a.scroll && scrollY <= b.scroll) {
      const f = b.scroll === a.scroll ? 1 : (scrollY - a.scroll) / (b.scroll - a.scroll);
      return a.progress + (b.progress - a.progress) * f;
    }
  }
  return last.progress;
}
