"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToAnchor } from "./ui";

/* eslint-disable @next/next/no-img-element */

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastY = useRef(0);

  /* Hide on scroll-down, reveal on scroll-up — the nav never lingers
   * over mid-page content. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Menu open: lock scroll, move focus in; Escape closes. */
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      burgerRef.current?.focus();
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToAnchor(href);
  };

  return (
    <header
      className="fixed top-0 z-[999999] w-full transition-transform duration-500 ease-[var(--ease-brand)]"
      style={{
        transform: hidden && !open ? "translateY(-110%)" : "translateY(0)",
      }}
    >
      <div className="relative flex w-full flex-row items-center justify-between px-10 py-5 max-[992px]:px-5 max-[480px]:h-[70px]">
        {/* Logo */}
        <a href="#" aria-label="Vexel home" className="flex items-center" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img
            src="/images/logo-white.svg"
            alt="Vexel"
            className="w-[104px] max-[992px]:w-[80px]"
          />
        </a>

        {/* Desktop pill */}
        <nav
          aria-label="Primary"
          className={`glass flex items-center justify-center rounded-full border transition-colors duration-500 max-[480px]:hidden ${
            scrolled
              ? "border-white/12 bg-black/85"
              : "border-white/8 bg-[#14141433]"
          }`}
        >
          <div className="flex flex-row items-center gap-7 py-2 pr-2.5 pl-9 max-[992px]:gap-4 max-[992px]:pl-5">
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={go(href)}
                className="-my-1 cursor-pointer px-1 py-3 text-[15px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap text-white/85 transition-colors duration-200 hover:text-white max-[992px]:text-sm"
              >
                {label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={go("#pricing")}
              className="group flex cursor-pointer items-center gap-2.5 rounded-full bg-white py-2.5 pr-2 pl-4 transition-transform duration-300 ease-[var(--ease-brand)] hover:scale-[1.03]"
            >
              <span className="text-sm leading-none font-semibold tracking-[-0.01em] text-black">
                Get Started
              </span>
              <img
                src="/images/arrow.png"
                alt=""
                className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45"
              />
            </a>
          </div>
        </nav>

        {/* Invisible logo (layout symmetry) */}
        <div className="flex items-center opacity-0 max-[480px]:hidden" aria-hidden>
          <img src="/images/logo-white.svg" alt="" className="w-[104px] max-[992px]:w-[80px]" />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={burgerRef}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="hidden max-[480px]:flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white p-2.5"
        >
          <img src="/images/menu.png" alt="" className="w-full" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 z-[1] w-full border-b border-white/10 bg-black"
          >
            <div className="relative flex h-[70px] w-full flex-row items-center justify-between px-5 py-5">
              <img src="/images/logo-white.svg" alt="Vexel" className="w-[80px]" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white p-2.5"
              >
                <img src="/images/close.png" alt="" className="w-full" />
              </button>
            </div>
            <div className="flex w-full flex-col items-start gap-7 px-5 pt-4 pb-10">
              {LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  onClick={go(href)}
                  className="display py-1 text-3xl tracking-[-0.02em] text-white"
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={go("#pricing")}
                className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-full bg-white py-3 pr-3 pl-5"
              >
                <span className="text-sm leading-none font-semibold text-black">
                  Get Started
                </span>
                <img src="/images/arrow.png" alt="" className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
