import { useEffect, useRef } from "react";
import ScrollFrames from "../components/ScrollFrames";

const Home = () => {
  return (
    <div
      style={{
        height: "2600vh",
        position: "relative",
        background: "black",
      }}
    >
      <ScrollFrames />

      <div
        style={{
          position: "fixed",
          inset: 0,
          // make the background transparent so we can see the frames, but still have a dark overlay effect
          // background: "rgba(0,0,0,0.25)",
          zIndex: 0,
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "4rem",
          fontWeight: "bold",
        }}
      >
        Feed Hope
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "3rem",
        }}
      >
        No Food Wasted
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "3rem",
        }}
      >
        Every Meal Matters
      </section>
    </div>
  );
};

export default Home;