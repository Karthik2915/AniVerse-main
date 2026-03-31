import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";

const MangaGrid = () => {
  const { Manga } = useContext(ShopContext);
  const [shuffled, setShuffled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Manga.length > 0) {
      const count = window.innerWidth < 768 ? 8 : 16;
      const s = [...Manga].sort(() => Math.random() - 0.5).slice(0, count);
      setTimeout(() => { setShuffled(s); setLoading(false); }, 800);
    }
  }, [Manga]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full h-48 skeleton rounded-2xl" />
          ))
        : shuffled.map((m, i) => (
            <motion.div
              key={m.id || i}
              className="rounded-2xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 cursor-pointer group relative"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              whileHover={{ y: -4 }}
              onClick={() => window.open(m.page_url, "_blank")}
            >
              <img src={m.image_url} alt={m.Title} loading="lazy"
                className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-purple-200 text-xs font-semibold truncate">{m.Title}</p>
              </div>
            </motion.div>
          ))}
    </div>
  );
};

export default MangaGrid;
