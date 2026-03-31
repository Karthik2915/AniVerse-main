import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Tv, Heart, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";

export default function AnimeDetailModal({ anime, onClose, onToast }) {
  const { toggleFavourite, isFavourite, addToWatchlist, getWatchStatus, setRating, getRating } = useContext(ShopContext);
  if (!anime) return null;

  const fav = isFavourite(String(anime.uid));
  const watchStatus = getWatchStatus(String(anime.uid));
  const userRating = getRating(String(anime.uid));
  const [hover, setHover] = useState(0);

  const handleFav = () => {
    toggleFavourite(String(anime.uid));
    onToast?.(fav ? "Removed from favourites" : "Added to favourites ❤️");
  };

  const handleWatch = (status) => {
    addToWatchlist(String(anime.uid), status);
    onToast?.(`Added to ${status === "plan" ? "Plan to Watch" : status === "watching" ? "Currently Watching" : "Completed"} ✓`);
  };

  const handleRating = (score) => {
    setRating(String(anime.uid), score);
    onToast?.(`Rated ${score}/10 ⭐`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="bg-[#13102 0] border border-purple-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-56 overflow-hidden">
            <img src={anime.img_url} alt={anime.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141508] via-[#141508]/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
            {/* Score badge */}
            {anime.score && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-300 text-sm font-bold">{anime.score}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="text-2xl font-bold text-purple-200 mb-1">{anime.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genre?.map((g, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300/60 rounded-full">
                  {g}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Episodes", value: anime.episodes || "?" },
                { label: "Rank", value: anime.ranked ? `#${anime.ranked}` : "N/A" },
                { label: "Popularity", value: anime.popularity ? `#${anime.popularity}` : "N/A" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1a1528] rounded-xl p-3 text-center">
                  <p className="text-purple-300/60 text-xs mb-1">{label}</p>
                  <p className="text-purple-200 font-bold">{value}</p>
                </div>
              ))}
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="mb-4">
                <p className="text-purple-300/60 text-xs uppercase tracking-wider mb-2 font-semibold">Synopsis</p>
                <p className="text-purple-200/80 text-sm leading-relaxed line-clamp-4">
                  {anime.synopsis}
                </p>
              </div>
            )}

            {/* User rating */}
            <div className="mb-4">
              <p className="text-purple-300/60 text-xs uppercase tracking-wider mb-2 font-semibold">Your Rating</p>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button
                    key={n}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleRating(n)}
                    className={`text-lg transition-transform hover:scale-125 ${
                      n <= (hover || userRating || 0) ? "text-yellow-400" : "text-purple-200/20"
                    }`}
                  >
                    ★
                  </button>
                ))}
                {userRating && (
                  <span className="ml-2 text-purple-300/60 text-sm self-center">{userRating}/10</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleFav}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  fav
                    ? "bg-red-500/20 border border-red-500/40 text-red-400"
                    : "bg-purple-500/10 border border-purple-500/20 text-purple-300/60 hover:text-purple-200"
                }`}
              >
                <Heart size={14} className={fav ? "fill-red-400" : ""} />
                {fav ? "Favourited" : "Favourite"}
              </button>

              {["plan", "watching", "completed"].map(s => (
                <button
                  key={s}
                  onClick={() => handleWatch(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    watchStatus === s
                      ? "bg-purple-500 text-[#0d0a14]"
                      : "bg-purple-500/10 border border-purple-500/20 text-purple-300/60 hover:text-purple-200"
                  }`}
                >
                  {watchStatus === s ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  {s === "plan" ? "Plan to Watch" : s === "watching" ? "Watching" : "Completed"}
                </button>
              ))}

              <a
                href={anime.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-500 text-[#0d0a14] hover:bg-white transition-all ml-auto"
              >
                <Tv size={14} /> MAL Page
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
