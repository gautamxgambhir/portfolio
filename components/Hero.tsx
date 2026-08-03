"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import AvatarPill from "./AvatarPill";
import Silk from "./Silk";

interface HeroProps {
  animate?: boolean;
}

export default function Hero({ animate = false }: HeroProps) {
  const navRef     = useRef<HTMLDivElement>(null);
  const gautamRef  = useRef<HTMLSpanElement>(null);
  const gambhirRef = useRef<HTMLSpanElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const sub1Ref    = useRef<HTMLDivElement>(null);
  const sub2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(".target-cursor-wrapper", { opacity: 0 });
    gsap.set(
      [navRef.current, gautamRef.current, gambhirRef.current,
       imgRef.current, sub1Ref.current, sub2Ref.current],
      { y: 80, opacity: 0, force3D: true }
    );
  }, []);

  useEffect(() => {
    if (!animate) return;
    gsap.to(".target-cursor-wrapper, .target-cursor-label", {
      opacity: 1, duration: 0.5, delay: 0.6, ease: "power2.out",
    });
    const tl = gsap.timeline();
    tl.to(navRef.current,    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", force3D: true })
      .to(gautamRef.current,  { y: 0, opacity: 1, duration: 1.0, ease: "power4.out", force3D: true }, "-=0.5")
      .to(gambhirRef.current, { y: 0, opacity: 1, duration: 1.0, ease: "power4.out", force3D: true }, "-=0.8")
      .to(imgRef.current,     { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", force3D: true }, "-=0.65")
      .to([sub1Ref.current, sub2Ref.current], {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out", force3D: true,
      }, "-=0.5");
    return () => { tl.kill(); };
  }, [animate]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        background: "#0B0B0D",
      }}
    >
      {/* Silk background */}
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
        <Silk speed={4.0} scale={0.6} color="#555555" noiseIntensity={1.8} rotation={0} />
      </div>
      <div style={{
        position:"absolute", inset:0, zIndex:1,
        background:"rgba(11,11,13,0.65)", pointerEvents:"none",
      }} />

      {/* ── Nav ── */}
      <div ref={navRef} style={{
        position:"absolute", top:24, left:"50%", transform:"translateX(-50%)",
        width:"90%", maxWidth:1440,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        zIndex:10, gap:16,
      }}>
        <a
          href="https://calendly.com/d/d3vz-jdf-jgw"
          target="_blank" rel="noopener noreferrer"
          className="cursor-target cursor-magnetic"
          data-cursor-label="Book a meeting!"
        >
          <button style={{
            border:"1px solid rgba(242,238,233,0.2)", borderRadius:6,
            padding:"7px 14px", fontSize:"clamp(10px,1.8vw,13px)", fontWeight:700,
            color:"#F2EEE9", background:"rgba(255,255,255,0.03)",
            letterSpacing:"0.06em", fontFamily:"inherit", whiteSpace:"nowrap",
          }}>GET IN TOUCH</button>
        </a>
        <div style={{ display:"flex", gap:"clamp(16px,3vw,40px)" as unknown as number }}>
          <a href="https://github.com/gautamxgambhir" target="_blank" rel="noopener noreferrer"
            className="cursor-target cursor-magnetic" data-cursor-label="See my code on GitHub"
            style={{ fontSize:"clamp(13px,1.8vw,16px)", fontWeight:600, color:"#F2EEE9", textDecoration:"none", whiteSpace:"nowrap" }}>
            GitHub
          </a>
          <a href="https://linkedin.com/in/gautamgambhir" target="_blank" rel="noopener noreferrer"
            className="cursor-target cursor-magnetic" data-cursor-label="Let's connect on LinkedIn"
            style={{ fontSize:"clamp(13px,1.8vw,16px)", fontWeight:600, color:"#F2EEE9", textDecoration:"none", whiteSpace:"nowrap" }}>
            LinkedIn
          </a>
        </div>
      </div>

      {/* ── Name + Avatar ── */}
      <div style={{
        position:"relative", zIndex:5,
        flex:1,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        paddingTop:80, paddingBottom:120,
      }}>
        <div style={{ position:"relative", textAlign:"center", width:"100vw" }}>

          {/* GAUTAM */}
          <div style={{ overflow:"visible", lineHeight:1 }}>
            <span ref={gautamRef} style={{
              display:"block",
              fontSize:"clamp(72px, 18vw, 280px)",
              fontFamily:'"Bebas Neue", sans-serif',
              fontWeight:400,
              lineHeight:0.85,
              color:"#F2EEE9",
              letterSpacing:"0.02em",
              whiteSpace:"nowrap",
            }}>Gautam</span>
          </div>

          {/* GAMBHIR */}
          <div style={{ overflow:"visible", lineHeight:1 }}>
            <span ref={gambhirRef} style={{
              display:"block",
              fontSize:"clamp(72px, 18vw, 280px)",
              fontFamily:'"Bebas Neue", sans-serif',
              fontWeight:400,
              lineHeight:0.85,
              color:"#F2EEE9",
              letterSpacing:"0.02em",
              whiteSpace:"nowrap",
            }}>Gambhir</span>
          </div>

          {/* Avatar — hidden on mobile (≤640px), visible on desktop */}
          <div
            ref={imgRef}
            data-avatar="true"
            style={{
              position:"absolute",
              top:"50%", left:"50%",
              transform:"translate(-50%, -50%)",
              zIndex:6,
            }}
          >
            <AvatarPill />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          [data-avatar="true"] { display: none !important; }
        }
      `}</style>

      {/* ── Bottom captions ── */}
      <div style={{
        position:"absolute", bottom:24,
        width:"90%", maxWidth:1440,
        left:"50%", transform:"translateX(-50%)",
        display:"flex",
        /* Stack vertically on narrow screens, side-by-side on wide */
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        alignItems:"flex-end",
        gap:12,
        zIndex:10,
      }}>
        <div ref={sub1Ref} style={{ maxWidth:420, minWidth:0, flex:"1 1 200px" }}>
          <p style={{ fontSize:"clamp(12px,1.3vw,15px)", fontWeight:500, color:"rgba(242,238,233,0.72)", lineHeight:1.55, margin:0 }}>
            Full-Stack Developer, Designer · AI Builder · Automation Engineer.<br />
            Open to internships, freelance work, and startup opportunities.
          </p>
        </div>
        <div ref={sub2Ref} style={{ maxWidth:380, minWidth:0, flex:"1 1 180px", textAlign:"right" }}>
          <p style={{ fontSize:"clamp(12px,1.3vw,15px)", fontWeight:600, color:"rgba(242,238,233,0.72)", lineHeight:1.55, margin:0 }}>
            Turning ideas into reality —<br />
            building from New Delhi, India.
          </p>
        </div>
      </div>

      {/* Responsive overrides via <style> — no extra deps needed */}
      <style>{`
        @media (max-width: 640px) {
          #home-sub-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          #home-sub-row > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
