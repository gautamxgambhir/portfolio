"use client";
import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TargetCursor from "@/components/TargetCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const sheetWrapperRef = useRef<HTMLDivElement>(null);

  // Stable reference — never changes
  const handleReveal = useCallback(() => {
    setHeroReady(true);
  }, []);

  /* ── GSAP ScrollTrigger Pinned Layered Transition ── */
  useGSAP(
    () => {
      if (!heroWrapperRef.current || !sheetWrapperRef.current) return;

      const heroEl = heroWrapperRef.current;
      const sheetEl = sheetWrapperRef.current;

      // 1. Pin Hero section during scroll
      const pinTrigger = ScrollTrigger.create({
        trigger: heroEl,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });

      // 2. Fade & scale Hero subtly as sheet moves up over it
      // Timeline starts after a 12% scroll delay so Hero stays crisp initially
      const fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sheetEl,
          start: "top 88%", // Begins overlap animation after 12% scroll
          end: "top top",   // Fully covers Hero when sheet top reaches viewport top
          scrub: true,
        },
      });

      fadeTl.to(heroEl, {
        opacity: 0,
        ease: "power1.out",
        force3D: true,
      });

      return () => {
        pinTrigger.kill();
        fadeTl.kill();
      };
    },
    { scope: heroWrapperRef }
  );

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#F2EEE9"
        cursorColorOnTarget="#F2EEE9"
      />

      <Preloader onReveal={handleReveal} />

      <main className="bg-[#0B0B0D] text-[#F2EEE9] relative w-full overflow-x-hidden p-0 m-0">
        {/* ── Pinned Full-Screen Hero Container (z-index 10) ── */}
        <div
          ref={heroWrapperRef}
          className="relative z-10 w-full h-[100dvh] overflow-hidden m-0 p-0"
          style={{ willChange: "transform, opacity" }}
        >
          <Hero animate={heroReady} />
        </div>

        {/* ── Premium Layered Sheet (z-index 20) — Starts below viewport ── */}
        <div
          ref={sheetWrapperRef}
          className="relative z-20 w-full bg-[#131417] rounded-t-[32px] shadow-[0_-25px_60px_rgba(0,0,0,0.88),0_-1px_2px_rgba(255,255,255,0.06)]"
          style={{
            marginTop: 0, // Zero margin; starts 100% offscreen below viewport on load
            willChange: "transform",
          }}
        >
          <About />
          <Work />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
