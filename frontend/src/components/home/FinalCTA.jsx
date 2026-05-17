// src/components/home/ImpactCTA.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import Footer from "@/pages/Footer";

const STATS = [
  { num: 284000, suffix: "+", label: "Meals Rescued" },
  { num: 1420,   suffix: "T", label: "Food Saved" },
  { num: 890,    suffix: "+", label: "Active Donors" },
  { num: 142,    suffix: "+", label: "NGO Partners" },
];

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedStat({ stat, inView }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      const raw = stat.num;
      const ctrl = animate(0, raw, {
        duration: 2.4,
        ease: "easeOut",
        onUpdate: (v) => {
          if (!ref.current) return;
          if (raw >= 1000) {
            const k = v / 1000;
            ref.current.textContent = k >= 1
              ? k.toFixed(0) + "K" + stat.suffix
              : Math.round(v) + stat.suffix;
          } else {
            ref.current.textContent = Math.round(v) + stat.suffix;
          }
        },
      });
      return ctrl.stop;
    }
  }, [inView, stat]);

  return (
    <span ref={ref} style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
      fontWeight: 200, color: "#d4a55a", lineHeight: 1,
    }}>0</span>
  );
}

export default function ImpactCTA() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fade + slide in as the section scrolls into view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const fadeIn  = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const slideUp = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

        .stat-cell {
          background: rgba(8,6,4,0.6);
          backdrop-filter: blur(10px);
          padding: 1.1rem 0.8rem;
          text-align: center;
          transition: background 0.4s;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(212,165,90,0.08);
        }
        .stat-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(212,165,90,0.09), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        .stat-cell:hover { background: rgba(14,10,5,0.85); }
        .stat-cell:hover::before { opacity: 1; }

        .cta-btn-gold {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #0a0804; background: #d4a55a;
          border: none; padding: 0.85rem 2.2rem;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .cta-btn-gold:hover {
          background: #f5ead6; transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(212,165,90,0.28);
        }
        .cta-btn-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #f5ead6; background: transparent;
          border: 1px solid rgba(245,234,214,0.25);
          padding: 0.85rem 2.2rem;
          cursor: pointer; text-decoration: none; display: inline-block;
          transition: all 0.35s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .cta-btn-ghost:hover { border-color: #d4a55a; color: #d4a55a; }

        .email-row {
          display: flex; max-width: 340px; margin: 0 auto;
          border: 1px solid rgba(212,165,90,0.2);
          overflow: hidden; transition: border-color 0.3s;
        }
        .email-row:focus-within { border-color: rgba(212,165,90,0.5); }
        .email-input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
          color: #f5ead6; min-width: 0;
        }
        .email-input::placeholder { color: rgba(245,234,214,0.18); }
        .email-submit {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #0a0804; background: #d4a55a;
          border: none; padding: 0 1.2rem;
          cursor: pointer; white-space: nowrap; transition: background 0.3s;
        }
        .email-submit:hover { background: #f5ead6; }

        .footer-a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,234,214,0.2); text-decoration: none; transition: color 0.3s;
        }
        .footer-a:hover { color: rgba(212,165,90,0.5); }

        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/*
        ── HOW THE LOCK WORKS ──
        • Outer div = 200vh  →  gives 100vh of "scroll budget" while sticky is locked
        • Inner div = position:sticky + top:0 + height:100vh
          → enters screen normally, then LOCKS in place for the entire 100vh scroll budget
          → once user scrolls past the 200vh container, sticky releases and section scrolls away
        • No JS needed — pure CSS sticky behaviour
      */}
      <div
        ref={sectionRef}
        id="impact"
        style={{
          height: "300vh",        // 100vh visible + 100vh scroll lock budget
          position: "relative",
          scrollMarginTop: "88px",
          // margin: "2rem",
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(212,165,90,0.05) 0%, transparent 70%)",
        }} />

        {/* ── STICKY LOCK ── */}
        <motion.div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem 2rem",
            zIndex: 10,
            opacity: fadeIn,
            y: slideUp,
          }}
        >
          <div style={{ maxWidth: 820, width: "100%" }}>

            {/* ── STATS ROW ── */}
            

            {/* ── MAIN CTA BOX ── */}
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                width: "100%",
                padding: "2rem 3rem",
                border: "1px solid rgba(212,165,90,0.38)",
                background: "rgba(8, 6, 4, 0.19)",
                backdropFilter: "blur(2px)",
                position: "relative",
                textAlign: "center",
              }}
            >
              {/* Corner accents */}
              {[
                { top: 10, left: 10, borderWidth: "1px 0 0 1px" },
                { top: 10, right: 10, borderWidth: "1px 1px 0 0" },
                { bottom: 10, left: 10, borderWidth: "0 0 1px 1px" },
                { bottom: 10, right: 10, borderWidth: "0 1px 1px 0" },
              ].map((c, i) => (
                <div key={i} style={{
                  position: "absolute", width: 16, height: 16,
                  borderColor: "rgba(212,165,90,0.3)", borderStyle: "solid", ...c,
                }} />
              ))}

              <motion.div variants={ITEM} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem", fontWeight: 500,
                letterSpacing: "0.5em", textTransform: "uppercase",
                color: "#eb660e", marginBottom: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem",
              }}>
                <span style={{ display: "block", width: 20, height: 1, background: "#eb660e" }} />
                Second Serve
                <span style={{ display: "block", width: 20, height: 1, background: "#eb660e" }} />
              </motion.div>

              <motion.h2 variants={ITEM} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.7rem, 4vw, 3.4rem)",
                fontWeight: 200, lineHeight: 1.1,
                color: "#f5ead6", margin: "0 0 0.7rem",
                letterSpacing: "-0.01em",
              }}>
                Together, we can feed<br />
                <em style={{ color: "rgba(245,234,214,0.62)" }}>people — not landfills.</em>
              </motion.h2>

              <motion.p variants={ITEM} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
                fontStyle: "italic", fontWeight: 300,
                color: "rgba(245,234,214,1.48)", margin: "0 0 0.7rem", lineHeight: 1.65,
              }}>
                Join the movement transforming wasted food into shared hope.
              </motion.p>

              <motion.div variants={ITEM} style={{ display: "flex", justifyContent: "center", marginBottom: "0.7rem" }}>
                <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, transparent, #d4a55a, transparent)" }} />
              </motion.div>

              <motion.p variants={ITEM} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)",
                fontStyle: "italic", color: "rgba(212,165,90,1.62)",
                margin: "0 0 0.7rem",
              }}>
                "Every meal matters. Every action counts."
              </motion.p>

              <motion.p variants={ITEM} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem", fontWeight: 300,
                color: "rgba(245,234,214,1.28)",
                maxWidth: 380, margin: "0 auto 1.5rem", lineHeight: 1.9,
              }}>
                Be part of a future where food always finds a purpose
                and no one sleeps hungry.
              </motion.p>

              <motion.div variants={ITEM} style={{
                display: "flex", gap: "1rem", justifyContent: "center",
                flexWrap: "wrap", marginBottom: "1.5rem",
              }}>
                <a href="/donate" className="cta-btn-gold">Start Donating</a>
                <a href="/volunteer" className="cta-btn-ghost">Join as Volunteer</a>
              </motion.div>

              <motion.div variants={ITEM}>
                {submitted ? (
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem", fontStyle: "italic", color: "#d4a55a",
                    padding: "0.7rem 1.4rem",
                    border: "1px solid rgba(212,165,90,0.2)",
                    maxWidth: 340, margin: "0 auto",
                    animation: "fadeUpIn 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    ✦ You are now part of the change.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "contents" }}>
                    <div className="email-row">
                      <input
                        type="email" className="email-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button type="submit" className="email-submit">Stay Updated</button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>

            

          </div>
          {/* <Footer /> */}
        </motion.div>
        {/* End sticky */}

      </div>
    </>
  );
}