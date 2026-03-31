import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderPopular() {
  const { products } = useContext(ShopContext);
  const rowRef = useRef(null);

  const items = products
    .map((p, i) => ({
      key: `${p.uid}-${i}`,
      image: p.img_url, name: p.title,
      rating: p.score, episodes: p.episodes,
      popular: p.popularity, URL: p.link,
    }))
    .sort((a, b) => a.popular - b.popular)
    .slice(0, 20);

  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="bg-[#13102 0] py-8 relative">
      <div className="flex items-center justify-between px-6 mb-4">
        <div className="text-purple-200 font-bold text-2xl md:text-3xl">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
            👑 Most Popular
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

      <div ref={rowRef} className="hidden md:flex gap-4 px-6 overflow-x-auto no-scrollbar pb-2">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            className="w-48 flex-shrink-0 rounded-2xl overflow-hidden bg-[#1a1528] border border-[#9ca081]/20 cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => window.open(item.URL, "_blank")}
          >
            <div className="relative overflow-hidden">
              <img src={item.image} alt={item.name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-purple-300/60" />
                  <span className="text-purple-300/60 text-xs">#{item.popular}</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-b from-[#202216] to-[#1a1d10]">
              <h3 className="text-purple-200 font-semibold text-sm truncate mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-300/60">★ {item.rating}</span>
                <span className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  {item.episodes || "?"} eps
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden grid grid-cols-2 gap-3 px-4">
        {items.slice(0, 4).map((item, i) => (
          <motion.div
            key={item.key}
            className="rounded-xl overflow-hidden bg-[#1a1528] border border-[#9ca081]/20 cursor-pointer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => window.open(item.URL, "_blank")}
          >
            <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
            <div className="p-2">
              <h3 className="text-purple-200 text-xs font-semibold truncate">{item.name}</h3>
              <span className="text-purple-300/60 text-xs">★ {item.rating}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
