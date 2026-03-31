import React, { useContext, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import "../App.css";
import AnimeNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopContext from "../context/ShopContext";
import AnimeCard from "../components/AnimeCard";
import AnimeDetailModal from "../components/AnimeDetailModal";

const SORT_OPTIONS = [
  { label: "A–Z", fn: (a, b) => a.title.localeCompare(b.title) },
  { label: "Score ↓", fn: (a, b) => (b.score || 0) - (a.score || 0) },
  { label: "Score ↑", fn: (a, b) => (a.score || 0) - (b.score || 0) },
  { label: "Popularity", fn: (a, b) => (a.popularity || 9999) - (b.popularity || 9999) },
  { label: "Episodes ↓", fn: (a, b) => (b.episodes || 0) - (a.episodes || 0) },
];

const PAGE_SIZE = 24;

const GenreBasedFilter = () => {
  const { products } = useContext(ShopContext);
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem("selectedGenre") || "Action");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortIdx, setSortIdx] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => { localStorage.setItem("selectedGenre", selectedGenre); setPage(1); }, [selectedGenre]);
  useEffect(() => { setPage(1); }, [searchQuery, sortIdx]);

  const filtered = products
    .filter(p => p.genre?.includes(selectedGenre) && p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort(SORT_OPTIONS[sortIdx].fn);

  const paged = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < filtered.length;

  return (
    <>
      <AnimeNavbar />
      <div className="bg-[#0d0a14] min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-purple-200 mb-6 text-center">
            {selectedGenre} Anime
          </h1>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/60" />
              <input type="text" placeholder="Search within genre..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 placeholder-[#9ca081]/60 outline-none focus:border-purple-500/50" />
              {searchQuery && (
                <FaTimes onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/60 cursor-pointer hover:text-purple-200" />
              )}
            </div>
            <select value={sortIdx} onChange={e => setSortIdx(+e.target.value)}
              className="px-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 outline-none focus:border-purple-500/50 cursor-pointer">
              {SORT_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
            </select>
          </div>

          <p className="text-purple-300/60 text-sm mb-4">{filtered.length.toLocaleString()} anime · showing {paged.length}</p>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {paged.map((product, i) => (
              <AnimeCard key={product.uid || i} anime={product} index={i} onClick={setSelectedAnime} />
            ))}
          </motion.div>

          {paged.length === 0 && (
            <div className="text-center py-20 text-purple-300/60">No anime found for "{searchQuery}".</div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-8">
              <motion.button onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-purple-500 text-[#0d0a14] font-bold rounded-xl hover:bg-white transition-all"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Load More <ChevronDown size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      {selectedAnime && (
        <AnimeDetailModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}
      <Footer />
    </>
  );
};

export default GenreBasedFilter;
