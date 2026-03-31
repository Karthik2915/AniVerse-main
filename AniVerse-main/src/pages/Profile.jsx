import { useContext } from "react";
import { motion } from "framer-motion";
import { LogOut, BookOpen, Heart, CheckCircle, Clock, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ShopContext from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const { watchlist, products, favourites, userRatings } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const getAnime = (uid) => products.find(p => String(p.uid) === uid);

  const watching   = watchlist.filter(w => w.status === "watching");
  const completed  = watchlist.filter(w => w.status === "completed");
  const planToWatch = watchlist.filter(w => w.status === "plan");
  const ratedAnimes = Object.entries(userRatings).map(([uid, score]) => ({ uid, score, anime: getAnime(uid) })).filter(r => r.anime);
  const avgUserRating = ratedAnimes.length ? (ratedAnimes.reduce((s,r) => s + r.score, 0) / ratedAnimes.length).toFixed(1) : "—";

  const handleLogout = () => { logout(); navigate("/"); };

  const stats = [
    { icon: <CheckCircle size={18}/>, label: "Completed",    value: completed.length,  color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
    { icon: <BookOpen size={18}/>,    label: "Watching",     value: watching.length,   color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    { icon: <Clock size={18}/>,       label: "Plan to Watch",value: planToWatch.length, color: "text-blue-400",  bg: "bg-blue-500/10 border-blue-500/20" },
    { icon: <Heart size={18}/>,       label: "Favourites",   value: favourites.length, color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20" },
    { icon: <Star size={18}/>,        label: "Rated",        value: ratedAnimes.length, color: "text-yellow-400",bg: "bg-yellow-500/10 border-yellow-500/20" },
    { icon: <Star size={18}/>,        label: "Avg Rating",   value: avgUserRating,     color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Profile header */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1528] to-[#251d38] border border-purple-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            {/* Avatar */}
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-4xl font-black text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              {user.avatar || user.username?.[0]?.toUpperCase()}
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-purple-100 mb-1">{user.username}</h1>
              <p className="text-purple-300/60 text-sm mb-4">{user.email}</p>
              <p className="text-purple-300/40 text-xs">
                Member since {new Date(user.joinedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            >
              <LogOut size={15} /> Sign Out
            </motion.button>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {stats.map(({ icon, label, value, color, bg }, i) => (
            <motion.div key={label}
              className={`border rounded-2xl p-4 text-center ${bg}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className={`flex justify-center mb-1 ${color}`}>{icon}</div>
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-[10px] text-purple-300/50 mt-0.5 leading-tight">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Currently watching */}
        {watching.length > 0 && (
          <Section title="▶ Currently Watching" color="text-purple-300">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {watching.map(({ uid }) => {
                const a = getAnime(uid);
                if (!a) return null;
                return <AnimeThumb key={uid} anime={a} badge="▶" badgeColor="bg-purple-500" />;
              })}
            </div>
          </Section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <Section title="✓ Completed" color="text-green-400">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {completed.map(({ uid }) => {
                const a = getAnime(uid);
                if (!a) return null;
                return <AnimeThumb key={uid} anime={a} badge="✓" badgeColor="bg-green-500" />;
              })}
            </div>
          </Section>
        )}

        {/* Rated */}
        {ratedAnimes.length > 0 && (
          <Section title="⭐ Your Ratings" color="text-yellow-400">
            <div className="space-y-2">
              {ratedAnimes.sort((a,b) => b.score - a.score).map(({ uid, score, anime }) => (
                <div key={uid} className="flex items-center gap-3 bg-[#1a1528] border border-purple-500/10 rounded-xl p-3">
                  <img src={anime.img_url} alt={anime.title} loading="lazy"
                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-purple-100 font-semibold truncate text-sm">{anime.title}</p>
                    <p className="text-purple-300/50 text-xs">{anime.genre?.slice(0,2).join(" · ")}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
                    <Star size={14} className="fill-yellow-400" />
                    <span className="font-black text-lg">{score}</span>
                    <span className="text-purple-300/40 text-xs">/10</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {watchlist.length === 0 && (
          <div className="text-center py-20">
            <p className="text-purple-300/50 text-lg mb-2">Your lists are empty</p>
            <p className="text-purple-300/30 text-sm">Start adding anime from the Anime page!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <motion.div className="mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <h2 className={`text-lg font-bold mb-4 ${color}`}>{title}</h2>
      {children}
    </motion.div>
  );
}

function AnimeThumb({ anime, badge, badgeColor }) {
  return (
    <motion.a href={anime.link} target="_blank" rel="noopener noreferrer"
      className="rounded-xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 group relative block"
      whileHover={{ y: -3 }}>
      <img src={anime.img_url} alt={anime.title} loading="lazy"
        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full ${badgeColor} flex items-center justify-center text-white text-xs font-bold`}>
        {badge}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white text-xs font-semibold truncate">{anime.title}</p>
        <p className="text-yellow-400 text-[10px]">★ {anime.score}</p>
      </div>
    </motion.a>
  );
}
