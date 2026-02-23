import React, { useEffect, useState } from "react";

interface Props {
  exiting?: boolean;
}

const LoadingScreen: React.FC<Props> = ({ exiting: _exiting = false }) => {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 96) return 96;
        return p + 4;
      });
    }, 160);

    return () => clearInterval(id);
  }, []);

  // The loader overlay covers the viewport and does not fade here.
  const container: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    background: "#16302B",
    margin: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    overflow: "hidden",
    zIndex: 9999,
  };

  // center the loading box in the viewport while preserving the exact inner sizes
  const loadingBox: React.CSSProperties = {
    position: "absolute",
    width: "379px",
    height: "80px",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  const kyrantStyle: React.CSSProperties = {
    position: "absolute",
    width: "114.53px",
    height: "29.73px",
    left: "50%",
    top: "0px",
    transform: "translateX(-50%)",
    color: "#F7E8B8",
    fontSize: "28px",
    lineHeight: "29px",
    textAlign: "center",
    fontFamily: "'Pacifico', 'Segoe UI', Roboto, sans-serif",
    userSelect: "none",
  };

  const barWrap: React.CSSProperties = {
    position: "absolute",
    width: "379px",
    height: "5px",
    left: "0",
    top: "75px", // matches 357 - 282 = 75px offset used previously
    background: "rgba(255,255,255,0.06)",
    borderRadius: "3px",
    overflow: "hidden",
  };

  const progressStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: `${progress}%`,
    background: "#5f725f",
    borderRadius: "3px",
    transition: "width 160ms linear",
  };

  return (
    <div style={container} aria-hidden>
      <div style={loadingBox}>
        <div style={kyrantStyle}>Kyrant</div>
        <div style={barWrap}>
          <div style={progressStyle} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
