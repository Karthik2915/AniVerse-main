"use client";
import { useState, useEffect, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ShopContext from "../context/ShopContext";

const SliderSkeleton = () => (
  <div className="w-full h-[580px] skeleton relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <div className="absolute bottom-12 left-8 space-y-3">
      <div className="h-10 w-72 skeleton rounded-lg" />
      <div className="h-4 w-56 skeleton rounded" />
      <div className="h-10 w-32 skeleton rounded-lg mt-4" />
    </div>
  </div>
);

export default function Slider() {
  const { products } = useContext(ShopContext);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(1);

  const items = Array.isArray(products) ? products.slice(0, 12) : [];

  useEffect(() => { setTimeout(() => setLoading(false), 1800); }, []);

  const go = useCallback((dir) => {
    setDirection(dir);
    setCurrent(p => (p + dir + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!auto || items.length === 0) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [auto, go, items.length]);

  if (loading) return <SliderSkeleton />;
  if (items.length === 0) return null;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }),
  };

  const product = items[current];

  return (
    <div
      className="relative w-full h-[580px] overflow-hidden bg-[#0d0a14]"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={product.img_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-14 pl-6 md:pl-12">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-semibold rounded-full backdrop-blur-sm">
                  #{current + 1} Featured
                </span>
                {product.score && (
                  <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold rounded-full backdrop-blur-sm">
                    ★ {product.score}
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 max-w-xl leading-tight">
                {product.title}
              </h2>

              <p className="text-purple-300/60 text-sm md:text-base mb-5 max-w-lg line-clamp-2">
                {product.genre?.join(" · ") || ""}
              </p>

              <motion.a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-[#0d0a14] font-bold rounded-xl hover:bg-white transition-all duration-200 text-sm md:text-base"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                More Info <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      {[{ dir: -1, icon: <ChevronLeft size={22} />, pos: "left-4" },
        { dir: 1, icon: <ChevronRight size={22} />, pos: "right-4" }].map(({ dir, icon, pos }) => (
        <motion.button
          key={dir}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/40 transition-all`}
          onClick={() => go(dir)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`rounded-full transition-all duration-300 ${i === current ? "bg-purple-500 w-6 h-2" : "bg-white/30 w-2 h-2 hover:bg-white/60"}`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      {auto && (
        <motion.div
          key={current}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-300 to-violet-300"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      )}
    </div>
  );
}
