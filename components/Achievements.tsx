"use client";
import { useRef, useEffect, useState, useCallback } from "react";

/* ── Animated number counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const animate = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const dur = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) animate(); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const STATS = [
  { value: 6, suffix: "+", label: "Years Building", desc: "Started programming at 12, shipped first real product at 13." },
  { value: 10000, suffix: "+", label: "Users Served", desc: "Platforms built at Maximally served India's largest youth hackathon ecosystem." },
  { value: 6, suffix: "", label: "Roles Held", desc: "Across startups, open source, and the hackathon ecosystem." },
  { value: 4, suffix: "", label: "Featured Projects", desc: "Production applications running and actively used by real people." },
];

const ACHIEVEMENTS = [
  {
    label: "01",
    title: "1st Place — CodeDay IIT Delhi",
    desc: "Won first place at CodeDay IIT Delhi, building an innovative software solution under strict hackathon time constraints.",
    accent: "#facc15",
    tag: "Hackathon Win",
  },
  {
    label: "03",
    title: "3rd Place — Counterspell Delhi",
    desc: "Secured third place at Counterspell Delhi, designing and delivering a complete polished product within the event timeframe.",
    accent: "#fb923c",
    tag: "Hackathon Win",
  },
  {
    label: "16",
    title: "Technical Head at 16",
    desc: "Led the full engineering direction of India's largest youth AI hackathon ecosystem at age 16, managing teams and shipping at scale.",
    accent: "#a78bfa",
    tag: "Leadership",
  },
  {
    label: "00",
    title: "Founding Engineer — Maximally",
    desc: "Built Maximally's complete technology infrastructure from zero — architecture, hackathon platform, website, and internal admin systems.",
    accent: "#f43f5e",
    tag: "Product",
  },
  {
    label: "AI",
    title: "Open Source AI Builder",
    desc: "Shipped multiple independent AI-powered tools including an in-game Minecraft AI assistant, used by the open source community.",
    accent: "#22d3ee",
    tag: "Open Source",
  },
  {
    label: "10+",
    title: "Hackathon Mentor",
    desc: "Mentored student teams across multiple hackathons, helping them navigate engineering challenges, debug production-level issues, and ship within tight deadlines.",
    accent: "#4ade80",
    tag: "Community",
  },
  {
    label: "7+",
    title: "7+ Open Source Projects",
    desc: "Built and shipped more than seven public open-source projects spanning AI systems, developer tools, automation, browser extensions, bots, and full-stack web applications.",
    accent: "#38bdf8",
    tag: "Open Source",
  },
];

function StatCard({ item, index }: { item: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(242,238,233,0.15)" : "rgba(242,238,233,0.07)"}`,
        borderRadius: 16,
        padding: "32px 28px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)"
          : "translateY(32px) scale(0.97)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, transform 0.4s cubic-bezier(0.22,1,0.36,1)`,
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      <div style={{
        fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800,
        color: "#F2EEE9", letterSpacing: "-0.04em", lineHeight: 1,
        marginBottom: 8,
        background: "linear-gradient(135deg, #F2EEE9, rgba(242,238,233,0.6))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {visible ? <Counter to={item.value} suffix={item.suffix} /> : `0${item.suffix}`}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,238,233,0.4)", marginBottom: 8 }}>
        {item.label}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(242,238,233,0.55)", margin: 0 }}>
        {item.desc}
      </p>
    </div>
  );
}

function AchievementCard({ item, index }: { item: typeof ACHIEVEMENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${item.accent}09` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? item.accent + "40" : "rgba(242,238,233,0.07)"}`,
        borderRadius: 14,
        padding: "24px 24px 26px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-5px)" : "translateY(0)"
          : "translateY(36px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s, transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.5), inset 0 0 0 1px ${item.accent}20` : "0 2px 12px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 8, flexShrink: 0,
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: item.label.length > 2 ? 11 : 14,
          fontWeight: 800, letterSpacing: "-0.02em",
          color: item.accent,
          boxShadow: hovered ? `0 0 16px ${item.accent}44` : "none",
          transition: "box-shadow 0.3s ease",
        }}>
          {item.label}
        </div>
        <div>
          <span style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: item.accent, background: `${item.accent}18`, border: `1px solid ${item.accent}30`,
            padding: "2px 7px", borderRadius: 4, display: "inline-block", marginBottom: 6,
          }}>{item.tag}</span>
          <h3 style={{
            fontSize: "clamp(14px, 1.1vw, 16px)", fontWeight: 700, color: "#F2EEE9",
            margin: 0, letterSpacing: "-0.02em", lineHeight: 1.3,
          }}>
            {item.title}
          </h3>
        </div>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(242,238,233,0.6)", margin: 0 }}>
        {item.desc}
      </p>
    </div>
  );
}

export default function Achievements() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadingVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      style={{ background: "#0B0B0D", padding: "120px 0 100px", width: "100%", overflow: "hidden" }}
    >
      <div style={{ width: "90%", maxWidth: 1212, margin: "0 auto" }}>
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: 72 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(242,238,233,0.28)", margin: "0 0 10px",
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}>Milestones & Recognition</p>
          <h2 style={{
            fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700, lineHeight: 0.95,
            letterSpacing: "-0.04em", textTransform: "uppercase", color: "#F2EEE9", margin: 0,
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}>Achievements</h2>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 16,
          marginBottom: 72,
        }}>
          {STATS.map((s, i) => <StatCard key={i} item={s} index={i} />)}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(242,238,233,0.1), transparent)",
          marginBottom: 72,
        }} />

        {/* Achievement cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: 16,
        }}>
          {ACHIEVEMENTS.map((a, i) => <AchievementCard key={i} item={a} index={i} />)}
        </div>

        {/* Philosophy quote */}
        <div style={{
          marginTop: 96,
          padding: "40px 48px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(242,238,233,0.07)",
          borderLeft: "3px solid rgba(242,238,233,0.3)",
          borderRadius: "0 12px 12px 0",
        }}>
          <p style={{
            fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 600,
            color: "rgba(242,238,233,0.9)", lineHeight: 1.4, letterSpacing: "-0.02em",
            margin: "0 0 16px", fontStyle: "italic",
          }}>
            &ldquo;I don&rsquo;t just write code.&rdquo;
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(242,238,233,0.55)", margin: 0 }}>
            I build products that automate work, solve real problems, and deliver polished user
            experiences — from the first interaction to production deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
