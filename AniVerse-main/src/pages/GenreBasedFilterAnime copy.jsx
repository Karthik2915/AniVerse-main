import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import productsData from "../data/animesdataset.json";
import AnimeNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopContext from "../context/ShopContext";

export default function GenreBasedFilterAnime() {
  const { products, selectedGenre } = useContext(ShopContext);

  //   const [selectedGenre, setSelectedGenre] = useState([genres.genre]);

  const filteredProducts = products.filter((product) =>
    product.genre.includes(selectedGenre)
  );

  //   console.log(selectedGenre);

  return (
    <>
      <AnimeNavbar />
      <div className="p-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#202216]">
          {selectedGenre} Genre:
        </h1>

        {/* Genre Buttons */}

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#202216] border-4 border-[#202216] w-full shadow-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full bg-contain bg-[#f2de9f] h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#f2de9b]">
                    {product.title}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found for {selectedGenre}.
            </p>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
