import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopContext from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GENRES = ["Action","Adventure","Comedy","Drama","Fantasy","Romance","Sci-Fi","Mystery","Horror","Sports","Slice of Life","Supernatural","Shounen","Seinen"];

export default function RandomPicker() {
  const { products } = useContext(ShopContext);
  const [picked, setPicked] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [genre, setGenre] = useState("All");
  const [minScore, setMinScore] = useState(7);
  const [history, setHistory] = useState([]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setPicked(null);

    let pool = products.filter(p =>
      p.img_url?.startsWith("https://") && p.score >= minScore
    );
    if (genre !== "All") pool = pool.filter(p => p.genre?.includes(genre));
    if (pool.length === 0) { setSpinning(false); return; }

    let count = 0;
    const total = 20;
    const interval = setInterval(() => {
      const r = pool[Math.floor(Math.random() * pool.length)];
      setPicked(r);
      count++;
      if (count >= total) {
        clearInterval(interval);
        const final = pool[Math.floor(Math.random() * pool.length)];
        setPicked(final);
        setHistory(h => [final, ...h].slice(0, 5));
        setSpinning(false);
      }
    }, 80 + count * 6);
  };

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-purple-200 mb-2">🎲 What Should I Watch?</h1>
          <p className="text-purple-300/60">Can't decide? Let fate choose for you!</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-5 mb-6">
          <div className="mb-4">
            <label className="text-purple-300/60 text-xs uppercase tracking-wider mb-2 block">Genre</label>
            <div className="flex flex-wrap gap-2">
              {["All", ...GENRES].map(g => (
                <button key={g} onClick={() => setGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    genre === g ? "bg-purple-500 text-[#0d0a14]" : "bg-purple-500/10 text-purple-300/60 hover:text-purple-200"
                  }`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-purple-300/60 text-xs uppercase tracking-wider mb-2 block">
              Min Score: <span className="text-purple-200 font-bold">{minScore}+</span>
            </label>
            <input type="range" min="1" max="10" step="0.5" value={minScore}
              onChange={e => setMinScore(+e.target.value)}
              className="w-full accent-[#f2de9b]" />
          </div>
        </div>

        {/* Spin button */}
        <motion.button
          onClick={spin}
          disabled={spinning}
          className="w-full py-5 bg-purple-500 text-[#0d0a14] font-black text-2xl rounded-2xl mb-8 disabled:opacity-60"
          whileHover={!spinning ? { scale: 1.03 } : {}}
          whileTap={!spinning ? { scale: 0.97 } : {}}
          animate={spinning ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: spinning ? Infinity : 0, duration: 0.4 }}
        >
          {spinning ? "🎲 Spinning..." : "🎲 Pick For Me!"}
        </motion.button>

        {/* Result card */}
        <AnimatePresence mode="popLayout">
          {picked && (
            <motion.div
              key={picked.uid}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`bg-[#1a1528] border rounded-2xl overflow-hidden mb-8 ${spinning ? "border-[#9ca081]/20" : "border-purple-500/40 shadow-[0_0_40px_rgba(242,222,155,0.15)]"}`}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="relative">
                <img src={picked.img_url} alt={picked.title}
                  className="w-full h-64 object-cover object-top"
                  style={{ filter: spinning ? "blur(4px) brightness(0.5)" : "none", transition: "filter 0.3s" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202216] via-transparent to-transparent" />
                {!spinning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 left-3 bg-purple-500 text-[#0d0a14] px-3 py-1 rounded-full text-xs font-black"
                  >
                    🎯 Your Pick!
                  </motion.div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-black text-purple-200 mb-2">{picked.title}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {picked.genre?.slice(0,4).map((g, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300/60 rounded-full">{g}</span>
                  ))}
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="text-center"><div className="text-purple-200 font-bold">★ {picked.score}</div><div className="text-purple-300/60 text-xs">Score</div></div>
                  <div className="text-center"><div className="text-purple-200 font-bold">{picked.episodes || "?"}</div><div className="text-purple-300/60 text-xs">Episodes</div></div>
                  <div className="text-center"><div className="text-purple-200 font-bold">#{picked.ranked}</div><div className="text-purple-300/60 text-xs">Rank</div></div>
                </div>
                {!spinning && (
                  <div className="flex gap-3">
                    <a href={picked.link} target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-2 bg-purple-500 text-[#0d0a14] font-bold rounded-xl text-sm text-center hover:bg-white transition-colors">
                      View on MAL →
                    </a>
                    <button onClick={spin}
                      className="px-4 py-2 border border-purple-500/30 text-purple-300/60 rounded-xl text-sm hover:text-purple-200 transition-colors">
                      Re-roll
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        {history.length > 1 && (
          <div>
            <h3 className="text-purple-300/60 text-sm font-semibold mb-3">Recent Picks</h3>
            <div className="grid grid-cols-5 gap-2">
              {history.slice(1).map((a, i) => (
                <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
                  className="rounded-lg overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-colors group">
                  <img src={a.img_url} alt={a.title} loading="lazy"
                    className="w-full h-20 object-cover group-hover:brightness-110 transition-all" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
