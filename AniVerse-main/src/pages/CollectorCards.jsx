import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CARDS = [
  { id: 1, title: "Naruto", rarity: "Legendary", color: "#FF6B00", textColor: "#fff", score: 7.93, episodes: 220, genres: ["Action","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/13/17405.jpg", link: "https://myanimelist.net/anime/20/Naruto", desc: "A young ninja who seeks recognition and dreams of becoming the Hokage.", power: 92 },
  { id: 2, title: "Death Note", rarity: "Rare", color: "#1a1a2e", textColor: "#e0e0ff", score: 8.65, episodes: 37, genres: ["Mystery","Psychological","Thriller"], img: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", link: "https://myanimelist.net/anime/1535/Death_Note", desc: "A high school student who discovers a supernatural notebook.", power: 97 },
  { id: 3, title: "Fullmetal Alchemist: Brotherhood", rarity: "Legendary", color: "#8B4513", textColor: "#FFD700", score: 9.23, episodes: 64, genres: ["Action","Adventure","Drama"], img: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", link: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood", desc: "Two brothers search for the Philosopher's Stone to restore their bodies.", power: 99 },
  { id: 4, title: "Attack on Titan", rarity: "Epic", color: "#2d2d2d", textColor: "#c0392b", score: 8.47, episodes: 25, genres: ["Action","Military","Drama"], img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", link: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin", desc: "Humanity fights for survival against man-eating giants called Titans.", power: 96 },
  { id: 5, title: "Demon Slayer", rarity: "Epic", color: "#6B0000", textColor: "#ff9999", score: 8.92, episodes: 26, genres: ["Action","Demons","Historical"], img: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", link: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba", desc: "A boy becomes a demon slayer to avenge his family and save his sister.", power: 95 },
  { id: 6, title: "My Hero Academia", rarity: "Rare", color: "#003580", textColor: "#80c8ff", score: 8.35, episodes: 113, genres: ["Action","Comedy","School"], img: "https://cdn.myanimelist.net/images/anime/10/78745.jpg", link: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia", desc: "A boy born without powers dreams of becoming the greatest hero.", power: 88 },
  { id: 7, title: "One Punch Man", rarity: "Legendary", color: "#FFD700", textColor: "#1a1a00", score: 8.68, episodes: 12, genres: ["Action","Sci-Fi","Comedy"], img: "https://cdn.myanimelist.net/images/anime/12/76049.jpg", link: "https://myanimelist.net/anime/30276/One_Punch_Man", desc: "A hero who can defeat any enemy with a single punch.", power: 100 },
  { id: 8, title: "Hunter x Hunter", rarity: "Legendary", color: "#004d00", textColor: "#99ff99", score: 9.11, episodes: 148, genres: ["Action","Adventure","Fantasy"], img: "https://cdn.myanimelist.net/images/anime/11/33657.jpg", link: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011", desc: "A young boy sets out to find his father by becoming a Hunter.", power: 98 },
  { id: 9, title: "Steins;Gate", rarity: "Epic", color: "#001a33", textColor: "#66b3ff", score: 9.11, episodes: 24, genres: ["Sci-Fi","Thriller","Romance"], img: "https://cdn.myanimelist.net/images/anime/5/73199.jpg", link: "https://myanimelist.net/anime/9253/Steins_Gate", desc: "A scientist accidentally discovers time travel with dire consequences.", power: 97 },
  { id: 10, title: "Tokyo Ghoul", rarity: "Rare", color: "#1a0000", textColor: "#ff4444", score: 7.93, episodes: 12, genres: ["Action","Horror","Mystery"], img: "https://cdn.myanimelist.net/images/anime/5/64449.jpg", link: "https://myanimelist.net/anime/22319/Tokyo_Ghoul", desc: "A college student is transformed into a half-ghoul.", power: 86 },
  { id: 11, title: "One Piece", rarity: "Legendary", color: "#004466", textColor: "#FFD700", score: 8.53, episodes: 1000, genres: ["Action","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", link: "https://myanimelist.net/anime/21/One_Piece", desc: "A boy with rubber powers sets sail to become the Pirate King.", power: 94 },
  { id: 12, title: "Dragon Ball Z", rarity: "Legendary", color: "#FF8C00", textColor: "#fff", score: 8.27, episodes: 291, genres: ["Action","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/6/20936.jpg", link: "https://myanimelist.net/anime/813/Dragon_Ball_Z", desc: "Goku and friends defend Earth from increasingly powerful villains.", power: 93 },
  { id: 13, title: "Bleach", rarity: "Rare", color: "#111133", textColor: "#ccccff", score: 7.87, episodes: 366, genres: ["Action","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/3/40451.jpg", link: "https://myanimelist.net/anime/269/Bleach", desc: "A teenager gains the powers of a Soul Reaper.", power: 87 },
  { id: 14, title: "Re:Zero", rarity: "Epic", color: "#1a001a", textColor: "#ff99ff", score: 8.34, episodes: 25, genres: ["Drama","Fantasy","Psychological"], img: "https://cdn.myanimelist.net/images/anime/11/79410.jpg", link: "https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu", desc: "A boy is transported to a fantasy world with the ability to respawn.", power: 84 },
  { id: 15, title: "No Game No Life", rarity: "Rare", color: "#2d0033", textColor: "#ff66ff", score: 8.34, episodes: 12, genres: ["Game","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/5/65187.jpg", link: "https://myanimelist.net/anime/19815/No_Game_No_Life", desc: "Two genius siblings are transported to a world where games decide everything.", power: 90 },
  { id: 16, title: "Overlord", rarity: "Epic", color: "#0d0d0d", textColor: "#cc0000", score: 8.05, episodes: 13, genres: ["Action","Game","Adventure"], img: "https://cdn.myanimelist.net/images/anime/7/88019.jpg", link: "https://myanimelist.net/anime/29803/Overlord", desc: "A game player finds himself trapped in a virtual world as his character.", power: 91 },
  { id: 17, title: "Jujutsu Kaisen", rarity: "Epic", color: "#1a0a2e", textColor: "#aa88ff", score: 8.6, episodes: 24, genres: ["Action","Horror","School"], img: "https://cdn.myanimelist.net/images/anime/1909/104931.jpg", link: "https://myanimelist.net/anime/40748/Jujutsu_Kaisen_TV", desc: "A boy swallows a cursed object and joins a school for sorcerers.", power: 95 },
  { id: 18, title: "Sword Art Online", rarity: "Common", color: "#003333", textColor: "#66ffff", score: 7.49, episodes: 25, genres: ["Action","Game","Adventure"], img: "https://cdn.myanimelist.net/images/anime/11/39717.jpg", link: "https://myanimelist.net/anime/11757/Sword_Art_Online", desc: "Players are trapped in a VR game where death means real death.", power: 80 },
  { id: 19, title: "Naruto: Shippuuden", rarity: "Legendary", color: "#FF6B00", textColor: "#fff", score: 8.2, episodes: 500, genres: ["Action","Adventure","Drama"], img: "https://cdn.myanimelist.net/images/anime/5/17407.jpg", link: "https://myanimelist.net/anime/1735/Naruto__Shippuuden", desc: "Naruto returns after training to rescue his friend and protect his village.", power: 96 },
  { id: 20, title: "Fairy Tail", rarity: "Common", color: "#001a66", textColor: "#ffcccc", score: 7.93, episodes: 175, genres: ["Action","Adventure","Comedy"], img: "https://cdn.myanimelist.net/images/anime/5/18179.jpg", link: "https://myanimelist.net/anime/6702/Fairy_Tail", desc: "A girl joins a rowdy guild of wizards on epic adventures.", power: 83 },
];

const RARITY_COLORS = {
  Legendary: { border: "#FFD700", glow: "rgba(255,215,0,0.4)", badge: "bg-yellow-500 text-yellow-900" },
  Epic:      { border: "#9B59B6", glow: "rgba(155,89,182,0.4)", badge: "bg-purple-600 text-purple-100" },
  Rare:      { border: "#3498DB", glow: "rgba(52,152,219,0.4)", badge: "bg-blue-600 text-blue-100" },
  Common:    { border: "#9ca081", glow: "rgba(156,160,129,0.3)", badge: "bg-[#9ca081] text-[#0d0a14]" },
};

function CollectorCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  const rarity = RARITY_COLORS[card.rarity];

  return (
    <motion.div
      className="perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d", height: "380px" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setFlipped(f => !f)}
        whileHover={{ scale: 1.03 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border-2 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            borderColor: rarity.border,
            boxShadow: `0 0 20px ${rarity.glow}, 0 10px 40px rgba(0,0,0,0.6)`,
            background: `linear-gradient(135deg, ${card.color}dd, #0f1009)`,
          }}
        >
          {/* Rarity shimmer */}
          {(card.rarity === "Legendary" || card.rarity === "Epic") && (
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: `repeating-linear-gradient(45deg, ${rarity.border}33 0px, transparent 4px, transparent 12px)` }}
            />
          )}

          <img src={card.img} alt={card.title}
            className="w-full h-52 object-cover object-top"
            style={{ filter: "brightness(0.9) contrast(1.1)" }}
            loading="lazy"
          />

          {/* Rarity badge */}
          <div className="absolute top-2 right-2">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${rarity.badge}`}>
              {card.rarity}
            </span>
          </div>

          <div className="p-3">
            <h3 className="font-black text-sm truncate mb-1" style={{ color: card.textColor }}>{card.title}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {card.genres.slice(0,2).map(g => (
                <span key={g} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${rarity.border}22`, color: rarity.border, border: `1px solid ${rarity.border}44` }}>
                  {g}
                </span>
              ))}
            </div>

            {/* Power bar */}
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-purple-300/60 uppercase tracking-widest">Power</span>
                <span className="text-[10px] font-bold" style={{ color: rarity.border }}>{card.power}/100</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${rarity.border}, ${card.textColor})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${card.power}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-[9px] text-purple-300/60">★ {card.score} MAL</span>
              <span className="text-[9px] text-purple-300/60">{card.episodes} eps</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border-2 p-4 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: rarity.border,
            boxShadow: `0 0 20px ${rarity.glow}`,
            background: `linear-gradient(135deg, #0f1009, ${card.color}88)`,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${rarity.badge}`}>{card.rarity}</span>
              <h3 className="font-black text-sm" style={{ color: rarity.border }}>{card.title}</h3>
            </div>
            <p className="text-purple-300/60 text-xs leading-relaxed">{card.desc}</p>
          </div>

          <div className="space-y-2">
            {[
              { label: "MAL Score", value: `${card.score}/10` },
              { label: "Episodes", value: card.episodes },
              { label: "Power Level", value: `${card.power}/100` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[10px] text-purple-300/60">{label}</span>
                <span className="text-[10px] font-bold" style={{ color: rarity.border }}>{value}</span>
              </div>
            ))}

            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="block w-full text-center py-2 rounded-xl text-xs font-bold mt-2 transition-all hover:scale-105"
              style={{ background: rarity.border, color: card.color }}
            >
              View on MAL →
            </a>
          </div>

          <p className="text-center text-[8px] text-purple-300/60/40 mt-1">Click to flip</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const FILTERS = ["All", "Legendary", "Epic", "Rare", "Common"];

export default function CollectorCards() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CARDS.filter(c =>
    (filter === "All" || c.rarity === filter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-purple-200 mb-3">
            🃏 Collector Cards
          </h1>
          <p className="text-purple-300/60 text-base">
            Click any card to flip it and reveal stats. Legendary cards glow gold!
          </p>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="flex-1 px-4 py-3 bg-[#1a1528] border border-purple-500/20 rounded-xl text-purple-200 placeholder-[#9ca081]/60 outline-none focus:border-purple-500/50 transition-colors"
          />
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === f
                    ? "bg-purple-500 text-[#0d0a14]"
                    : "bg-[#1a1528] border border-purple-500/20 text-purple-300/60 hover:text-purple-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.entries(RARITY_COLORS).map(([rarity, colors]) => (
            <div key={rarity} className="bg-[#1a1528] border border-purple-500/10 rounded-xl p-3 text-center">
              <div className="text-lg font-black" style={{ color: colors.border }}>
                {CARDS.filter(c => c.rarity === rarity).length}
              </div>
              <div className="text-xs text-purple-300/60">{rarity}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {filtered.map((card, i) => (
              <CollectorCard key={card.id} card={card} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-purple-300/60">No cards found.</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
