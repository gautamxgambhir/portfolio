"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt,
  FaGithub, FaFigma, FaHtml5, FaCss3Alt, FaLinux,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiGreensock, SiFramer, SiThreedotjs, SiSupabase,
  SiPostgresql, SiVercel, SiMongodb,
  SiFirebase, SiGraphql, SiSass, SiFlask, SiFastapi,
   SiGooglegemini,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

export interface TechElement {
  num: number;
  symbol: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "AI & Automation" | "Cloud & DevOps";
  categoryColor: string;
  weight: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  gridPos: { row: number; col: number };
}

export const PERIODIC_TECHS: TechElement[] = [
  // Row 1 – Languages (sparse like Period 1 & 2)
  { num: 1,  symbol: "Py", name: "Python",     category: "Languages",      categoryColor: "#f7df1e", weight: "3.12",  Icon: FaPython,      desc: "Scripting, data processing, FastAPI micro-services, AI/ML integrations, and automation pipelines.", gridPos: { row: 1, col: 1  } },
  { num: 2,  symbol: "Js", name: "JavaScript", category: "Languages",      categoryColor: "#f7df1e", weight: "ES2024", Icon: SiJavascript,  desc: "Deep ES2020+ knowledge. Closures, event loop, async patterns, prototype chain — fluent at the language level.", gridPos: { row: 1, col: 10 } },

  // Row 2
  { num: 3,  symbol: "Ts", name: "TypeScript", category: "Languages",      categoryColor: "#f7df1e", weight: "5.4",   Icon: SiTypescript,  desc: "Strong typing across every project. Generics, discriminated unions, utility types — TypeScript-first always.", gridPos: { row: 2, col: 1  } },
  { num: 4,  symbol: "Ht", name: "HTML5",      category: "Frontend",       categoryColor: "#61dafb", weight: "5.0",   Icon: FaHtml5,       desc: "Semantic HTML markup, accessibility (a11y), SEO optimisation, and clean DOM structure.", gridPos: { row: 2, col: 2  } },
  { num: 5,  symbol: "Re", name: "React",      category: "Frontend",       categoryColor: "#61dafb", weight: "18.3",  Icon: FaReact,       desc: "3+ years building SPAs, component libraries, and complex state-managed UIs with hooks and context.", gridPos: { row: 2, col: 5  } },
  { num: 6,  symbol: "Nx", name: "Next.js",    category: "Frontend",       categoryColor: "#61dafb", weight: "15.2",  Icon: SiNextdotjs,   desc: "Go-to framework for production. SSR, ISR, App Router, edge functions — shipped multiple Next.js products.", gridPos: { row: 2, col: 6  } },
  { num: 7,  symbol: "Cs", name: "CSS3",       category: "Frontend",       categoryColor: "#61dafb", weight: "3.0",   Icon: FaCss3Alt,     desc: "Modern CSS Grid, Flexbox, custom properties, animations, and responsive mobile-first layouts.", gridPos: { row: 2, col: 7  } },
  { num: 8,  symbol: "Tw", name: "Tailwind",   category: "Frontend",       categoryColor: "#61dafb", weight: "3.4",   Icon: SiTailwindcss, desc: "Utility-first CSS power user. Design systems, responsive layouts, dark modes, and custom plugins.", gridPos: { row: 2, col: 8  } },
  { num: 9,  symbol: "Sa", name: "Sass",       category: "Frontend",       categoryColor: "#61dafb", weight: "1.7",   Icon: SiSass,        desc: "SCSS architecture, nesting, mixins, function utilities, and legacy stylesheet maintenance.", gridPos: { row: 2, col: 9  } },
  { num: 10, symbol: "Sql", name: "SQL",       category: "Languages",      categoryColor: "#f7df1e", weight: "ISO",   Icon: SiPostgresql,  desc: "Complex joins, subqueries, window functions, indexing strategies, and query optimisation for high-traffic workloads.", gridPos: { row: 2, col: 10 } },

  // Row 3 – Backend
  { num: 11, symbol: "No", name: "Node.js",    category: "Backend",        categoryColor: "#43c59e", weight: "20.0",  Icon: FaNodeJs,      desc: "REST APIs, WebSockets, cron jobs, streaming — built and deployed Node servers on VMs and containers.", gridPos: { row: 3, col: 1  } },
  { num: 12, symbol: "Fl", name: "Flask",      category: "Backend",        categoryColor: "#43c59e", weight: "3.0",   Icon: SiFlask,       desc: "Python micro-framework for REST APIs, ML model serving, and rapid backend prototyping.", gridPos: { row: 3, col: 2  } },
  { num: 13, symbol: "Fa", name: "FastAPI",    category: "Backend",        categoryColor: "#43c59e", weight: "0.11",  Icon: SiFastapi,     desc: "Async Python APIs with automatic OpenAPI docs — high-performance data services and AI endpoints.", gridPos: { row: 3, col: 5  } },
  { num: 14, symbol: "Pg", name: "PostgreSQL", category: "Backend",        categoryColor: "#43c59e", weight: "16.1",  Icon: SiPostgresql,  desc: "Relational data modelling, complex joins, indexing strategies, and query optimisation.", gridPos: { row: 3, col: 6  } },
  { num: 15, symbol: "Sb", name: "Supabase",   category: "Backend",        categoryColor: "#43c59e", weight: "2.3",   Icon: SiSupabase,    desc: "Auth, Postgres, realtime subscriptions, and edge functions — powers several shipped SaaS back-ends.", gridPos: { row: 3, col: 7  } },
  { num: 16, symbol: "Mg", name: "MongoDB",    category: "Backend",        categoryColor: "#43c59e", weight: "7.0",   Icon: SiMongodb,     desc: "NoSQL document store, aggregation pipelines, schema validation, and flexible data modelling.", gridPos: { row: 3, col: 8  } },
  { num: 17, symbol: "Fb", name: "Firebase",   category: "Backend",        categoryColor: "#43c59e", weight: "10.8",  Icon: SiFirebase,    desc: "Firestore realtime database, Firebase Auth, Cloud Storage, and serverless Cloud Functions.", gridPos: { row: 3, col: 9  } },
  { num: 18, symbol: "Gq", name: "GraphQL",    category: "Backend",        categoryColor: "#43c59e", weight: "16.8",  Icon: SiGraphql,     desc: "Type-safe API queries, Apollo Client integration, schema definitions, and resolver logic.", gridPos: { row: 3, col: 10 } },

  // Row 4 – AI & Motion/Cloud
  { num: 19, symbol: "Oa", name: "OpenAI",     category: "AI & Automation", categoryColor: "#ff7ac6", weight: "4.0",  Icon: RiOpenaiFill,  desc: "GPT-4, embeddings, function-calling, and RAG pipelines — integrated AI features into multiple client products.", gridPos: { row: 4, col: 1  } },
  { num: 20, symbol: "Gm", name: "Gemini",     category: "AI & Automation", categoryColor: "#ff7ac6", weight: "1.5",  Icon: SiGooglegemini, desc: "Google Gemini Pro/Flash for multimodal AI tasks, document processing, and cost-efficient inference.", gridPos: { row: 4, col: 2  } },
  { num: 21, symbol: "Or", name: "OpenRouter", category: "AI & Automation", categoryColor: "#ff7ac6", weight: "0.6",  Icon: RiOpenaiFill,  desc: "Unified API gateway for 100+ LLMs — Claude, Llama, Mistral, and more with automatic fallback routing.", gridPos: { row: 4, col: 3  } },
  { num: 22, symbol: "Ta", name: "Together AI",category: "AI & Automation", categoryColor: "#ff7ac6", weight: "1.0",  Icon: RiOpenaiFill,  desc: "Together AI inference for open-source models — powering CareKit's emotional support conversational AI.", gridPos: { row: 4, col: 4  } },
  { num: 23, symbol: "Gs", name: "GSAP",       category: "AI & Automation", categoryColor: "#ff7ac6", weight: "3.12", Icon: SiGreensock,   desc: "High-performance animations: ScrollTrigger, SplitText timelines. GSAP is the backbone of this portfolio's premium motion.", gridPos: { row: 4, col: 5  } },
  { num: 24, symbol: "Fm", name: "Framer",     category: "AI & Automation", categoryColor: "#ff7ac6", weight: "11.0", Icon: SiFramer,      desc: "Spring animations, layout transitions, gesture-driven UIs — Framer Motion for everything fluid.", gridPos: { row: 4, col: 6  } },
  { num: 25, symbol: "3d", name: "Three.js",   category: "AI & Automation", categoryColor: "#ff7ac6", weight: "185",  Icon: SiThreedotjs,  desc: "Shader materials, 3D scenes, WebGL — used for immersive web experiences and interactive portfolio elements.", gridPos: { row: 4, col: 7  } },
  { num: 26, symbol: "Gt", name: "Git",        category: "Cloud & DevOps",  categoryColor: "#bd93f9", weight: "2.44", Icon: FaGitAlt,      desc: "Branching strategies, conventional commits, interactive rebases — disciplined version control on every project.", gridPos: { row: 4, col: 8  } },
  { num: 27, symbol: "Gh", name: "GitHub",     category: "Cloud & DevOps",  categoryColor: "#bd93f9", weight: "2.0",  Icon: FaGithub,      desc: "Actions workflows, protected branches, code review, and GitHub Pages — GitHub as the full DevOps platform.", gridPos: { row: 4, col: 9  } },
  { num: 28, symbol: "Vc", name: "Vercel",     category: "Cloud & DevOps",  categoryColor: "#bd93f9", weight: "1.0",  Icon: SiVercel,      desc: "Instant deployments, edge network, preview environments — Vercel for front-end at the speed of light.", gridPos: { row: 4, col: 10 } },
];

export const CATEGORIES = [
  { name: "Languages",       color: "#f7df1e" },
  { name: "Frontend",        color: "#61dafb" },
  { name: "Backend",         color: "#43c59e" },
  { name: "AI & Automation", color: "#ff7ac6" },
  { name: "Cloud & DevOps",  color: "#bd93f9" },
];

/* ─── Orbiting atom SVG ─── */
function OrbitAtom({ color }: { color: string }) {
  return (
    <>
      <style>{`
        @keyframes atomSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 160,
          height: 160,
          marginTop: -80,
          marginLeft: -80,
          pointerEvents: "none",
          opacity: 0.15,
          animation: "atomSpin 12s linear infinite",
          transformOrigin: "center center",
        }}
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Nucleus */}
          <circle cx="80" cy="80" r="5" fill={color} />
          <circle cx="80" cy="80" r="10" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />

          {/* Orbit 1 */}
          <g style={{ transformOrigin: "80px 80px", transform: "rotate(0deg)" }}>
            <ellipse cx="80" cy="80" rx="65" ry="24" stroke={color} strokeWidth="1.2" fill="none" />
            <circle cx="145" cy="80" r="3.5" fill={color} />
          </g>

          {/* Orbit 2 */}
          <g style={{ transformOrigin: "80px 80px", transform: "rotate(60deg)" }}>
            <ellipse cx="80" cy="80" rx="65" ry="24" stroke={color} strokeWidth="1.2" fill="none" />
            <circle cx="145" cy="80" r="3.5" fill={color} />
          </g>

          {/* Orbit 3 */}
          <g style={{ transformOrigin: "80px 80px", transform: "rotate(120deg)" }}>
            <ellipse cx="80" cy="80" rx="65" ry="24" stroke={color} strokeWidth="1.2" fill="none" />
            <circle cx="145" cy="80" r="3.5" fill={color} />
          </g>
        </svg>
      </div>
    </>
  );
}

/* ─── Single tile ─── */
function TechTile({
  tech, isExpanded, isAnyExpanded, activeCategory, onExpand, onCollapse,
}: {
  tech: TechElement;
  isExpanded: boolean;
  isAnyExpanded: boolean;
  activeCategory: string | null;
  onExpand: (t: TechElement) => void;
  onCollapse: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const IconComp = tech.Icon;
  const c = tech.categoryColor;
  const isDimmed = activeCategory !== null && activeCategory !== tech.category;

  let scale = 1;
  if (!isExpanded && hovered && !isAnyExpanded) scale = 1.08;

  /* Collapsed glow — subtle, not neon */
  const glowShadow = hovered && !isAnyExpanded
    ? `0 0 10px ${c}55`
    : `0 0 4px ${c}22`;

  /* Expanded card glow — slightly stronger but still restrained */
  const expandedShadow = `0 0 24px ${c}66, 0 8px 40px rgba(0,0,0,0.8)`;

  const transDur = hovered && !isAnyExpanded ? "120ms" : "200ms";

  return (
    <div
      className="cursor-target"
      onClick={(e) => { e.stopPropagation(); isExpanded ? onCollapse() : onExpand(tech); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow: tech.gridPos.row,
        gridColumn: tech.gridPos.col,
        position: "relative",
        zIndex: isExpanded ? 200 : hovered ? 50 : 1,
        opacity: isDimmed && !isExpanded ? 0.18 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* ── Collapsed card ── */}
      {!isExpanded && (
        <div style={{
          width: "100%", height: "100%",
          background: "#0b0c0e",
          border: `1.5px solid ${c}aa`,
          boxShadow: glowShadow,
          borderRadius: 4,
          padding: "8px 10px",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          transformOrigin: "center center",
          transform: `scale(${scale})`,
          transition: `transform 120ms ease-out, box-shadow 120ms ease-out`,
          willChange: "transform",
          boxSizing: "border-box",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, fontWeight:700, color:c }}>
              {tech.num}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, marginTop:2, marginBottom:2 }}>
            <div style={{ fontSize:18, color:c }}>
              <IconComp />
            </div>
            <span style={{ fontSize:18, fontWeight:700, fontFamily:'"Ubuntu", sans-serif', color:c, lineHeight:1, letterSpacing:"-0.02em" }}>
              {tech.symbol}
            </span>
          </div>
          <div style={{ textAlign:"center" }}>
            <span style={{ fontSize:9, fontWeight:500, fontFamily:'"Ubuntu", sans-serif', color:c, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", display:"block", opacity:0.8 }}>
              {tech.name}
            </span>
            <span style={{ fontSize:8, color:c, opacity:0.45, fontFamily:'"Ubuntu", sans-serif', display:"block", marginTop:1 }}>
              {tech.weight}
            </span>
          </div>
        </div>
      )}

      {/* ── Expanded square card — absolute, perfectly square, overlaps grid ── */}
      {isExpanded && (() => {
        /* Determine transform origin & alignment based on grid column so edges don't clip */
        const col = tech.gridPos.col;
        let leftPos = "50%";
        let translateX = "-50%";
        if (col >= 9) {
          leftPos = "100%";
          translateX = "-100%";
        } else if (col <= 2) {
          leftPos = "0%";
          translateX = "0%";
        }

        return (
          <div style={{
            position: "absolute",
            top: "50%",
            left: leftPos,
            transform: `translate(${translateX}, -50%) scale(1)`,
            width: 230,
            height: 230,
            background: "#0e0f13",
            border: `1.5px solid ${c}`,
            boxShadow: expandedShadow,
            borderRadius: 6,
            padding: "12px 12px 10px",
            display: "flex", flexDirection: "column",
            justifyContent: "flex-start",
            overflow: "hidden",
            boxSizing: "border-box",
            animation: "tileExpand 220ms cubic-bezier(0.22,1,0.36,1) both",
          }}>
            <style>{`
              @keyframes tileExpand {
                from { opacity: 0; transform: translate(${translateX},-50%) scale(0.85); }
                to   { opacity: 1; transform: translate(${translateX},-50%) scale(1); }
              }
            `}</style>
            <OrbitAtom color={c} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
              <span style={{ fontSize:10, fontWeight:700, color:c }}>{tech.num}</span>
              <span style={{ fontSize:8, fontWeight:600, fontFamily:'"Ubuntu", sans-serif', letterSpacing:"0.08em", textTransform:"uppercase", color:c, opacity:0.75 }}>
                {tech.category}
              </span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6, marginBottom:6, position:"relative", zIndex:1 }}>
              <div style={{ fontSize:22, color:c }}><IconComp /></div>
              <div style={{ display:"flex", flexDirection:"column" }}>
                <span style={{ fontSize:18, fontWeight:700, fontFamily:'"Ubuntu", sans-serif', color:c, lineHeight:1, letterSpacing:"-0.02em" }}>
                  {tech.symbol}
                </span>
                <div style={{ fontSize:12, fontWeight:700, fontFamily:'"Ubuntu", sans-serif', color:"#F2EEE9", letterSpacing:"-0.01em", marginTop:1 }}>
                  {tech.name}
                </div>
              </div>
            </div>
            <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", gap:6, minHeight:0 }}>
              <p style={{ fontSize:10.5, fontFamily:'"Ubuntu", sans-serif', fontWeight:400, lineHeight:1.45, color:"rgba(242,238,233,0.85)", margin:0, flex:1, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical" as const }}>
                {tech.desc}
              </p>
              <div style={{ marginTop:"auto", paddingTop:6, borderTop:`1px solid ${c}30`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:9.5, fontWeight:500, fontFamily:'"Ubuntu", sans-serif', color:c, opacity:0.9 }}>v{tech.weight}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ─── Main ─── */
export default function PeriodicTechTable() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedTech, setExpandedTech] = useState<TechElement | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleExpand   = useCallback((t: TechElement) => setExpandedTech(t), []);
  const handleCollapse = useCallback(() => setExpandedTech(null), []);

  useEffect(() => {
    if (!expandedTech) return;
    const onDown = (e: MouseEvent) => {
      if (!gridRef.current?.contains(e.target as Node)) handleCollapse();
    };
    const id = setTimeout(() => window.addEventListener("mousedown", onDown), 60);
    return () => { clearTimeout(id); window.removeEventListener("mousedown", onDown); };
  }, [expandedTech, handleCollapse]);

  useEffect(() => {
    if (!expandedTech) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleCollapse(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedTech, handleCollapse]);

  return (
    <div style={{ width:"100%", marginTop: 0 }}>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, flexWrap:"wrap", marginBottom:32 }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(isActive ? null : cat.name)}
              className="cursor-target"
              style={{
                background: isActive ? `${cat.color}22` : "rgba(255,255,255,0.03)",
                border:`1px solid ${isActive ? cat.color : "rgba(255,255,255,0.08)"}`,
                borderRadius:999, padding:"6px 14px",
                display:"flex", alignItems:"center", gap:8,
                transition:"all 0.25s ease-out",
              }}
            >
              <span style={{ width:8, height:8, borderRadius:"50%", backgroundColor:cat.color, boxShadow:`0 0 4px ${cat.color}55`, flexShrink:0 }} />
              <span style={{ fontSize:11, fontWeight:500, fontFamily:'"Ubuntu", sans-serif', letterSpacing:"0.06em", textTransform:"uppercase", color: isActive ? "#FFFFFF" : "rgba(242,238,233,0.65)" }}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ overflow: "visible", padding: "8px 0 0 0" }}>
        <style>{`
          @media (max-width: 640px) {
            .periodic-scroll-wrapper {
              overflow-x: auto !important;
              overflow-y: visible;
              -webkit-overflow-scrolling: touch;
            }
            .periodic-scroll-wrapper::-webkit-scrollbar {
              height: 4px;
            }
            .periodic-scroll-wrapper::-webkit-scrollbar-track {
              background: transparent;
            }
            .periodic-scroll-wrapper::-webkit-scrollbar-thumb {
              background: rgba(242,238,233,0.2);
              border-radius: 2px;
            }
          }
        `}</style>
        <div className="periodic-scroll-wrapper" style={{ overflow: "visible", padding: "8px 0 0 0" }}>
        <div
          ref={gridRef}
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(10, minmax(85px, 1fr))",
            gridTemplateRows:"repeat(4, minmax(95px, auto))",
            gap:10,
            maxWidth:1080, margin:"0 auto", minWidth:850,
            padding:"24px 28px",
          }}
        >
          {PERIODIC_TECHS.map((tech) => (
            <TechTile
              key={tech.num}
              tech={tech}
              isExpanded={expandedTech?.num === tech.num}
              isAnyExpanded={expandedTech !== null}
              activeCategory={activeCategory}
              onExpand={handleExpand}
              onCollapse={handleCollapse}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
