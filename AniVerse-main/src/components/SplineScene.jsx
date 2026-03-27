import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import AnimeNavbar from "./Navbar";

export default function AniVerse() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const splineScene = isMobile
    ? "https://prod.spline.design/UsE-RAeji1ZWCDH0/scene.splinecode"
    : "https://prod.spline.design/QmQ1403JcMuoP-hu/scene.splinecode";

  const containerStyle = isMobile
    ? "w-full h-screen flex items-center justify-center "
    : "min-h-screen flex items-center justify-center ";

  return (
    <>
      <AnimeNavbar />
      <div className={containerStyle}>
        <Spline scene={splineScene} showControls={false} />
      </div>
    </>
  );
}
