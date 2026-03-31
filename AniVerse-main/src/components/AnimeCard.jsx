import { motion } from "framer-motion";
import { Heart, Bookmark } from "lucide-react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";

export default function AnimeCard({ anime, index = 0, onClick, onToast }) {
  const { toggleFavourite, isFavourite, getWatchStatus } = useContext(ShopContext);
  const uid = String(anime.uid || anime.id || index);
  const fav = isFavourite(uid);
  const watchStatus = getWatchStatus(uid);

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavourite(uid);
    onToast?.(fav ? "Removed from favourites" : "Added to favourites ❤️");
  };

  return (
    <motion.div
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-[#1a1528] border border-purple-500/10 hover:border-purple-500/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(anime)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={anime.img_url || anime.image_url}
          alt={anime.title || anime.Title}
          loading="lazy"
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1009] via-transparent to-transparent" />

        {/* Score badge */}
        {(anime.score || anime.Score) && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-yellow-300 text-xs font-bold px-2 py-1 rounded-lg">
            ★ {anime.score || anime.Score}
          </div>
        )}

        {/* Watchlist badge */}
        {watchStatus && (
          <div className="absolute top-2 right-8 bg-purple-500/90 text-[#0d0a14] text-xs font-bold px-2 py-1 rounded-lg">
            {watchStatus === "plan" ? "📋" : watchStatus === "watching" ? "▶" : "✓"}
          </div>
        )}

        {/* Fav button */}
        <motion.button
          onClick={handleFav}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={13} className={fav ? "fill-red-400 text-red-400" : "text-white"} />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-purple-200 font-semibold text-sm truncate">
          {anime.title || anime.Title}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {(anime.genre || []).slice(0, 2).map((g, i) => (
            <span key={i} className="text-[10px] text-purple-300/60 bg-purple-500/10 px-1.5 py-0.5 rounded-full">
              {g}
            </span>
          ))}
          {anime.episodes && (
            <span className="text-[10px] text-purple-300/60 ml-auto">{anime.episodes} eps</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
