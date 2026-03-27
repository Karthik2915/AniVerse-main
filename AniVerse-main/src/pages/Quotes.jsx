import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimeNavbar from "../components/Navbar";
import ShopContext from "../context/ShopContext";
import Footer from "../components/Footer";

const Quotes = () => {
  const { Quotes } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayQuotes, setDisplayQuotes] = useState([]);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const itemCount = window.innerWidth < 768 ? 7 : 15;

  useEffect(() => {
    // Set quote of the day, changes every 24 hrs
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("quoteOfTheDayDate");
    const storedQuote = localStorage.getItem("quoteOfTheDay");

    if (storedDate === today && storedQuote) {
      setQuoteOfTheDay(JSON.parse(storedQuote));
    } else {
      const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
      localStorage.setItem("quoteOfTheDayDate", today);
      localStorage.setItem("quoteOfTheDay", JSON.stringify(randomQuote));
      setQuoteOfTheDay(randomQuote);
    }
  }, [Quotes]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = Quotes.filter(
        (quote) =>
          quote.Character?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.Anime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.Quote?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayQuotes(filtered);
    } else {
      const randomQuotes = [...Quotes]
        .sort(() => Math.random() - 0.5)
        .slice(0, itemCount);
      setDisplayQuotes(randomQuotes);
    }
  }, [searchTerm, Quotes, itemCount]);

  return (
    <>
      <AnimeNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f2de9b] to-[#202216] flex flex-col items-center p-4">
        {/* Quote of the Day */}
        {quoteOfTheDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-7xl mt-8 bg-[#f2de9b] rounded-lg shadow-lg p-6 mb-8 border border-yellow-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full border-2 border-yellow-400 flex-shrink-0"></div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-[#202216]">
                  {quoteOfTheDay.Character}
                </h2>
                <p className="text-gray-600">From {quoteOfTheDay.Anime}</p>
              </div>
              <button className="ml-auto bg-yellow-300 text-yellow-800 text-sm px-3 py-1 rounded-full hover:scale-105 transition-transform">
                ✨ Quote of the Day
              </button>
            </div>
            <blockquote className="italic text-lg mb-4 text-[#202216]">
              "{quoteOfTheDay.Quote}"
            </blockquote>
          </motion.div>
        )}

        {/* Search Bar */}
        <div className="flex gap-2 mb-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search Quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 w-full text-sm sm:text-base"
          />
          <button className="bg-[#202216] text-[#f2de9b] p-2 rounded-lg hover:scale-105 transition-transform">
            <FaSearch className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* Quotes Grid */}
        <div className="p-4 bg-[#202216] w-full max-w-8xl rounded-lg shadow-lg mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-[#202216] border border-[#f2de9b] rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                <h3 className="text-lg font-bold text-[#f2de9b]">
                  {quote.Character}
                </h3>
                <p className="text-sm text-[#fff]">{quote.Anime}</p>
                <blockquote className="italic mt-2 font-semibold text-[#f2de9b]">
                  "{quote.Quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Quotes;
