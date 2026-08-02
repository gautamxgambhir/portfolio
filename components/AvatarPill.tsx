"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// Avatar spring configs
const AVATAR_SPRING  = { stiffness: 180, damping: 22, mass: 0.8 };
const TOOLTIP_SPRING = { stiffness: 90,  damping: 22, mass: 1 };

export default function AvatarPill() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Responsive size — computed client-side after mount
  const [SIZE, setSIZE] = useState(200);
  useEffect(() => {
    const update = () => setSIZE(window.innerWidth < 640 ? 110 : 200);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Avatar magnetic offset from center ── */
  const avatarRawX = useMotionValue(0);
  const avatarRawY = useMotionValue(0);
  const avatarX = useSpring(avatarRawX, AVATAR_SPRING);
  const avatarY = useSpring(avatarRawY, AVATAR_SPRING);

  /* ── Tooltip follows cursor position within wrapper ── */
  const tipRawX = useMotionValue(SIZE / 2);
  const tipRawY = useMotionValue(0);
  const tipX = useSpring(tipRawX, TOOLTIP_SPRING);
  const tipY = useSpring(tipRawY, TOOLTIP_SPRING);

  const MAX_AX = 18;
  const MAX_AY = 12;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Avatar pull — clamped offset from center
      avatarRawX.set(Math.max(-MAX_AX, Math.min(MAX_AX, localX - cx)));
      avatarRawY.set(Math.max(-MAX_AY, Math.min(MAX_AY, localY - cy)));

      // Tooltip tracks cursor exactly (spring provides the lag)
      tipRawX.set(localX);
      tipRawY.set(localY);
    },
    [avatarRawX, avatarRawY, tipRawX, tipRawY]
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    avatarRawX.set(0);
    avatarRawY.set(0);
  }, [avatarRawX, avatarRawY]);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      /* cursor-target triggers the site's custom ring cursor on hover */
      className="cursor-target"
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        display: "inline-block",
        flexShrink: 0,
        overflow: "visible",
        /* Hide default cursor so the site's custom cursor stays visible */
        cursor: "none",
      }}
    >
      {/* ── Floating tooltip — tracks cursor with spring lag ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            style={{
              position: "absolute",
              left: tipX,
              top: tipY,
              /* Sit below and to the right of the cursor */
              translateX: "14px",
              translateY: "14px",
              zIndex: 50,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glass pill */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                borderRadius: 999,
                whiteSpace: "nowrap",
                overflow: "hidden",
                /* Dark glass — high readability on any background */
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                background: "rgba(10, 10, 12, 0.82)",
                border: "1px solid rgba(255, 255, 255, 0.11)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09)",
              }}
            >
              {/* Top-edge shine */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  width: "60%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Availability dot */}
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(74,222,128,0.75)",
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(242, 238, 233, 0.92)",
                  fontFamily: '"Syne", sans-serif',
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                Open to Work — Internships &amp; Freelance
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Avatar — circular, moves magnetically with cursor ── */}
      <motion.a
        href="mailto:ggambhir1919@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          position: "relative",
          zIndex: 2,
          width: SIZE,
          height: SIZE,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          outline: "none",
          textDecoration: "none",
          x: avatarX,
          y: avatarY,
          willChange: "transform",
        }}
      >
        <motion.img
          src="/avatar.png"
          alt="Gautam Gambhir — open to internships and freelance work"
          width={SIZE}
          height={SIZE}
          style={{
            width: SIZE,
            height: SIZE,
            display: "block",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "50%",
            willChange: "filter",
          }}
          animate={{
            filter: hovered
              ? "grayscale(0%) brightness(1.0)"
              : "grayscale(100%) brightness(0.9)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.a>
    </div>
  );
}
