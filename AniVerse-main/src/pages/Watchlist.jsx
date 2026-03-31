import { useContext } from "react";
import { motion } from "framer-motion";
import { Trash2, ExternalLink } from "lucide-react";
import ShopContext from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STATUS_LABELS = { plan: "📋 Plan to Watch", watching: "▶ Watching", completed: "✓ Completed" };
const STATUS_COLORS = {
  plan: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  watching: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  completed: "border-green-500/40 bg-green-500/10 text-green-300",
};

export default function Watchlist() {
  const { watchlist, products, removeFromWatchlist, addToWatchlist, favourites, isFavourite } = useContext(ShopContext);

  const getAnime = (uid) => products.find(p => String(p.uid) === uid);

  const grouped = { plan: [], watching: [], completed: [] };
  watchlist.forEach(w => {
    const anime = getAnime(w.uid);
    if (anime) grouped[w.status]?.push({ ...w, anime });
  });

  const favAnimes = products.filter(p => isFavourite(String(p.uid)));

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl font-black text-purple-200 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📚 My Lists
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "Plan to Watch", count: grouped.plan.length, color: "text-blue-300" },
            { label: "Watching", count: grouped.watching.length, color: "text-yellow-300" },
            { label: "Completed", count: grouped.completed.length, color: "text-green-300" },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-[#1a1528] border border-purple-500/10 rounded-xl p-4 text-center">
              <div className={`text-3xl font-black ${color}`}>{count}</div>
              <div className="text-xs text-purple-300/60 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Watchlist sections */}
        {Object.entries(grouped).map(([status, items]) => (
          items.length > 0 && (
            <div key={status} className="mb-8">
              <h2 className="text-lg font-bold text-purple-200 mb-4">{STATUS_LABELS[status]}</h2>
              <div className="space-y-3">
                {items.map(({ uid, anime }) => (
                  <motion.div
                    key={uid}
                    className="flex items-center gap-4 bg-[#1a1528] border border-purple-500/10 rounded-xl p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <img src={anime.img_url} alt={anime.title} loading="lazy"
                      className="w-14 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-purple-200 font-semibold truncate">{anime.title}</h3>
                      <p className="text-purple-300/60 text-xs mt-1">
                        {anime.genre?.slice(0,3).join(" · ")} · ★ {anime.score}
                      </p>
                      {/* Status switcher */}
                      <div className="flex gap-2 mt-2">
                        {Object.keys(STATUS_LABELS).map(s => (
                          <button key={s} onClick={() => addToWatchlist(uid, s)}
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                              s === status ? STATUS_COLORS[s] : "border-purple-500/10 text-purple-300/60 hover:border-purple-500/30"
                            }`}>
                            {s === "plan" ? "Plan" : s === "watching" ? "Watching" : "Done"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <a href={anime.link} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-300/60 hover:text-purple-200 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                      <button onClick={() => removeFromWatchlist(uid)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        ))}

        {watchlist.length === 0 && (
          <div className="text-center py-20">
            <p className="text-purple-300/60 text-lg mb-2">Your watchlist is empty</p>
            <p className="text-purple-300/60/60 text-sm">Click on any anime card and add it to your list</p>
          </div>
        )}

        {/* Favourites section */}
        {favAnimes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-purple-200 mb-4">❤️ Favourites ({favAnimes.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {favAnimes.map((a, i) => (
                <motion.a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
                  className="rounded-xl overflow-hidden bg-[#1a1528] border border-red-500/20 group"
                  whileHover={{ scale: 1.04 }}
                >
                  <img src={a.img_url} alt={a.title} loading="lazy" className="w-full h-36 object-cover group-hover:brightness-110 transition-all" />
                  <div className="p-2">
                    <p className="text-purple-200 text-xs font-semibold truncate">{a.title}</p>
                    <p className="text-purple-300/60 text-[10px]">★ {a.score}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
