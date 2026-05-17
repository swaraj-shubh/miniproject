// src/components/home/ProblemSection.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATS = [
  { icon: "🍱", num: "1.3B", label: "Tonnes wasted globally per year", color: "rgba(212,165,90,0.8)" },
  { icon: "👨‍👩‍👧", num: "828M", label: "People go to bed hungry every night", color: "rgba(212,165,90,0.65)" },
  { icon: "🚚", num: "40%", label: "Of food produced never reaches a plate", color: "rgba(212,165,90,0.55)" },
];

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const FADE_UP = {
  hidden: { opacity: 1, y: 50, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProblemSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section enters from bottom, exits upward
  const opacity   = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [0, 1, 1, 0]);
  const scale     = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [0.94, 1, 1, 0.94]);

  // Content entrance triggered by inView
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const contentOpacity = useTransform(enterProgress, [0, 0.5], [0, 1]);
  const contentY       = useTransform(enterProgress, [0, 0.5], [40, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .prob-stat-card {
          display: flex; align-items: center; gap: 1.2rem;
          padding: 1.4rem 1.8rem;
          background: rgba(12,9,5,0.7);
          border: 1px solid rgba(212,165,90,0.12);
          backdrop-filter: blur(16px);
          position: relative; overflow: hidden;
          cursor: default;
          transition: border-color 0.4s, transform 0.4s;
        }
        .prob-stat-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, #d4a55a, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .prob-stat-card:hover { border-color: rgba(212,165,90,0.28); transform: translateX(6px); }
        .prob-stat-card:hover::before { opacity: 1; }
      `}</style>

      {/* Sticky scroll container */}
      <div
        ref={sectionRef}
        id="problem"
        style={{ height: "200vh", position: "relative", scrollMarginTop: "88px" }}
      >
        <motion.div
          style={{
            position: "sticky", top: "88px",
            height: "calc(100vh - 88px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 2rem",
            zIndex: 10,
            opacity, scale,
          }}
        >
          <div
            style={{
              maxWidth: 960, width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "5rem",
              alignItems: "center",
            }}
          >
           {/* Left: Text inside a semi‑transparent box */}
            <motion.div style={{ opacity: contentOpacity, y: contentY }}>
              <div style={{
                background: "rgba(8, 6, 4, 0.55)",
                backdropFilter: "blur(1px)",
                border: "1px solid rgba(212, 165, 90, 0.2)",
                borderRadius: "1rem",
                padding: "2rem 2rem 2rem 2.5rem",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}>
                {/* Eyebrow */}
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.63rem", fontWeight: 500,
                  letterSpacing: "0.48em", textTransform: "uppercase",
                  color: "#d4a55a",
                  marginBottom: "1.4rem",
                  display: "flex", alignItems: "center", gap: "0.8rem",
                }}>
                  <span style={{ display: "block", width: 32, height: 1, background: "#d4a55a" }} />
                  The Reality
                </div>

                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  fontWeight: 200, lineHeight: 1.12,
                  color: "#f5ead6", margin: "0 0 1rem",
                  letterSpacing: "-0.01em",
                }}>
                  A single meal can<br />
                  change someone's<br />
                  <em style={{ color: "rgba(245,234,214,0.65)" }}>entire day.</em>
                </h2>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  fontStyle: "italic", fontWeight: 300,
                  color: "rgba(245,234,214,0.55)", margin: "0 0 1.4rem", lineHeight: 1.7,
                }}>
                  Behind every empty plate is a story waiting for kindness.
                </p>

                <div style={{
                  width: 48, height: 1,
                  background: "linear-gradient(90deg, #d4a55a, transparent)",
                  marginBottom: "1.3rem",
                }} />

                <blockquote style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(0.92rem, 1.6vw, 1.08rem)",
                  fontStyle: "italic",
                  color: "rgba(212,165,90,0.7)",
                  margin: "0 0 1.3rem",
                  paddingLeft: "1.1rem",
                  borderLeft: "1px solid rgba(212,165,90,0.28)",
                }}>
                  "While food is thrown away, hunger still survives."
                </blockquote>

              </div>
            </motion.div>

            {/* Right: Stat cards */}
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: "1rem", opacity: contentOpacity }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.12,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 6,
                    transition: { duration: 0.2 },
                  }}
                  className="prob-stat-card"
                  style={{
                    background: "rgba(8, 6, 4, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: `1.5px solid rgba(212, 165, 90, ${0.15 + i * 0.08})`,
                    borderRadius: "12px",
                    padding: "1.2rem 1.5rem",
                    cursor: "default",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                    <span style={{ fontSize: "2rem", flexShrink: 0, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>
                      {s.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                          fontWeight: 300,
                          color: s.color,
                          lineHeight: 1,
                          marginBottom: "0.2rem",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {s.num}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 400,
                          color: "rgba(245, 234, 214, 0.6)",
                          lineHeight: 1.4,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Decorative insight card – improved UI & entrance animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(212, 165, 90, 0.5)",
                  boxShadow: "0 8px 20px rgba(212, 165, 90, 0.15)",
                  transition: { duration: 0.2 },
                }}
                style={{
                  marginTop: "0.75rem",
                  padding: "1.2rem 1.6rem",
                  border: "1px solid rgba(212, 165, 90, 0.3)",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(212, 165, 90, 0.08), rgba(212, 165, 90, 0.02))",
                  backdropFilter: "blur(8px)",
                  cursor: "default",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(212, 165, 90, 0.8)",
                    marginBottom: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ width: 20, height: 1, background: "#d4a55a" }} />
                  The cost of inaction
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    color: "rgba(245, 234, 214, 0.7)",
                    lineHeight: 1.6,
                    paddingLeft: "0.5rem",
                    borderLeft: "2px solid rgba(212, 165, 90, 0.4)",
                  }}
                >
                  Every second, tonnes of edible food vanish into landfills.
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}