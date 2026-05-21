import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 768;

const ScrollFrames = () => {
  const canvasRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [failedFrames, setFailedFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = TOTAL_FRAMES;

    const getFramePath = (index) => {
      return `/frames768/frame_${String(index + 1).padStart(4, "0")}.jpg`;
    };

    const images = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();

      img.src = getFramePath(i);

      img.onload = () => {
        console.log(`✅ Loaded frame ${i + 1}`);

        setLoadedCount((prev) => prev + 1);

        if (i === 0) {
          context.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
      };

      img.onerror = () => {
        console.error(`❌ Missing frame ${i + 1}`);

        setFailedFrames((prev) => [...prev, i + 1]);
      };

      images.push(img);
    }

    const render = () => {
      const scrollTop = window.scrollY;

      const maxScroll =
        document.body.scrollHeight - window.innerHeight;

      const scrollFraction = scrollTop / maxScroll;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      setCurrentFrame(frameIndex + 1);

      requestAnimationFrame(() => {
        context.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const img = images[frameIndex];

        if (img && img.complete) {
          context.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          console.warn(
            `⚠️ Frame ${frameIndex + 1} not ready`
          );
        }
      });
    };

    window.addEventListener("scroll", render);

    return () => {
      window.removeEventListener("scroll", render);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 9999,
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "10px",
          fontSize: "14px",
          borderRadius: "8px",
          fontFamily: "monospace",
        }}
      >
        {/* <div>Current Frame: {currentFrame}</div>

        <div>
          Loaded: {loadedCount}/{TOTAL_FRAMES}
        </div>

        <div>
          Missing: {failedFrames.length}
        </div> */}

        {failedFrames.length > 0 && (
          <div
            style={{
              maxHeight: "100px",
              overflowY: "auto",
              marginTop: "5px",
              color: "red",
            }}
          >
            {failedFrames.join(", ")}
          </div>
        )}
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </>
  );
};

export default ScrollFrames;