// src/components/home/SolutionSection.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FEATURES = [
  {
    icon: "🍽",
    title: "Restaurants & Events",
    desc: "Hotels, caterers, and event venues list surplus food in seconds.",
    num: "01",
  },
  {
    icon: "🏢",
    title: "Verified NGOs",
    desc: "Trusted organisations receive matched food requests instantly.",
    num: "02",
  },
  {
    icon: "🚴",
    title: "Volunteer Delivery",
    desc: "Local riders pick up and deliver within hours, not days.",
    num: "03",
  },
  {
    icon: "⚡",
    title: "Smart Food Matching",
    desc: "AI routes each donation to where it is needed most.",
    num: "04",
  },
];

export default function SolutionSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.78, 0.95], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.15, 0.78, 0.95], [0.94, 1, 1, 0.94]);

  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 25%"],
  });
  const textY   = useTransform(enterProgress, [0, 1], [50, 0]);
  const textOp  = useTransform(enterProgress, [0, 0.6], [0, 1]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .feat-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.2rem 1.4rem;
          align-items: start;
          padding: 1.5rem 1.8rem;
          background: rgba(12,9,5,0.6);
          border: 1px solid rgba(212,165,90,0.1);
          backdrop-filter: blur(16px);
          position: relative; overflow: hidden;
          cursor: default;
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        .feat-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 80% 50%, rgba(212,165,90,0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
        }
        .feat-card:hover { border-color: rgba(212,165,90,0.25); background: rgba(18,13,7,0.75); }
        .feat-card:hover::after { opacity: 1; }
        .feat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.7rem; font-weight: 300;
          color: rgba(212,165,90,0.35);
          letter-spacing: 0.12em;
          margin-top: 2px;
        }
        .feat-icon { font-size: 1.6rem; grid-column: 1; grid-row: 1 / 3; align-self: center; }
        .btn-explore {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #0a0804; background: #d4a55a;
          border: none; padding: 1rem 2.6rem;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-explore:hover { background: #f5ead6; transform: translateY(-3px); box-shadow: 0 16px 40px rgba(212,165,90,0.28); }
      `}</style>

      <div ref={sectionRef} id="solution" style={{ height: "200vh", position: "relative", scrollMarginTop: "88px" }}>
        <motion.div
          style={{
            position: "sticky", top: "88px", height: "calc(100vh - 88px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 2rem", zIndex: 10,
            opacity, scale,
          }}
        >
          <div style={{
            maxWidth: 1000, width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "5rem", alignItems: "center",
          }}>
            {/* Left: text — improved readability & animation */}
            <motion.div
              style={{ y: textY, opacity: textOp }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color: "#29e718",                   // slightly brighter amber
                marginBottom: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}>
                <span style={{ display: "block", width: 32, height: 1, background: "#29e718" }} />
                Smart Distribution
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 200,
                lineHeight: 1.12,
                color: "#fff6ea",                    // warmer off-white
                margin: "0 0 1rem",
                letterSpacing: "-0.01em",
                textShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}>
                Connecting food<br />
                to the people who<br />
                <em style={{ color: "#f5cd94", fontStyle: "normal" }}>need it most.</em>
              </h2>

              <div style={{
              display: "inline-block",                     // or "block" if full width is preferred
              background: "rgba(245, 153, 62, 0.34)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212, 165, 90, 0.25)",
              borderRadius: "12px",
              padding: "0.5rem 1.5rem",
              marginBottom: "1.4rem",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#ececeb",
                margin: 0,
                lineHeight: 1.7,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}>
                Technology can turn excess into access.
              </p>
            </div>

              <div style={{
                width: 56,
                height: 1,
                background: "linear-gradient(90deg, #e4b363, transparent)",
                marginBottom: "1.3rem",
              }} />

              <blockquote style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                fontStyle: "italic",
                color: "#f0ca80",
                margin: "0 0 1.3rem",
                paddingLeft: "1.2rem",
                borderLeft: "2px solid rgba(228, 179, 99, 0.5)",
                textShadow: "0 1px 1px rgba(0,0,0,0.1)",
              }}>
                "Good food deserves a second chance."
              </blockquote>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "rgba(255, 246, 234, 0.7)",
                marginBottom: "2rem",
                textShadow: "0 1px 1px rgba(0,0,0,0.1)",
              }}>
                Second Serve builds a live network between restaurants, NGOs,
                volunteers, and communities to rescue food before it is wasted.
              </p>

              <motion.a
                href="#platform"
                className="btn-explore"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0a0804",
                  background: "#e4b363",
                  padding: "0.85rem 2.2rem",
                  borderRadius: "30px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 4px 12px rgba(228, 179, 99, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f5cd94";
                  e.target.style.boxShadow = "0 6px 18px rgba(228, 179, 99, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#e4b363";
                  e.target.style.boxShadow = "0 4px 12px rgba(228, 179, 99, 0.3)";
                }}
              >
                Explore the Platform
              </motion.a>
            </motion.div>

            {/* Right: feature cards – enhanced glassmorphism & animations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  whileHover={{
                    x: 8,
                    borderColor: "rgba(212, 165, 90, 0.5)",
                    boxShadow: "0 8px 20px rgba(212, 165, 90, 0.15)",
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    background: "rgba(8, 6, 4, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 165, 90, 0.25)",
                    borderRadius: "16px",
                    padding: "1.2rem 1.5rem",
                    cursor: "default",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Icon with enhanced styling */}
                  <span
                    style={{
                      fontSize: "2rem",
                      flexShrink: 0,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {f.icon}
                  </span>

                  {/* Text content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.15rem",
                        fontWeight: 500,
                        color: "#f5ead6",
                        marginBottom: "0.3rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 300,
                        color: "rgba(245, 234, 214, 0.6)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f.desc}
                    </div>
                  </div>

                  {/* Feature number – elegantly positioned */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: "1.2rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: 200,
                      color: "rgba(212, 165, 90, 0.35)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {f.num}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}