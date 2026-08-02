"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Shuffle from "./Shuffle";

export default function Contact() {
  const [shuffleDone, setShuffleDone] = useState(false);

  return (
    <section
      id="contact"
      style={{
        background: "#131417",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "100px 0 80px",
      }}
    >
      <div style={{ width: "90%", maxWidth: 1440, margin: "0 auto" }}>
        {/* Giant LET'S TALK — centred */}
        <div style={{ paddingBottom: 8, textAlign: "center" }}>
          <Shuffle
            text="Let's Talk"
            tag="h1"
            onShuffleComplete={() => setShuffleDone(true)}
            shuffleDirection="right"
            duration={0.45}
            animationMode="evenodd"
            shuffleTimes={2}
            ease="power3.out"
            stagger={0.025}
            threshold={0.1}
            rootMargin="-50px"
            triggerOnce={false}
            triggerOnHover={true}
            textAlign="center"
            style={{
              fontSize: "clamp(40px, 8vw, 160px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#F2EEE9",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              fontFamily: '"Press Start 2P", system-ui',
            }}
          />
        </div>

        {/* Bottom row — equal margins on both sides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
            /* Equal left/right padding so both columns sit at the same distance from the edges */
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          {/* Left */}
          <div style={{ maxWidth: 380 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F2EEE9",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Open to internships, freelance work, collaborations,
              and startup opportunities.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:ggambhir1919@gmail.com"
                className="cursor-target cursor-magnetic"
                data-cursor-label="Send me a mail ✉️"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#F2EEE9",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                ggambhir1919@gmail.com
              </a>
            </div>
          </div>

          {/* Right: social links — vertical column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                label: "GitHub",
                href: "https://github.com/gautamxgambhir",
                tip: "View my code",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/gautamgambhir",
                tip: "Connect on LinkedIn",
              },
              {
                label: "X",
                href: "https://x.com/gautamxgambhir",
                tip: "Follow me on X",
              },
              {
                label: "Instagram",
                href: "https://instagram.com/gautamxgambhir",
                tip: "Follow on Instagram",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target cursor-magnetic"
                data-cursor-label={s.tip}
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#F2EEE9",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
