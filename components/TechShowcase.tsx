"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaFigma,
  FaLinux,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiThreedotjs,
  SiSupabase,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

export const TECHS = [
  { name: "React", Icon: FaReact, desc: "3+ years building SPAs, component libraries, and complex state-managed UIs with hooks, context, and custom renderers." },
  { name: "Next.js", Icon: SiNextdotjs, desc: "Go-to framework for production. SSR, ISR, App Router, edge functions — shipped 10+ Next.js products to production." },
  { name: "TypeScript", Icon: SiTypescript, desc: "Strong typing across every project. Generics, discriminated unions, utility types — TypeScript-first always." },
  { name: "JavaScript", Icon: SiJavascript, desc: "Deep ES2020+ knowledge. Closures, event loop, prototype chain, async patterns — fluent at the language level." },
  { name: "Node.js", Icon: FaNodeJs, desc: "REST APIs, WebSockets, cron jobs, streaming — built and deployed Node servers on VMs, containers, and edge runtimes." },
  { name: "Python", Icon: FaPython, desc: "Scripting, data processing, FastAPI micro-services, and AI/ML integrations including LangChain pipelines." },
  { name: "Tailwind", Icon: SiTailwindcss, desc: "Utility-first CSS power user. Design systems, responsive layouts, dark modes, and custom plugins — daily driver." },
  { name: "GSAP", Icon: SiGreensock, desc: "High-performance animations: ScrollTrigger, Flip, SplitText timelines. GSAP is the backbone of premium motion on this portfolio." },
  { name: "Framer", Icon: SiFramer, desc: "Spring animations, layout transitions, gesture-driven UIs, and shared layouts — Framer Motion for everything fluid." },
  { name: "Three.js", Icon: SiThreedotjs, desc: "Shader materials, instanced meshes, custom post-processing, and real-time 3D scenes — including this very showcase." },
  { name: "Supabase", Icon: SiSupabase, desc: "Auth, Postgres, realtime subscriptions, and edge functions — Supabase powers the back-end of several shipped SaaS apps." },
  { name: "PostgreSQL", Icon: SiPostgresql, desc: "Relational data modelling, complex joins, indexing strategies, and query optimisation for high-traffic workloads." },
  { name: "Docker", Icon: FaDocker, desc: "Containerised development and deployment. Compose stacks, multi-stage builds, and Docker-in-CI/CD pipelines." },
  { name: "Git", Icon: FaGitAlt, desc: "Branching strategies, conventional commits, interactive rebases — disciplined version control on every project." },
  { name: "GitHub", Icon: FaGithub, desc: "Actions workflows, protected branches, code review, and GitHub Pages — GitHub as the full DevOps platform." },
  { name: "Vercel", Icon: SiVercel, desc: "Instant deployments, edge network, preview environments, and Analytics — Vercel for front-end at the speed of light." },
  { name: "AWS", Icon: FaAws, desc: "EC2, S3, Lambda, CloudFront, and RDS for scalable, reliable infrastructure behind production workloads." },
  { name: "OpenAI", Icon: RiOpenaiFill, desc: "GPT-4, embeddings, function-calling, and RAG pipelines — integrated AI features into multiple client products." },
  { name: "Figma", Icon: FaFigma, desc: "Design-to-code fluency. Auto-layout, component variants, prototyping — bridge between design and engineering." },
  { name: "Linux", Icon: FaLinux, desc: "Daily driver OS. Shell scripting, process management, cron, systemd, and comfortable on the command line." },
];

const TOTAL = TECHS.length;

function TechModal({ index, onClose }: { index: number; onClose: () => void }) {
  const tech = TECHS[index];
  const IconComponent = tech.Icon;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(16,16,18,0.95)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 24,
          padding: "40px 44px",
          maxWidth: 480,
          width: "90%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "rgba(242,238,233,0.7)",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ×
        </button>
        <div style={{ fontSize: 44, marginBottom: 16, color: "#F2EEE9" }}>
          <IconComponent />
        </div>
        <h3 style={{ fontSize: 28, fontWeight: 700, fontFamily: '"Ubuntu", sans-serif', color: "#F2EEE9", letterSpacing: "-0.02em", marginBottom: 16 }}>
          {tech.name}
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.7, fontFamily: '"Ubuntu", sans-serif', fontWeight: 400, color: "rgba(242,238,233,0.72)" }}>
          {tech.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function TechShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    if (hoveredIndex !== null || modalIndex !== null) return;
    let animationFrameId: number;
    const animate = () => {
      setAngleOffset((prev) => (prev + 0.003) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredIndex, modalIndex]);

  const closeModal = useCallback(() => setModalIndex(null), []);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: 380, overflow: "hidden", perspective: 1200 }}>
        <AnimatePresence>
          {hoveredIndex !== null && modalIndex === null && (
            <motion.div
              key="label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                translateX: "-50%",
                zIndex: 50,
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(10,10,12,0.85)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(242,238,233,0.9)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}>
                {TECHS[hoveredIndex].name}
                <span style={{ opacity: 0.45 }}>click to learn more</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {TECHS.map((tech, i) => {
            const angle = ((i / TOTAL) * Math.PI * 2 + angleOffset) % (Math.PI * 2);
            // Oval 3D mapping
            const radiusX = 460;
            const radiusZ = 160;
            const x = Math.cos(angle) * radiusX;
            const z = Math.sin(angle) * radiusZ;
            
            // Normalize frontness depth (0 = back, 1 = front-center)
            const frontness = (z + radiusZ) / (radiusZ * 2);
            
            // Only render front facing items for clarity
            if (z < -radiusZ * 0.45) return null;

            const isHovered = hoveredIndex === i;
            const scale = isHovered ? 1.3 : 0.45 + frontness * 0.65;
            const opacity = isHovered ? 1 : Math.max(0.1, Math.min(1, frontness * 1.4));
            const glow = frontness > 0.85 || isHovered;

            const IconComp = tech.Icon;

            return (
              <div
                key={tech.name}
                className="cursor-target"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setModalIndex(i)}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% - 40px)`,
                  width: 100,
                  height: 100,
                  marginLeft: -50,
                  marginTop: -50,
                  transform: `translate3d(0,0,${z}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(z + 500) + (isHovered ? 1000 : 0),
                  transition: "opacity 0.4s ease-out, transform 0.3s cubic-bezier(0.2,0,0,1)",
                  cursor: "pointer",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 24,
                    background: glow ? "rgba(28,28,32,0.96)" : "rgba(16,16,18,0.92)",
                    border: glow ? "1.5px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: glow
                      ? "0 0 30px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : "0 8px 24px rgba(0,0,0,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    userSelect: "none",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.5s ease-out, border 0.5s ease-out, box-shadow 0.5s ease-out",
                  }}
                >
                  <div style={{ fontSize: 32, color: glow ? "#FFFFFF" : "rgba(242,238,233,0.7)", transition: "color 0.5s ease-out, transform 0.5s ease-out" }}>
                    <IconComp />
                  </div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 500,
                    fontFamily: '"Ubuntu", sans-serif',
                    color: glow ? "rgba(255,255,255,0.9)" : "rgba(242,238,233,0.4)",
                    transition: "color 0.5s ease-out",
                    letterSpacing: "0.02em",
                  }}>
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <TechModal key={modalIndex} index={modalIndex} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
