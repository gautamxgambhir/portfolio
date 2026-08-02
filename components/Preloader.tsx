"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

interface PreloaderProps {
  onReveal: () => void;
}

export default function Preloader({ onReveal }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const hasRun     = useRef(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!fontsReady || !textRef.current || !overlayRef.current) return;
    if (hasRun.current) return;
    hasRun.current = true;

    const overlay = overlayRef.current;
    const textEl  = textRef.current;

    gsap.set(".target-cursor-wrapper", { opacity: 0 });

    const split = new GSAPSplitText(textEl, { type: "chars" });
    const chars = split.chars;

    const tl = gsap.timeline();

    // Show the wrapper, then animate chars in from hidden
    tl.set(textEl, { opacity: 1 })
      .set(chars, { y: 60, opacity: 0 })
      .to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.035,
      })
      .to({}, { duration: 0.55 })
      .to(chars, {
        y: -60,
        opacity: 0,
        duration: 0.38,
        ease: "power3.in",
        stagger: 0.018,
      })
      // Curtain slides UP — pure translateY
      .to(overlay, {
        y: "-100%",
        duration: 1.05,
        ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        force3D: true,
        onStart: () => {
          onReveal();
        },
        onComplete: () => {
          split.revert();
          // Fully remove from DOM so it can never appear on scroll
          setDone(true);
        },
      }, "-=0.05");

    return () => { tl.kill(); split.revert(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontsReady]);

  // Once animation is done, render nothing — completely out of DOM
  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#0B0B0D",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
        // Ensure it never scrolls with the page
        pointerEvents: "all",
      }}
    >
      <div
        ref={textRef}
        style={{
          fontSize: "clamp(18px, 2.6vw, 40px)",
          fontWeight: 500,
          color: "#F2EEE9",
          fontFamily: '"Syne", sans-serif',
          letterSpacing: "-0.01em",
          userSelect: "none",
          textAlign: "center",
          lineHeight: 1.4,
          paddingBottom: "0.3em",
          /* Hidden from first paint — GSAP animates it in after fonts load */
          opacity: 0,
        }}
      >
        Turning ideas into reality.
      </div>
    </div>
  );
}
