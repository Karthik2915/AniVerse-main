import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

const medals = ["🥇", "🥈", "🥉"];

export default function CardSliderRanked() {
  const { products } = useContext(ShopContext);

  const items = products
    .filter(p => p.ranked && p.ranked > 0)
    .map((p, i) => ({
      key: `${p.uid}-${i}`,
      image: p.img_url, name: p.title,
      rating: p.score, episodes: p.episodes,
      rank: p.ranked, URL: p.link,
    }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);

  return (
    <div className="bg-[#0d0a14] py-10 px-4 md:px-8">
      <div className="text-purple-200 font-bold text-2xl md:text-3xl mb-6 px-2">
        <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
          🏆 All-Time Ranked
        </ScrollFloat>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            className="flex gap-4 items-center bg-[#1a1528] border border-purple-500/10 rounded-2xl p-3 cursor-pointer group overflow-hidden relative"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(242,222,155,0.3)" }}
            onClick={() => window.open(item.URL, "_blank")}
          >
            {/* Rank number bg decoration */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[80px] font-black text-purple-200/5 select-none pointer-events-none">
              {item.rank}
            </div>

            {/* Rank badge */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg font-bold">
              {i < 3 ? medals[i] : <span className="text-purple-300/60 text-sm">#{item.rank}</span>}
            </div>

            {/* Image */}
            <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-18 object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ height: "72px" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-purple-200 font-semibold truncate">{item.name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-yellow-400 text-sm">★ {item.rating}</span>
                <span className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  {item.episodes || "?"} eps
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
