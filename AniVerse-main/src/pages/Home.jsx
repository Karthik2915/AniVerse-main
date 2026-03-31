import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AnimeNavbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Play, BookOpen, Star, Zap, Users, Quote, ChevronRight } from "lucide-react";

const FEATURED = [
  { title: "Attack on Titan", subtitle: "Shingeki no Kyojin", genre: "Action · Military · Drama", score: 9.0, img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", color: "#c0392b", glow: "rgba(192,57,43,0.4)" },
  { title: "Fullmetal Alchemist", subtitle: "Brotherhood", genre: "Action · Adventure · Drama", score: 9.23, img: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", color: "#8B4513", glow: "rgba(139,69,19,0.4)" },
  { title: "Demon Slayer", subtitle: "Kimetsu no Yaiba", genre: "Action · Demons · Historical", score: 8.92, img: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", color: "#6B0000", glow: "rgba(107,0,0,0.4)" },
  { title: "Hunter x Hunter", subtitle: "2011", genre: "Action · Adventure · Fantasy", score: 9.11, img: "https://cdn.myanimelist.net/images/anime/11/33657.jpg", color: "#004d00", glow: "rgba(0,77,0,0.4)" },
  { title: "Death Note", subtitle: "Psychological Thriller", genre: "Mystery · Psychological", score: 8.65, img: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", color: "#1a1a2e", glow: "rgba(26,26,46,0.5)" },
];

const QUICK = [
  { to: "/anime",    icon: <Play size={18}/>,     label: "Anime",     desc: "Browse all anime"         },
  { to: "/manga",    icon: <BookOpen size={18}/>,  label: "Manga",     desc: "Explore manga"            },
  { to: "/cards",    icon: <Sparkles size={18}/>,  label: "Cards",     desc: "Collector cards"          },
  { to: "/quiz",     icon: <Star size={18}/>,      label: "Quiz",      desc: "Test your knowledge"      },
  { to: "/pick",     icon: <Zap size={18}/>,       label: "Pick",      desc: "Random anime picker"      },
  { to: "/characters",icon: <Users size={18}/>,    label: "Characters",desc: "Browse characters"        },
  { to: "/quotes",   icon: <Quote size={18}/>,     label: "Quotes",    desc: "Iconic anime quotes"      },
  { to: "/watchlist",icon: <Star size={18}/>,      label: "My List",   desc: "Your watchlist"          },
];

const STATS = [
  { value: "19K+", label: "Anime" },
  { value: "10K+", label: "Manga" },
  { value: "50K+", label: "Characters" },
  { value: "500+", label: "Quotes" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % FEATURED.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const anime = FEATURED[current];

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <AnimeNavbar />

      {/* ── HERO ── */}
      <div className="relative h-[92vh] overflow-hidden"
        onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>

        {/* Background image */}
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={anime.img}
            alt={anime.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a14] via-[#0d0a14]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-transparent to-[#0d0a14]/30" />

        {/* Dynamic color glow */}
        <AnimatePresence>
          <motion.div key={`glow-${current}`}
            className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${anime.glow}, transparent)` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 uppercase tracking-wider">
                  ✦ Featured
                </span>
                <span className="text-yellow-400 text-sm font-bold">★ {anime.score}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-1 leading-tight">
                {anime.title}
              </h1>
              <p className="text-purple-300/70 text-xl mb-3 font-medium">{anime.subtitle}</p>
              <p className="text-purple-200/50 text-sm mb-8">{anime.genre}</p>

              <div className="flex flex-wrap gap-3">
                <NavLink to="/anime">
                  <motion.button
                    className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_4px_24px_rgba(139,92,246,0.5)] text-sm"
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 32px rgba(139,92,246,0.7)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play size={16} className="fill-white" /> Browse Anime
                  </motion.button>
                </NavLink>
                <NavLink to={user ? "/watchlist" : "/login"}>
                  <motion.button
                    className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-purple-200 border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all text-sm"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  >
                    {user ? `My List` : "Sign In"} <ChevronRight size={15} />
                  </motion.button>
                </NavLink>
              </div>

              {user && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="mt-5 text-purple-300/50 text-sm">
                  Welcome back, <span className="text-purple-300 font-semibold">{user.username}</span> 👋
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip — right side */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {FEATURED.map((f, i) => (
            <motion.button key={i} onClick={() => setCurrent(i)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                i === current ? "border-purple-400 scale-105 shadow-[0_0_16px_rgba(192,132,252,0.5)]" : "border-transparent opacity-50 hover:opacity-80"
              }`}
              whileHover={{ scale: i === current ? 1.05 : 1.08 }}
            >
              <img src={f.img} alt={f.title} className="w-14 h-20 object-cover object-top" loading="lazy" />
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          key={current}
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 to-violet-400"
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>

      {/* ── STATS BAR ── */}
      <div className="bg-[#1a1528]/60 border-y border-purple-500/10 py-5 px-4">
        <div className="max-w-4xl mx-auto flex justify-around">
          {STATS.map(({ value, label }, i) => (
            <motion.div key={label} className="text-center"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-2xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">{value}</div>
              <div className="text-purple-300/50 text-xs">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.h2
          className="text-2xl font-black text-purple-100 mb-6 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Explore AniVerse
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK.map(({ to, icon, label, desc }, i) => (
            <NavLink key={i} to={to}>
              <motion.div
                className="bg-[#1a1528] border border-purple-500/15 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-[#251d38] transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(139,92,246,0.2)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/25 transition-colors">
                  {icon}
                </div>
                <p className="text-purple-100 font-bold text-sm mb-0.5">{label}</p>
                <p className="text-purple-300/40 text-xs">{desc}</p>
              </motion.div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      {!user && (
        <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <motion.div
            className="bg-gradient-to-br from-[#1a1528] to-[#251d38] border border-purple-500/20 rounded-3xl p-10"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">✦</div>
            <h3 className="text-3xl font-black text-purple-100 mb-3">Track Your Anime Journey</h3>
            <p className="text-purple-300/60 mb-6 text-sm">Sign up to save your watchlist, rate anime, and pick up where you left off.</p>
            <NavLink to="/login">
              <motion.button
                className="px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_4px_24px_rgba(139,92,246,0.4)]"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                Create Free Account →
              </motion.button>
            </NavLink>
          </motion.div>
        </div>
      )}
    </div>
  );
}
