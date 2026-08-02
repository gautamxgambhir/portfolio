"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import TypewriterTitle from "./TypewriterTitle";
import TiltedCard from "./TiltedCard";

export default function Work() {
  const [titleDone, setTitleDone] = useState(false);

  return (
    <section
      id="work"
      style={{
        background: "#0B0B0D",
        padding: "100px 0 160px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "95%", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ marginBottom: 16, paddingLeft: "2.5%" }}>
          <TypewriterTitle
            text="Selected Work"
            tag="h2"
            onComplete={() => setTitleDone(true)}
            style={{
              fontSize: "clamp(40px, 6.5vw, 80px)",
              fontWeight: 700,
              color: "#F2EEE9",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(16px, 1.4vw, 20px)",
            color: "rgba(242,238,233,0.72)",
            marginBottom: 56,
            maxWidth: 560,
            lineHeight: 1.6,
            paddingLeft: "2.5%",
          }}
        >
          A selection of projects I&apos;ve shipped: AI systems, automation pipelines,
          full-stack web apps, and developer tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ProjectsShowcase projects={projects} />
        </motion.div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

/* ─────────────────────────────────────────────────────────
   Unified showcase — desktop accordion / mobile overlay
───────────────────────────────────────────────────────── */
function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const close = useCallback(() => setActive(null), []);

  if (isMobile) {
    return <MobileCarousel projects={projects} active={active} setActive={setActive} onClose={close} />;
  }
  return <DesktopAccordion projects={projects} />;
}

/* ─────────────────────────────────────────────────────────
   DESKTOP — existing hover-expand accordion
───────────────────────────────────────────────────────── */
function DesktopAccordion({ projects }: { projects: Project[] }) {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <div
      className="w-full py-4 overflow-x-auto work-scroll"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      onMouseLeave={() => setActiveImage(null)}
    >
      <style>{`.work-scroll::-webkit-scrollbar{display:none}`}</style>
      <div className="flex items-center justify-center gap-3 px-2" style={{ minWidth: "max-content" }}>
        {projects.map((project, index) => {
          const isActive = activeImage === index;
          return (
            <motion.div
              key={project.id}
              className={cn(
                "relative cursor-pointer flex-shrink-0 rounded-3xl",
                isActive
                  ? "bg-transparent border-none shadow-none"
                  : "overflow-hidden border border-white/10 bg-[#1B1C20] shadow-2xl"
              )}
              initial={false}
              animate={{ width: isActive ? "34rem" : "6.5rem", height: "30rem" }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setActiveImage(isActive ? null : index)}
              onHoverStart={() => setActiveImage(index)}
            >
              {isActive ? (
                <TiltedCard
                  imageSrc={project.src}
                  altText={project.name}
                  containerHeight="30rem"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={12}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-[#F2EEE9]" style={{ transformStyle: "preserve-3d" }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent -z-10 rounded-3xl" />
                      <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">{project.code}</span>
                        <div className="flex gap-3">
                          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="cursor-target text-xs font-bold uppercase bg-white text-black px-4 py-2 rounded-full">Live Demo ↗</a>}
                          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="cursor-target text-xs font-bold uppercase bg-black/50 text-[#F2EEE9] backdrop-blur-md px-4 py-2 rounded-full border border-white/15">GitHub ↗</a>}
                          {!project.live && !project.github && <span className="text-xs font-bold uppercase bg-white/10 text-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">Coming Soon</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 max-w-xl" style={{ transformStyle: "preserve-3d" }}>
                        <h3 className="text-3xl font-extrabold tracking-tight" style={{ transform: "translateZ(55px)" }}>{project.name}</h3>
                        <p className="text-sm text-white/75 leading-relaxed" style={{ transform: "translateZ(30px)" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1" style={{ transform: "translateZ(10px)" }}>
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[11px] font-semibold uppercase tracking-wider text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-lg">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              ) : (
                <>
                  <img src={project.src} alt={project.name} className="absolute inset-0 size-full object-cover opacity-60 grayscale-[40%]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#F2EEE9]/60">{project.code}</span>
                    <div className="writing-mode-vertical rotate-180 text-lg font-bold uppercase tracking-wider text-[#F2EEE9]/90 whitespace-nowrap">{project.name}</div>
                    <span className="w-2 h-2 rounded-full bg-[#F2EEE9]/40" />
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOBILE — snap carousel + floating overlay card
───────────────────────────────────────────────────────── */
function MobileCarousel({
  projects,
  active,
  setActive,
  onClose,
}: {
  projects: Project[];
  active: number | null;
  setActive: (i: number | null) => void;
  onClose: () => void;
}) {
  const CARD_W = 90;
  const CARD_H = 370;

  return (
    <div style={{ position: "relative" }}>
      {/* ── Carousel row (constant height, never reflowed) ── */}
      <div
        style={{
          overflowX: "auto",
          overflowY: "visible",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 8,
        } as React.CSSProperties}
      >
        <style>{`.mobile-carousel::-webkit-scrollbar{display:none}`}</style>
        <div
          className="mobile-carousel"
          style={{
            display: "flex",
            gap: 12,
            paddingLeft: 20,
            paddingRight: 20,
            minWidth: "max-content",
            height: CARD_H,
          }}
        >
          {projects.map((project, index) => {
            const isActive = active === index;
            return (
              <motion.div
                key={project.id}
                onClick={() => setActive(isActive ? null : index)}
                animate={{
                  opacity: active !== null && !isActive ? 0.25 : 1,
                  filter: active !== null && !isActive ? "blur(3px) brightness(0.6)" : "none",
                  scale:  active !== null && !isActive ? 0.95 : 1,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  scrollSnapAlign: "center",
                  flex: "0 0 auto",
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 28,
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#1B1C20",
                  cursor: "pointer",
                }}
              >
                <img
                  src={project.src}
                  alt={project.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.75) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "16px 8px", pointerEvents: "none" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,238,233,0.55)" }}>{project.code}</span>
                  {/* Vertical title */}
                  <div style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontSize: 13,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(242,238,233,0.92)",
                    whiteSpace: "nowrap",
                    maxHeight: CARD_H - 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {project.name}
                  </div>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(242,238,233,0.4)" }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Cinematic poster overlay — portalled to body ── */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {active !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.8)" }}
              />

              {/* Poster card */}
              <motion.div
                key={`poster-${active}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: 0, left: 0, right: 0, bottom: 0,
                  margin: "auto",
                  zIndex: 9001,
                  width: "min(88vw, 340px)",
                  height: "min(78vh, 580px)",
                  borderRadius: 28,
                  overflow: "hidden",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                {active !== null && (() => {
                  const p = projects[active];
                  return (
                    <>
                      {/* ── Full-bleed background artwork ── */}
                      <img
                        src={p.src}
                        alt={p.name}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "center",
                          filter: "blur(15px) brightness(0.38) saturate(0.8)",
                          transform: "scale(1.1)",
                          zIndex: 0,
                        }}
                      />

                      {/* Top + bottom gradient darkening */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 35%, transparent 60%, rgba(10,10,10,0.7) 100%)",
                      }} />

                      {/* Vignette */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
                      }} />

                      {/* Glass layer */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: "rgba(0,0,0,0.12)",
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                      }} />

                      {/* ── Centered content — NO image, NO logo ── */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 2,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        padding: "36px 28px",
                        gap: 0,
                        textShadow: "0 4px 20px rgba(0,0,0,0.45)",
                      }}>

                        {/* Code badge */}
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.12, duration: 0.35 }}
                          style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
                            marginBottom: 8,
                          }}
                        >
                          {p.code}
                        </motion.span>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                          style={{
                            fontSize: 26, fontWeight: 900,
                            color: "#F2EEE9", textAlign: "center",
                            letterSpacing: "-0.02em", lineHeight: 1.15,
                            marginBottom: 12,
                          }}
                        >
                          {p.name}
                        </motion.h3>

                        {/* Description — max 3 lines, fade clamp */}
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
                          style={{
                            fontSize: 13, lineHeight: 1.6,
                            color: "rgba(242,238,233,0.65)",
                            textAlign: "center",
                            marginBottom: 18,
                            /* 3-line clamp with fade */
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            maxWidth: "100%",
                          } as React.CSSProperties}
                        >
                          {p.description}
                        </motion.div>

                        {/* Tech tags — centered, max 2 rows */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.27, duration: 0.4 }}
                          style={{
                            display: "flex", flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 6, marginBottom: 24,
                            maxHeight: 56, overflow: "hidden",
                          }}
                        >
                          {p.tags.slice(0, 5).map((tag, ti) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.28 + ti * 0.04, duration: 0.3 }}
                              style={{
                                fontSize: 10, fontWeight: 600,
                                textTransform: "uppercase", letterSpacing: "0.07em",
                                color: "rgba(242,238,233,0.7)",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                padding: "4px 10px", borderRadius: 20,
                                backdropFilter: "blur(4px)",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                          {p.tags.length > 5 && (
                            <span style={{
                              fontSize: 10, fontWeight: 600,
                              color: "rgba(242,238,233,0.35)",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              padding: "4px 10px", borderRadius: 20,
                            }}>+{p.tags.length - 5}</span>
                          )}
                        </motion.div>

                        {/* CTA button */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.38, duration: 0.4, ease: "easeOut" }}
                          style={{ width: "75%" }}
                        >
                          {p.live ? (
                            <a href={p.live} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: "block", textAlign: "center",
                                fontSize: 13, fontWeight: 800,
                                textTransform: "uppercase", letterSpacing: "0.08em",
                                color: "#0B0B0D", background: "#F2EEE9",
                                padding: "13px 20px", borderRadius: 16,
                                textDecoration: "none",
                                boxShadow: "0 4px 20px rgba(242,238,233,0.25)",
                              }}>
                              Live Demo ↗
                            </a>
                          ) : p.github ? (
                            <a href={p.github} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: "block", textAlign: "center",
                                fontSize: 13, fontWeight: 800,
                                textTransform: "uppercase", letterSpacing: "0.08em",
                                color: "#F2EEE9",
                                background: "rgba(255,255,255,0.12)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                backdropFilter: "blur(8px)",
                                padding: "13px 20px", borderRadius: 16,
                                textDecoration: "none",
                              }}>
                              GitHub ↗
                            </a>
                          ) : (
                            <span style={{
                              display: "block", textAlign: "center",
                              fontSize: 13, fontWeight: 700,
                              textTransform: "uppercase", letterSpacing: "0.08em",
                              color: "rgba(242,238,233,0.35)",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              padding: "13px 20px", borderRadius: 16,
                            }}>
                              Coming Soon
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
