import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";

const MangaSlide = () => {
  const { Manga } = useContext(ShopContext);
  const shuffled = [...Manga].sort(() => Math.random() - 0.5).slice(0, 15);

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
      {shuffled.map((manga, i) => (
        <motion.div
          key={manga.id || i}
          className="w-[180px] flex-shrink-0 rounded-2xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 cursor-pointer group relative"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(i * 0.05, 0.6) }}
          whileHover={{ y: -4 }}
          onClick={() => window.open(manga.page_url, "_blank")}
        >
          <img
            src={manga.image_url}
            alt={manga.Title}
            loading="lazy"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-purple-200 font-bold text-xs truncate">{manga.Title}</p>
            {manga.Score && <p className="text-yellow-400 text-[10px]">★ {manga.Score}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MangaSlide;
