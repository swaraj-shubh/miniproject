import ScrollFrames from "./ScrollFrames";

const Background = ({ children }) => {
  return (
    <div
      style={{
        height: "1000vh",
        position: "relative",
        background: "black",
      }}
    >
      <ScrollFrames />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;