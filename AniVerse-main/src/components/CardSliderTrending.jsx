import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderTrending() {
  const { products } = useContext(ShopContext);
  const rowRef = useRef(null);

  const items = products
    .map((p, i) => ({
      key: `${p.uid}-${i}`,
      image: p.img_url, name: p.title,
      rating: p.score, episodes: p.episodes,
      rank: p.ranked, URL: p.link,
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20);

  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0d0a14] py-8 relative">
      <div className="flex items-center justify-between px-6 mb-4">
        <div className="text-purple-200 font-bold text-2xl md:text-3xl">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
            🔥 Top Trending
          </ScrollFloat>
        </div>
        <div className="hidden md:flex gap-2">
          {[-1, 1].map((dir) => (
            <motion.button
              key={dir}
              onClick={() => scroll(dir)}
              className="w-9 h-9 rounded-full border border-purple-500/30 text-purple-200 flex items-center justify-center hover:bg-purple-500/10 transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              {dir < 0 ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop horizontal scroll */}
      <div ref={rowRef} className="hidden md:flex gap-4 px-6 overflow-x-auto no-scrollbar pb-2">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            className="w-52 flex-shrink-0 rounded-2xl overflow-hidden bg-[#1a1528] border border-purple-500/10 cursor-pointer glow-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
            onClick={() => window.open(item.URL, "_blank")}
          >
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-purple-200 text-xs font-bold px-2 py-1 rounded-lg">
                #{i + 1}
              </div>
              {item.rating && (
                <div className="absolute top-2 right-2 bg-yellow-500/80 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  ★ {item.rating}
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-purple-200 font-semibold text-sm truncate mb-1">{item.name}</h3>
              <span className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-0.5 rounded-full">
                {item.episodes || "?"} eps
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-3 px-4">
        {items.slice(0, 5).map((item, i) => (
          <motion.div
            key={item.key}
            className="flex gap-3 bg-[#1a1528] rounded-xl border border-purple-500/10 p-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => window.open(item.URL, "_blank")}
          >
            <div className="relative flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
              <div className="absolute -top-1 -left-1 w-5 h-5 bg-purple-500 text-[#0d0a14] text-xs font-bold rounded-full flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-purple-200 font-semibold truncate">{item.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-purple-300/60 text-sm">{item.rating}</span>
              </div>
              <span className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                {item.episodes} eps
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
