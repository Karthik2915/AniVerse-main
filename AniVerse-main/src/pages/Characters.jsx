import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { setPage(1); }, [selectedLetter, searchTerm]);

  const filtered = Character.filter(
    (c) =>
      c.romji?.toUpperCase().startsWith(selectedLetter) &&
      c.romji?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paged = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < filtered.length;

  return (
    <>
      <AnimeNavbar />
      <div className="bg-[#0d0a14] min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl font-black text-purple-200 text-center mb-8"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          >
            👤 Anime Characters
          </motion.h1>

          {/* Alphabet bar */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {alphabet.map((letter) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedLetter(letter)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedLetter === letter
                    ? "bg-purple-500 text-[#0d0a14] shadow-[0_0_12px_rgba(242,222,155,0.4)]"
                    : "bg-[#1a1528] border border-purple-500/10 text-purple-300/60 hover:text-purple-200 hover:border-purple-500/30"
                }`}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg px-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 placeholder-[#9ca081]/60 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <p className="text-purple-300/60 text-sm text-center mb-6">
            {filtered.length} characters — showing {paged.length}
          </p>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {loading
                ? [...Array(12)].map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden bg-[#1a1528] border border-purple-500/10 skeleton">
                      <div className="w-full h-48 skeleton" />
                      <div className="p-3 space-y-2">
                        <div className="h-4 skeleton rounded w-3/4" />
                        <div className="h-3 skeleton rounded w-1/2" />
                        <div className="h-3 skeleton rounded w-2/3" />
                      </div>
                    </div>
                  ))
                : paged.length > 0
                ? paged.map((char, i) => (
                    <motion.div
                      key={char.id || i}
                      className="bg-[#1a1528] border border-purple-500/10 hover:border-purple-500/30 rounded-2xl overflow-hidden group transition-colors"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={char.id}
                          alt={char.romji}
                          loading="lazy"
                          className="w-full h-48 object-cover object-top bg-[#1a1528] group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />
                      </div>
                      <div className="p-3">
                        <h2 className="text-purple-200 font-bold text-sm truncate mb-1">{char.romji}</h2>
                        <div className="space-y-0.5">
                          {char.eye_color && <p className="text-purple-300/60 text-xs">👁 {char.eye_color}</p>}
                          {char.hair_color && <p className="text-purple-300/60 text-xs">💇 {char.hair_color}</p>}
                          {char.age && <p className="text-purple-300/60 text-xs">🎂 {char.age}</p>}
                          {char.sex && (
                            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 ${
                              char.sex === "Female"
                                ? "bg-pink-500/20 text-pink-300 border border-pink-500/20"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500/20"
                            }`}>
                              {char.sex}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                : (
                  <p className="col-span-full text-center text-purple-300/60 py-20">
                    No characters found for "{searchTerm || selectedLetter}"
                  </p>
                )}
            </AnimatePresence>
          </motion.div>

          {/* Load more */}
          {!loading && hasMore && (
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 bg-purple-500 text-[#0d0a14] font-bold rounded-xl hover:bg-white transition-all"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                Load More
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
