import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderPopular() {
  const { products } = useContext(ShopContext);

  const items = products
    .map((product, index) => ({
      key: `${product.uid}-${index}`,
      image: product.img_url,
      name: product.title,
      rating: product.score,
      episodes: product.episodes,
      popular: product.popularity,
      URL: product.link,
    }))
    .sort((a, b) => a.popular - b.popular)
    .slice(0, 15);

  // Mobile limit 6 items, View More shows the rest
  const visibleItems = items.slice(0, 4);

  return (
    <div className="bg-[#f2de9b] overflow-hidden relative">
      {/* Title */}
      <div className="flex justify-start pl-4 text-[#202216] font-semibold items-start">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Top Popular
        </ScrollFloat>
      </div>

      {/* Mobile List View | Laptop Card Slider */}
      <div className="p-4 mb-10">
        {/* Mobile View: List Layout */}
        <div className="md:hidden space-y-4">
          {visibleItems.map((item, index) => (
            <div
              key={item.key}
              className="flex items-center space-x-4 bg-[#f2de9b] text-[#202216] shadow-lg cursor-pointer rounded-lg border border-[#202216] p-2"
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
                <h3
                  className="text-lg font-semibold truncate"
                  title={item.name}
                >
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-2 text-lg">{item.rating}</span>
                </div>

                {/* Episodes */}
                <div className="text-sm bg-[#f2de9b] text-[#202216] rounded-full px-3 py-1 inline-block mt-2">
                  {item.episodes} Episodes
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Laptop View: Cards Layout */}
        <div className="hidden md:flex no-scrollbar space-x-6 overflow-x-auto overflow-y-clip">
          {items.map((item, index) => (
            <motion.div
              key={item.key}
              className="w-60 bg-[#f2de9b] text-[#202216] shadow-lg cursor-pointer rounded-lg overflow-hidden shrink-0 border border-[#202216]"
              onClick={() => window.open(item.URL, "_blank")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
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

                {/* Episodes */}
                <div className="mt-2 text-sm bg-[#202216] text-[#f2de9b] rounded-full px-3 py-1 inline-block">
                  {item.episodes} Episodes
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
