import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import AnimeCard from "./AnimeCard";

const AnimeGrid = ({ onAnimeClick }) => {
  const { products } = useContext(ShopContext);
  const [shuffled, setShuffled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const count = window.innerWidth < 768 ? 8 : 16;
      const s = [...products].sort(() => Math.random() - 0.5).slice(0, count);
      setTimeout(() => { setShuffled(s); setLoading(false); }, 800);
    }
  }, [products]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full h-48 skeleton rounded-2xl" />
          ))
        : shuffled.map((product, i) => (
            <AnimeCard key={product.uid || i} anime={product} index={i} onClick={onAnimeClick} />
          ))}
    </div>
  );
};

export default AnimeGrid;
