import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Experience } from "../components/Experience.jsx";
import { UI } from "../components/UI.jsx";
import AnimeNavbar from "../components/Navbar.jsx";

function Fun() {
  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <AnimeNavbar />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="relative"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <UI />
        <Loader
          containerStyles={{ background: "#0f1009" }}
          innerStyles={{ background: "#202216", borderRadius: 12 }}
          barStyles={{ background: "#f2de9b" }}
          dataStyles={{ color: "#9ca081" }}
        />
        <Canvas shadows camera={{ position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9], fov: 45 }}>
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
      </motion.div>
    </div>
  );
}
export default Fun;
