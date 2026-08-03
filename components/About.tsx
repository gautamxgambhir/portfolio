"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import TypewriterTitle from "./TypewriterTitle";
import PeriodicTechTable from "./PeriodicTechTable";
import VariableProximity from "./VariableProximity";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const BIO_PARAGRAPHS = [
  "I'm a 17-year-old full-stack developer passionate about building products from idea to deployment. Over six years I've worked across AI, automation, full-stack development, UI/UX, and hackathon infrastructure.",
  "At 16, I served as Technical Head at Maximally — India's largest youth AI hackathon ecosystem — leading engineering, managing interns, and building platforms that served 10,000+ participants. As Founding Engineer, I built the entire tech stack from zero.",
  "I've won 1st place at CodeDay IIT Delhi and 3rd at Counterspell Delhi, mentored dozens of student teams across national hackathons, and shipped independent open-source AI tools including an in-game Minecraft AI assistant.",
  "I enjoy solving difficult engineering problems, rapidly shipping products, and designing interfaces that balance functionality with exceptional user experience. Rather than isolated demos, I build systems that are actually used by people.",
];

export default function About() {
  const ref = useRef(null);
  const bioContainerRef = useRef<HTMLDivElement>(null);
  const [titleDone, setTitleDone] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#131417",
        padding: "100px 0 140px",
        width: "100%",
        overflow: "visible",
      }}
    >
      <div style={{ width: "90%", maxWidth: 1212, margin: "0 auto" }}>
        {/* Big heading using typewriter effect */}
        <div style={{ marginBottom: 48 }}>
          <TypewriterTitle
            text="I Build Products, AI Systems, and Experiences That Matter."
            tag="h2"
            onComplete={() => setTitleDone(true)}
            style={{
              fontSize: "clamp(22px, 3vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#F2EEE9",
            }}
          />
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap" }}>
          {/* Left: bio paragraphs with VariableProximity effect */}
          <div
            ref={bioContainerRef}
            style={{
              flex: "1 1 400px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              position: "relative",
            }}
          >
            {BIO_PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={titleDone ? "visible" : "hidden"}
                style={{
                  fontSize: "clamp(18px, 1.6vw, 24px)",
                  lineHeight: 1.65,
                  color: "#F2EEE9",
                  letterSpacing: "0.01em",
                  margin: 0,
                }}
              >
                <VariableProximity
                  label={text}
                  containerRef={bioContainerRef as React.MutableRefObject<HTMLElement | null>}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 800, 'opsz' 40"
                  radius={120}
                  falloff="gaussian"
                  style={{
                    fontSize: "clamp(18px, 1.6vw, 24px)",
                    lineHeight: 1.65,
                    color: "#F2EEE9",
                    letterSpacing: "0.01em",
                  }}
                />
              </motion.p>
            ))}
          </div>

          {/* Right: skills */}
          <div
            style={{
              flex: "0 0 260px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              fontSize: 18,
              color: "rgba(242,238,233,0.72)",
            }}
          >
            {[
              {
                title: "AI & Automation",
                list: "OpenAI, Google Gemini, OpenRouter, Together AI, Prompt Engineering, LangChain, RAG Pipelines, Automation Systems.",
              },
              {
                title: "Frontend & UI",
                list: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js, HTML5, CSS3.",
              },
              {
                title: "Design",
                list: "Figma, Framer, Photoshop, Premiere Pro, After Effects, Audition.",
              },
              {
                title: "Backend & Databases",
                list: "Node.js, Express.js, Flask, FastAPI, PostgreSQL, Supabase, MongoDB, Firebase.",
              },
            ].map(({ title, list }, i) => (
              <motion.div
                key={i}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={titleDone ? "visible" : "hidden"}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <h3
                  style={{
                    fontSize: "clamp(20px, 1.6vw, 24px)",
                    fontWeight: 700,
                    color: "#F2EEE9",
                  }}
                >
                  {title}
                </h3>
                <p style={{ lineHeight: 1.7 }}>{list}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Periodic Table Tech Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 40 }}
        >
          <PeriodicTechTable />
        </motion.div>
      </div>
    </section>
  );
}
