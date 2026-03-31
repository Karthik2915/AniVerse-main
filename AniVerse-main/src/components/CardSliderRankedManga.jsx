import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderRankedManga() {
  const { Manga } = useContext(ShopContext);
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  const items = Manga.map((p, i) => ({
    key: `${i}`, image: p.image_url, name: p.Title,
    rating: p.Score, volumes: p.Volumes === "?" ? "Ongoing" : `${p.Volumes} vol`, URL: p.page_url,
  })).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20);

  return (
    <div className="bg-[#0d0a14] py-8">
      <div className="flex items-center justify-between px-6 mb-4">
        <div className="text-purple-200 font-bold text-2xl md:text-3xl">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
            🏅 Top Ranked Manga
          </ScrollFloat>
        </div>
        <div className="hidden md:flex gap-2">
          {[-1, 1].map(dir => (
            <motion.button key={dir} onClick={() => scroll(dir)}
              className="w-9 h-9 rounded-full border border-purple-500/30 text-purple-200 flex items-center justify-center hover:bg-purple-500/10 transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {dir < 0 ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
            </motion.button>
          ))}
        </div>
      </div>

      <div ref={rowRef} className="hidden md:flex gap-4 px-6 overflow-x-auto no-scrollbar pb-2">
        {items.map((item, i) => (
          <motion.div key={item.key}
            className="w-48 flex-shrink-0 rounded-2xl overflow-hidden bg-[#1a1528] border border-purple-500/10 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.5) }}
            whileHover={{ y: -5 }}
            onClick={() => window.open(item.URL, "_blank")}>
            <div className="relative overflow-hidden">
              <img src={item.image} alt={item.name} loading="lazy"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] to-transparent" />
              {item.rating && (
                <div className="absolute top-2 right-2 bg-yellow-500/80 text-black text-xs font-bold px-2 py-0.5 rounded-lg">
                  ★ {item.rating}
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-purple-200 text-sm font-semibold truncate mb-1">{item.name}</h3>
              <span className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-0.5 rounded-full">{item.volumes}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden grid grid-cols-2 gap-3 px-4">
        {items.slice(0,4).map((item, i) => (
          <motion.div key={item.key}
            className="rounded-xl overflow-hidden bg-[#1a1528] border border-purple-500/10 cursor-pointer"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            onClick={() => window.open(item.URL, "_blank")}>
            <img src={item.image} alt={item.name} loading="lazy" className="w-full h-36 object-cover" />
            <div className="p-2">
              <p className="text-purple-200 text-xs font-semibold truncate">{item.name}</p>
              <p className="text-purple-300/60 text-[10px]">★ {item.rating}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
