import { useEffect, useRef, useState } from "react";

const ImpactSection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fade = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 1s ease ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const dots = [
    { num: "284K+", label: "Meals Rescued" },
    { num: "1,420T", label: "Food Saved" },
    { num: "890+", label: "Active Donors" },
    { num: "142+", label: "NGO Partners" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .impact-wrap {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          padding: 0 2rem;
        }

        .impact-inner {
          max-width: 960px;
          width: 100%;
          text-align: center;
        }

        .impact-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.63rem;
          font-weight: 500;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #d4a55a;
          margin-bottom: 1.5rem;
        }

        .impact-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 200;
          line-height: 1.1;
          color: #f5ead6;
          margin: 0 0 1.2rem;
          text-shadow: 0 4px 60px rgba(0,0,0,0.5);
        }

        .impact-subheading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-style: italic;
          font-weight: 300;
          color: rgba(245,234,214,0.62);
          margin: 0 0 1rem;
          line-height: 1.65;
        }

        .impact-divider {
          width: 56px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4a55a, transparent);
          margin: 0.5rem auto 1rem;
        }

        .impact-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          font-style: italic;
          color: rgba(212,165,90,0.72);
          margin: 0 0 1.2rem;
        }

        .impact-support {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 300;
          color: rgba(245,234,214,0.4);
          max-width: 500px;
          margin: 0 auto 3rem;
          line-height: 1.9;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(212,165,90,0.1);
          border: 1px solid rgba(212,165,90,0.1);
          max-width: 760px;
          margin: 0 auto;
        }
        @media (max-width: 600px) {
          .impact-stats { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-cell {
          background: rgba(8,6,4,0.55);
          backdrop-filter: blur(8px);
          padding: 1.8rem 1rem;
          text-align: center;
        }

        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 200;
          color: #d4a55a;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,234,214,0.35);
        }
      `}</style>

      <div id="impact" ref={ref} className="impact-wrap">
        <div className="impact-inner">
          <div className="impact-eyebrow" style={fade(0)}>The Impact</div>

          <h2 className="impact-heading" style={fade(120)}>
            No food wasted.<br />No one forgotten.
          </h2>

          <p className="impact-subheading" style={fade(250)}>
            Every rescued meal carries dignity, warmth, and hope.
          </p>

          <div className="impact-divider" style={fade(350)} />

          <p className="impact-quote" style={fade(430)}>
            "A meal shared is humanity restored."
          </p>

          <p className="impact-support" style={fade(530)}>
            Through Second Serve, surplus food reaches the hands that need it
            most — creating smiles instead of waste.
          </p>

          <div className="impact-stats">
            {dots.map((d, i) => (
              <div
                key={d.label}
                className="stat-cell"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.9s ease ${600 + i * 140}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${600 + i * 140}ms`,
                }}
              >
                <div className="stat-num">{d.num}</div>
                <div className="stat-label">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpactSection;