import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";

const MangaSlide = () => {
  const { Manga } = useContext(ShopContext);
  const mangaData = Manga;
  const itemCount = 15;
  const shuffled = [...mangaData]
    .sort(() => Math.random() - 0.5)
    .slice(0, itemCount);

  return (
    <div
      className="flex gap-4 overflow-x-auto no-scrollbar pl-5 pb-5"
      style={{ scrollbarWidth: "none" }}
    >
      {shuffled.map((manga) => (
        <motion.div
          key={manga.id}
          className="w-[200px] h-[270px] flex-shrink-0 rounded-xl border border-[#f2de9f] overflow-hidden shadow-lg cursor-pointer relative"
          whileHover={{ scale: 1.0 }}
        >
          <img
            src={manga.image_url}
            alt={manga.Title}
            className="w-full h-full object-cover"
            onClick={() => window.open(manga.page_url, "_blank")}
          />
          <div className="absolute bottom-0 w-full bg-[#202216] bg-opacity-70 text-white text-center py-2">
            {manga.Title}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MangaSlide;
