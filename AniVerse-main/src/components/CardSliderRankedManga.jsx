import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderPopular() {
  const { Manga } = useContext(ShopContext);

  const items = Manga.map((product, index) => ({
    key: `${product.uid}-${index}`,
    image: product.image_url,
    name: product.Title,
    rating: product.Score,
    URL: product.page_url,
    Volumes:
      product.Volumes == "?"
        ? "Currently Airing"
        : product.Volumes + " Volumes",
    popular: product.popularity,
    rank: product.ranked,
  }))
    .sort((a, b) => b.rank - a.rank)
    .slice(15, 30);

  // Mobile limit 6 items, View More shows the rest
  const visibleItems = items.slice(0, 4);

  return (
    <div className="bg-[#202216] overflow-hidden relative">
      {/* Title */}
      <div className="flex justify-start pl-4 text-[#f2de9b] font-semibold items-start">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Top Ranked
        </ScrollFloat>
      </div>

      {/* Mobile List View | Laptop Card Slider */}
      <div className="p-4 mb-10">
        {/* Mobile View: List Layout */}
        <div className="md:hidden space-y-4">
          {visibleItems.map((item, index) => (
            <div
              key={item.key}
              className="flex items-center space-x-4 bg-[#202216] text-[#f2de9b] shadow-lg cursor-pointer rounded-lg border border-[#f2de9b] p-2"
              onClick={() => window.open(item.URL, "_blank")}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                {/* Title */}
                <h3
                  className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap max-w-full"
                  title={item.name}
                >
                  {item.name.slice(0, 20) + "..."}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-2 text-lg">{item.rating}</span>
                </div>

                {/* Volumes */}
                <div className="text-sm bg-[#f2de9b] text-[#202216] rounded-full px-3 py-1 inline-block mt-2">
                  {item.Volumes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Laptop View: Cards Layout */}
        <div className="hidden md:flex no-scrollbar space-x-6 overflow-x-auto overflow-y-clip">
          {items.map((item, index) => (
            <div
              key={item.key}
              className="w-60 bg-[#202216] text-[#f2de9b] border-[#f2de9b] shadow-lg rounded-lg cursor-pointer overflow-hidden shrink-0 border "
              onClick={() => window.open(item.URL, "_blank")}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-60 object-cover"
              />

              {/* Card Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4"
              >
                {/* Title */}
                <h3
                  className="text-xl font-semibold truncate max-w-full overflow-hidden whitespace-nowrap"
                  title={item.name}
                >
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-2 text-lg">{item.rating}</span>
                </div>

                {/* Volumes */}
                <div className="mt-2 text-sm bg-[#f2de9b] text-[#202216] rounded-full px-3 py-1 inline-block">
                  {item.Volumes}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
