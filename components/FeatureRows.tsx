"use client";

import { PillButton, Reveal, ZoomParallax } from "./ui";

/* eslint-disable @next/next/no-img-element */

const ROWS = [
  {
    eyebrow: "Answer",
    title: "Every Lead Answered in Seconds",
    body: "Vexel replies the moment a lead reaches out — on your site, by email, or in chat. No queues, no missed conversations, no cold leads going colder.",
    cta: "See It in Action",
    image: "/images/feature-1.png",
    reverse: false,
  },
  {
    eyebrow: "Qualify",
    title: "Hot Leads, Automatically Routed",
    body: "The agent scores intent inside the conversation and hands high-value prospects straight to your reps — with full context, not just a name.",
    cta: "See How Routing Works",
    image: "/images/feature-2.png",
    reverse: true,
  },
  {
    eyebrow: "Convert",
    title: "Meetings Booked While You Sleep",
    body: "Vexel proposes times, books the meeting, and syncs everything to your CRM automatically. Your pipeline fills itself — around the clock.",
    cta: "Start Converting",
    image: "/images/feature-3.png",
    reverse: false,
  },
];

export default function FeatureRows() {
  return (
    <section
      id="features"
      className="vignette-top relative flex min-h-[75px] w-full flex-row items-center justify-center bg-black px-10 py-[120px] max-[992px]:px-5 max-[480px]:py-20"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 max-[480px]:gap-20">
        {ROWS.map((row) => (
          <div
            key={row.title}
            data-shot={row.title}
            className="flex w-full flex-row items-center justify-between gap-20 py-10 max-[992px]:gap-10 max-[480px]:flex-col max-[480px]:gap-6 max-[480px]:py-0"
          >
            {row.reverse ? (
              <>
                <RowImage row={row} entrance={-24} className="max-[480px]:hidden" />
                <RowCopy row={row} entrance={24} />
                <RowImage row={row} entrance={0} className="hidden max-[480px]:flex" />
              </>
            ) : (
              <>
                <RowCopy row={row} entrance={-24} />
                <RowImage row={row} entrance={24} />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function RowCopy({
  row,
  entrance,
}: {
  row: (typeof ROWS)[number];
  entrance: number;
}) {
  return (
    <Reveal x={entrance} className="flex w-full max-w-[440px] flex-col items-start gap-5 max-[480px]:gap-4">
      <span className="eyebrow">{row.eyebrow}</span>
      <h3 className="display text-[clamp(1.75rem,2.8vw,3rem)] leading-[1.05] max-[480px]:text-[1.65rem]">
        {row.title}
      </h3>
      <p className="text-lg leading-[1.55] font-normal tracking-[-0.01em] text-white/80 max-[992px]:text-base max-[480px]:text-[17px]">
        {row.body}
      </p>
      <PillButton variant="ghost" href="#pricing" className="mt-3">
        {row.cta}
      </PillButton>
    </Reveal>
  );
}

function RowImage({
  row,
  entrance,
  className = "",
}: {
  row: (typeof ROWS)[number];
  entrance: number;
  className?: string;
}) {
  return (
    <Reveal
      x={entrance}
      className={`card w-[46%] rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-60px_rgba(24,202,255,0.25)] max-[480px]:w-full ${className}`}
    >
      <ZoomParallax className="rounded-2xl">
        <div className="flex items-center justify-center p-8 max-[992px]:p-5">
          <img
            src={row.image}
            alt={row.title}
            loading="lazy"
            decoding="async"
            className="max-h-[420px] w-full object-contain max-[480px]:max-h-[220px]"
          />
        </div>
      </ZoomParallax>
    </Reveal>
  );
}
