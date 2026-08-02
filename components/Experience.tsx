"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "Tech Intern",
    company: "Bits&Bytes",
    period: "Jul 2026 – Present",
    tag: "Current",
    tagColor: "#4ade80",
    index: "01",
    desc: "Working with the engineering team on internal platforms, developer infrastructure, and production web applications using modern cloud and backend technologies.",
    highlights: [
      "Building production-grade full-stack applications",
      "Next.js, TypeScript, PostgreSQL, Docker & cloud infrastructure",
      "Contributing to internal engineering systems and developer tooling",
      "Collaborating with senior engineers on scalable architecture",
    ],
  },
  {
    role: "Technical Head",
    company: "Maximally",
    period: "Sep 2025 – May 2026",
    tag: "Leadership",
    tagColor: "#a78bfa",
    index: "02",
    desc: "Led the technical direction for India's largest youth AI hackathon ecosystem — building products from scratch, managing engineering operations, and driving platform development.",
    highlights: [
      "Led technical operations across multiple live products",
      "Managed engineering interns and development workflows",
      "Built scalable platforms serving 10,000+ hackathon participants",
      "AI integrations, auth, databases, and cloud deployment",
    ],
  },
  {
    role: "Lead — Automations & Systems",
    company: "Maximally",
    period: "Aug 2025 – May 2026",
    tag: "Systems",
    tagColor: "#f97316",
    index: "03",
    desc: "Designed automation pipelines powering registrations, judging, communication, and internal operations across the entire organisation.",
    highlights: [
      "Automated repetitive workflows organisation-wide",
      "Built asynchronous communication systems",
      "Significantly reduced manual operational overhead",
      "Integrated APIs and backend services into existing infrastructure",
    ],
  },
  {
    role: "Founding Engineer & Product Lead",
    company: "Maximally",
    period: "Jan 2026 – Apr 2026",
    tag: "Founding",
    tagColor: "#f43f5e",
    index: "04",
    desc: "Built Maximally's entire technology stack from scratch — architecture decisions, hackathon platform, company website, and internal admin systems.",
    highlights: [
      "Designed overall product architecture from ground up",
      "Built and shipped the hackathon platform",
      "Developed the company website",
      "Built internal administration systems",
    ],
  },
  {
    role: "Technical Contributor & Mentor",
    company: "Hackathon Ecosystem",
    period: "2024 – Present",
    tag: "Community",
    tagColor: "#22d3ee",
    index: "05",
    desc: "Mentoring students, helping teams solve technical challenges under pressure, and supporting hackathon infrastructure across multiple events.",
    highlights: [
      "Guided participants during live hackathons",
      "Helped teams debug production-level issues",
      "Assisted with infrastructure setup and deployment",
      "Mentored beginner developers",
    ],
  },
  {
    role: "Independent AI & Automation Builder",
    company: "Open Source",
    period: "2021 – Present",
    tag: "Open Source",
    tagColor: "#facc15",
    index: "06",
    desc: "Building independent products combining AI, automation, developer tooling, and modern web technologies — from idea to deployment, solo.",
    highlights: [
      "Artificial Intelligence & LLM integrations",
      "Automation systems and workflow pipelines",
      "Developer tools, browser extensions, and CLI utilities",
      "Full-stack web applications and open source projects",
    ],
  },
];

/* ─── Canvas Background Atmosphere ────────────────────────── */
function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let H = (canvas.height = canvas.offsetHeight || window.innerHeight);

    type Particle = { x: number; y: number; r: number; speed: number; opacity: number; color: string };
    const particles: Particle[] = [];
    const colors = ["rgba(167,139,250,", "rgba(34,211,238,", "rgba(242,238,233,", "rgba(74,222,128,"];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.35 + 0.1,
        opacity: Math.random() * 0.25 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ─── Spine Energy Beam Canvas ────────────────────────────── */
function SpineCanvas({ activeColor }: { activeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(activeColor);

  useEffect(() => { colorRef.current = activeColor; }, [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let H = (canvas.height = canvas.offsetHeight || 500);
    canvas.width = 24;

    type Spark = { y: number; speed: number; opacity: number; size: number };
    const sparks: Spark[] = [];
    for (let i = 0; i < 8; i++) {
      sparks.push({ y: Math.random() * H, speed: Math.random() * 1.5 + 0.5, opacity: 0, size: Math.random() * 2 + 1 });
    }

    let pulse = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, 24, H);
      pulse = (pulse + 0.02) % (Math.PI * 2);

      const col = colorRef.current;
      const pulseBright = 0.25 + Math.sin(pulse) * 0.1;

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(167,139,250,0.05)");
      grad.addColorStop(0.3, col.replace(")", `,${pulseBright})`).replace("rgb", "rgba"));
      grad.addColorStop(0.7, col.replace(")", `,${pulseBright * 0.8})`).replace("rgb", "rgba"));
      grad.addColorStop(1, "rgba(167,139,250,0.05)");

      ctx.lineWidth = 2;
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(12, H);
      ctx.stroke();

      sparks.forEach((s) => {
        s.y -= s.speed;
        s.opacity = Math.max(0, Math.min(0.8, s.opacity + (s.y > H * 0.1 && s.y < H * 0.9 ? 0.05 : -0.05)));
        if (s.y < -8) { s.y = H + 8; s.opacity = 0; }
        ctx.beginPath();
        ctx.arc(12, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = col.replace(")", `,${s.opacity})`).replace("rgb", "rgba");
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      if (!canvas) return;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: 24, height: "100%", display: "block" }} />;
}

/* ─── Main Component ───────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const N = EXPERIENCES.length;

  useEffect(() => {
    const trigger = containerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger timeline that drives card transforms continuously
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${N * 100}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            // Smoothly calculate active index based on scroll progress
            const rawIdx = self.progress * (N - 1);
            const idx = Math.min(Math.round(rawIdx), N - 1);
            setActiveIndex(idx);
          },
        },
      });

      // Animate card stack: continuously interpolate transform & opacity across keyframes
      EXPERIENCES.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        if (i === 0) {
          // Card 0 starts visible in center, exits up during section 0->1
          tl.to(card, {
            y: -180,
            z: -250,
            rotateX: -10,
            scale: 0.85,
            opacity: 0,
            filter: "blur(6px)",
            ease: "none",
            duration: 1,
          }, 0);
        } else {
          // Card i starts off-screen below, enters center at time (i-1), exits up at time i
          const enterTime = i - 1;
          const exitTime = i;

          // Initial state before entering
          gsap.set(card, {
            y: 180,
            z: -250,
            rotateX: 10,
            scale: 0.85,
            opacity: 0,
            filter: "blur(6px)",
          });

          // Enter to center (time i-1 to i)
          tl.to(card, {
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: 1,
          }, enterTime);

          // If not the last card, exit up to background (time i to i+1)
          if (i < N - 1) {
            tl.to(card, {
              y: -180,
              z: -250,
              rotateX: -10,
              scale: 0.85,
              opacity: 0,
              filter: "blur(6px)",
              ease: "none",
              duration: 1,
            }, exitTime);
          }
        }
      });
    }, trigger);

    return () => ctx.revert();
  }, [N]);

  const activeExp = EXPERIENCES[activeIndex] || EXPERIENCES[0];

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        position: "relative",
        background: "#0c0c0f",
      }}
    >
      {/* Pinned Scene Container */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AtmosphereCanvas />

        {/* Ambient Fog Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(12,12,15,0.85) 100%)",
          }}
        />

        {/* Layout Grid */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            width: "90%",
            maxWidth: 1180,
            height: "80vh",
            alignItems: "stretch",
            margin: "0 auto",
          }}
        >
          {/* LEFT COLUMN: Spine + Indicators */}
          <div
            style={{
              width: 140,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(242,238,233,0.25)",
              }}
            >
              Career Journey
            </div>

            <div style={{ flex: 1, maxHeight: 380, width: 24, position: "relative" }}>
              <SpineCanvas activeColor={activeExp.tagColor} />

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBlock: 6,
                }}
              >
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === activeIndex ? 9 : 5,
                      height: i === activeIndex ? 9 : 5,
                      borderRadius: "50%",
                      background: i <= activeIndex ? exp.tagColor : "rgba(242,238,233,0.15)",
                      boxShadow: i === activeIndex ? `0 0 12px ${exp.tagColor}, 0 0 2px #fff` : "none",
                      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                fontFamily: "'SF Mono','Fira Code',monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(242,238,233,0.3)",
              }}
            >
              0{activeIndex + 1} / 0{N}
            </div>
          </div>

          {/* RIGHT COLUMN: Absolutely Stacked 3D Cards Stage */}
          <div
            style={{
              flex: 1,
              position: "relative",
              perspective: 1000,
              perspectiveOrigin: "50% 50%",
              transformStyle: "preserve-3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Heading */}
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 36,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(242,238,233,0.25)",
                  margin: "0 0 4px",
                }}
              >
                Experience
              </p>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#F2EEE9",
                  margin: 0,
                  lineHeight: 0.95,
                }}
              >
                Career
              </h2>
            </div>

            {/* All Cards stacked ABSOLUTELY in exact same center spot */}
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.index}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: 640,
                  top: "50%",
                  left: "50%",
                  margin: 0,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity, filter",
                  transformStyle: "preserve-3d",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${i === activeIndex ? exp.tagColor + "40" : "rgba(242,238,233,0.08)"}`,
                    borderRadius: 20,
                    padding: "36px 42px 40px",
                    boxShadow: i === activeIndex
                      ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${exp.tagColor}15, inset 0 0 0 1px ${exp.tagColor}20`
                      : "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${exp.tagColor}, transparent)`,
                      opacity: i === activeIndex ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'SF Mono','Fira Code',monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: exp.tagColor,
                      }}
                    >
                      {exp.index}
                    </span>
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: exp.tagColor,
                        background: `${exp.tagColor}18`,
                        border: `1px solid ${exp.tagColor}35`,
                        padding: "3px 10px",
                        borderRadius: 4,
                      }}
                    >
                      {exp.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 30px)",
                      fontWeight: 700,
                      color: "#F2EEE9",
                      margin: "0 0 8px",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.15,
                    }}
                  >
                    {exp.role}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: exp.tagColor,
                      }}
                    >
                      {exp.company}
                    </span>
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "rgba(242,238,233,0.3)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "rgba(242,238,233,0.35)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "rgba(242,238,233,0.65)",
                      margin: "0 0 20px",
                    }}
                  >
                    {exp.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {exp.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: exp.tagColor,
                            flexShrink: 0,
                            marginTop: 6.5,
                            opacity: 0.8,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: "rgba(242,238,233,0.75)",
                          }}
                        >
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Scroll Indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 26,
                  border: "1px solid rgba(242,238,233,0.2)",
                  borderRadius: 10,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 2,
                    height: 5,
                    borderRadius: 2,
                    background: activeExp.tagColor,
                    animation: "scrollPulse 1.8s ease-in-out infinite",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(242,238,233,0.25)",
                }}
              >
                Scroll to explore milestones
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          80% { transform: translateX(-50%) translateY(8px); opacity: 0.1; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
