import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Copy, Check } from "lucide-react";
import AnimeNavbar from "../components/Navbar";
import ShopContext from "../context/ShopContext";
import Footer from "../components/Footer";

const Quotes = () => {
  const { Quotes } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayQuotes, setDisplayQuotes] = useState([]);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [filterAnime, setFilterAnime] = useState("All");
  const itemCount = window.innerWidth < 768 ? 9 : 18;

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("quoteOfTheDayDate");
    const storedQuote = localStorage.getItem("quoteOfTheDay");
    if (storedDate === today && storedQuote) {
      setQuoteOfTheDay(JSON.parse(storedQuote));
    } else {
      const r = Quotes[Math.floor(Math.random() * Quotes.length)];
      localStorage.setItem("quoteOfTheDayDate", today);
      localStorage.setItem("quoteOfTheDay", JSON.stringify(r));
      setQuoteOfTheDay(r);
    }
  }, [Quotes]);

  useEffect(() => {
    if (searchTerm || filterAnime !== "All") {
      const filtered = Quotes.filter(
        (q) =>
          (filterAnime === "All" || q.Anime === filterAnime) &&
          (q.Character?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.Anime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.Quote?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setDisplayQuotes(filtered);
    } else {
      setDisplayQuotes([...Quotes].sort(() => Math.random() - 0.5).slice(0, itemCount));
    }
  }, [searchTerm, Quotes, itemCount, filterAnime]);

  const shuffle = () => {
    setSearchTerm("");
    setFilterAnime("All");
    setDisplayQuotes([...Quotes].sort(() => Math.random() - 0.5).slice(0, itemCount));
  };

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const uniqueAnimes = ["All", ...new Set(Quotes.map(q => q.Anime).filter(Boolean))].slice(0, 20);

  return (
    <>
      <AnimeNavbar />
      <div className="bg-[#0d0a14] min-h-screen">
        {/* Hero quote of the day */}
        {quoteOfTheDay && (
          <div className="bg-gradient-to-br from-[#202216] to-[#0f1009] border-b border-purple-500/10 px-4 py-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                  ✨ Quote of the Day
                </span>
                <blockquote className="text-2xl md:text-3xl font-bold text-purple-200 italic leading-relaxed mb-6">
                  "{quoteOfTheDay.Quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-200 font-bold text-sm">
                    {quoteOfTheDay.Character?.[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-purple-200 font-semibold">{quoteOfTheDay.Character}</p>
                    <p className="text-purple-300/60 text-sm">from {quoteOfTheDay.Anime}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/60" />
              <input
                type="text"
                placeholder="Search quotes, characters, anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 placeholder-[#9ca081]/60 outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <select
              value={filterAnime}
              onChange={e => setFilterAnime(e.target.value)}
              className="px-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 outline-none focus:border-purple-500/50 cursor-pointer"
            >
              {uniqueAnimes.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <motion.button
              onClick={shuffle}
              className="flex items-center gap-2 px-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-300/60 hover:text-purple-200 transition-colors"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97, rotate: 180 }}
            >
              <RefreshCw size={16} /> Shuffle
            </motion.button>
          </div>

          {/* Quotes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {displayQuotes.map((quote, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.5) }}
                  className="bg-[#1a1528] border border-purple-500/10 hover:border-purple-500/25 rounded-2xl p-5 relative group transition-colors"
                  whileHover={{ y: -3 }}
                >
                  {/* Quote mark */}
                  <span className="absolute top-3 left-4 text-4xl text-purple-200/10 font-serif leading-none select-none">❝</span>

                  <div className="pt-4">
                    <p className="text-purple-200 italic text-sm leading-relaxed mb-4 line-clamp-4">
                      "{quote.Quote}"
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-purple-200 font-bold text-sm">{quote.Character}</p>
                        <p className="text-purple-300/60 text-xs">{quote.Anime}</p>
                      </div>
                      <motion.button
                        onClick={() => copy(quote.Quote, i)}
                        className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-300/60 hover:text-purple-200 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                      >
                        {copiedId === i ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {displayQuotes.length === 0 && (
            <div className="text-center py-20 text-purple-300/60">
              No quotes found. Try a different search.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Quotes;
