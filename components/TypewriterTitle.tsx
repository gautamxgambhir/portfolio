"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface TypewriterTitleProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  startDelay?: number;
  triggerOnLoad?: boolean;
  onComplete?: () => void;
}

export default function TypewriterTitle({
  text,
  tag = "h2",
  className = "",
  style = {},
  speed = 0.04,
  startDelay = 0.1,
  triggerOnLoad = false,
  onComplete,
}: TypewriterTitleProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const shouldAnimate = triggerOnLoad ? true : isInView;

  // Track which character index the cursor is currently sitting after
  const [cursorAfterIndex, setCursorAfterIndex] = useState(-1);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Fire onComplete once the last char finishes
  useEffect(() => {
    if (!shouldAnimate || done) return;
    const totalDuration = (startDelay + text.length * speed + 0.1) * 1000;
    const t = setTimeout(() => {
      setDone(true);
      onCompleteRef.current?.();
    }, totalDuration);
    return () => clearTimeout(t);
  }, [shouldAnimate, done, text, speed, startDelay]);

  const Tag = tag as any;

  // Group into words so the browser never breaks mid-word
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Tag
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ color: "#F2EEE9", willChange: "transform, opacity", ...style }}
    >
      {/* Screen reader text */}
      <span className="sr-only">{text}</span>

      {/* Visible word-by-word render — each word is nowrap so no mid-word breaks */}
      <span aria-hidden="true" style={{ display: "inline" }}>
        {words.map((word, wi) => {
          const wordChars = word.split("");
          const wordStartIndex = charIndex;
          charIndex += word.length + (wi < words.length - 1 ? 1 : 0); // +1 for space

          return (
            <React.Fragment key={wi}>
              {/* Wrap each word in a nowrap span so it never breaks mid-word */}
              <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {wordChars.map((char, ci) => {
                  const globalIndex = wordStartIndex + ci;
                  return (
                    <React.Fragment key={ci}>
                      <motion.span
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                        initial={{ opacity: 0 }}
                        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.01,
                          delay: startDelay + globalIndex * speed,
                          ease: "linear",
                        }}
                        onAnimationComplete={() => {
                          if (shouldAnimate && !done) {
                            setCursorAfterIndex(globalIndex);
                          }
                        }}
                      >
                        {char}
                      </motion.span>

                      {/* Cursor after most recently revealed char */}
                      {cursorAfterIndex === globalIndex && !done && (
                        <motion.span
                          aria-hidden="true"
                          style={{
                            display: "inline-block",
                            width: "2px",
                            height: "0.85em",
                            backgroundColor: "#F2EEE9",
                            borderRadius: "1px",
                            marginLeft: "3px",
                            verticalAlign: "middle",
                            transformOrigin: "center",
                          }}
                          animate={{ opacity: [1, 1, 0, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.49, 0.5, 1],
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </span>

              {/* Space between words — rendered as its own animated span */}
              {wi < words.length - 1 && (() => {
                const spaceIndex = wordStartIndex + word.length;
                return (
                  <motion.span
                    key={`space-${wi}`}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    initial={{ opacity: 0 }}
                    animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.01,
                      delay: startDelay + spaceIndex * speed,
                      ease: "linear",
                    }}
                  >
                    {" "}
                  </motion.span>
                );
              })()}
            </React.Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
