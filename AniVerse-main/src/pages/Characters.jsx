import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import ShopContext from "../context/ShopContext";
import AnimeNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Characters() {
  const { Character } = useContext(ShopContext);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Initial data load with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Initial loading
    return () => clearTimeout(timer);
  }, []);

  // Filter characters instantly without delay
  const filteredCharacters = Character.filter(
    (char) =>
      char.romji?.startsWith(selectedLetter) &&
      char.romji?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AnimeNavbar />
      <div className="imagebody p-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#202216]">
          Anime Characters
        </h1>

        {/* Alphabet Buttons */}
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {alphabet.map((letter) => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 border rounded-lg ${
                selectedLetter === letter
                  ? "bg-[#202216] text-[#f2de9b]"
                  : "bg-white text-[#202216]"
              } transition`}
            >
              {letter}
            </motion.button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border rounded-lg text-[#202216] focus:outline-none focus:ring-2 focus:ring-[#f2de9b]"
          />
        </div>

        {/* Character Cards */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {/* Show skeleton only during initial load */}
          {loading ? (
            [...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-[#202216] border border-[#f2de9b] shadow-lg rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-[#f2de9b]" />
                <div className="p-4">
                  <div className="h-6 bg-[#f2de9b] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/2 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/3 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/4 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/5 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/6 mb-1" />
                </div>
              </motion.div>
            ))
          ) : filteredCharacters.length > 0 ? (
            filteredCharacters.map((char) => (
              <div
                key={char.id}
                className="bg-[#202216] border-4 border-[#202216] w-full shadow-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={char.id}
                  alt={char.romji}
                  className="w-full bg-contain bg-[#f2de9f] h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#f2de9b]">
                    {char.romji}
                  </h2>
                  <p className="text-[#f2de9b]">Eye Color: {char.eye_color}</p>
                  <p className="text-[#f2de9b]">
                    Hair Color: {char.hair_color}
                  </p>
                  <p className="text-[#f2de9b]">
                    Hair Length: {char.hair_length}
                  </p>
                  <p className="text-[#f2de9b]">Age: {char.age}</p>
                  <p className="text-[#f2de9b]">Sex: {char.sex}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No characters found.
            </p>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
