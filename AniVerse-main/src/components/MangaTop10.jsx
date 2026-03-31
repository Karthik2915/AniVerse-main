import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";

const MangaTop10 = () => {
  const { Manga } = useContext(ShopContext);
  const Top10 = Manga.sort((a, b) => a.Rank - b.Rank).slice(0, 10);

  return (
    <div className="bg-[#13102 0] py-10 px-4 md:px-8">
      <motion.h2
        className="text-2xl md:text-3xl font-black text-purple-200 mb-6"
        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      >
        🏆 Top 10 Manga of All Time
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Top10.map((item, i) => (
          <motion.div
            key={item.id || i}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            onClick={() => window.open(item.page_url, "_blank")}
          >
            <img
              src={item.image_url}
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              alt={item.Title}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Rank badge */}
            <div className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
              i === 0 ? "bg-yellow-400 text-yellow-900" :
              i === 1 ? "bg-gray-300 text-gray-700" :
              i === 2 ? "bg-orange-400 text-orange-900" :
              "bg-purple-500/20 text-purple-200 border border-purple-500/30"
            }`}>
              {i + 1}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-purple-200 font-bold text-sm truncate">{item.Title}</p>
              {item.Score && <p className="text-yellow-400 text-xs">★ {item.Score}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MangaTop10;
