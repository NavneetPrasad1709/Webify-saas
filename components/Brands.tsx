"use client";

import { SectionHeading, Reveal } from "./ui";

/* eslint-disable @next/next/no-img-element */

const BRANDS = [
  { src: "/images/brand-1.png", name: "Google" },
  { src: "/images/brand-2.png", name: "Sony" },
  { src: "/images/brand-3.png", name: "Apple Music" },
  { src: "/images/brand-4.png", name: "AMG" },
  { src: "/images/brand-5.png", name: "Nike" },
  { src: "/images/brand-6.png", name: "Prada" },
];

/** "Trusted by world leaders." — full-viewport section, logos strip. */
export default function Brands() {
  return (
    <>
      <div data-tl="0.225" className="block h-0 w-full" />
      <section
        data-shot="brands-sec"
        className="flex h-dvh w-full flex-col items-center justify-center gap-24 px-10 max-[992px]:px-5 max-[480px]:relative max-[480px]:h-auto max-[480px]:gap-12 max-[480px]:py-20"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by world leaders."
            subtitle="Teams at the world's most demanding brands run on Vexel."
          />
        </Reveal>
        <div className="flex h-[100px] w-full max-w-[1440px] flex-row items-center justify-center max-[480px]:grid max-[480px]:h-auto max-[480px]:grid-cols-2 max-[480px]:gap-3">
          {BRANDS.map((brand, i) => (
            <Reveal
              key={brand.src}
              delay={i * 0.06}
              className="h-full w-[20%] min-w-0 flex-1 max-[480px]:h-16 max-[480px]:w-full max-[480px]:flex-none"
            >
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-75 transition-opacity duration-300 hover:opacity-100"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
