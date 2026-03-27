import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../App.css";
import productsData from "../data/animesdataset.json";
import AnimeNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopContext from "../context/ShopContext";

const GenreBasedFilter = () => {
  const { products } = useContext(ShopContext);
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || "Action"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);

  const filteredProducts = products.filter(
    (product) =>
      product.genre &&
      product.genre.includes(selectedGenre) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(selectedGenre);

  return (
    <>
      <AnimeNavbar />
      <div className="p-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#202216]">
          {selectedGenre} Genre:
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#202216]"
            />
            {searchQuery && (
              <FaTimes
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#202216]"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#202216] border-4 border-[#202216] w-full cursor-pointer shadow-lg rounded-2xl overflow-hidden"
                onClick={() => window.open(product.link, "_blank")}
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
};

export default GenreBasedFilter;
