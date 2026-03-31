import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import ShopContext from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function GlobalSearch() {
  const { products, Manga, Character } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [open]);

  const q = query.toLowerCase().trim();

  const animeResults = q.length < 2 ? [] :
    products.filter(p => p.title?.toLowerCase().includes(q)).slice(0, 5);

  const mangaResults = q.length < 2 ? [] :
    Manga.filter(m => m.Title?.toLowerCase().includes(q)).slice(0, 3);

  const charResults = q.length < 2 ? [] :
    Character.filter(c => c.romji?.toLowerCase().includes(q)).slice(0, 3);

  const hasResults = animeResults.length + mangaResults.length + charResults.length > 0;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300/60 hover:text-purple-200 hover:border-purple-500/40 transition-all text-sm"
      >
        <Search size={14} />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-start justify-center pt-[10vh] px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-2xl bg-[#13102 0] border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-purple-500/10">
                <Search size={18} className="text-purple-300/60 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search anime, manga, characters..."
                  className="flex-1 bg-transparent text-purple-200 placeholder-[#9ca081]/60 text-base outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-purple-300/60 hover:text-purple-200">
                    <X size={16} />
                  </button>
                )}
                <kbd className="text-xs text-purple-300/60 bg-purple-500/10 px-2 py-1 rounded">Esc</kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {q.length < 2 && (
                  <div className="p-6 text-center text-purple-300/60 text-sm">
                    Type at least 2 characters to search...
                  </div>
                )}

                {q.length >= 2 && !hasResults && (
                  <div className="p-6 text-center text-purple-300/60 text-sm">
                    No results for "{query}"
                  </div>
                )}

                {animeResults.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-purple-300/60 uppercase tracking-wider bg-[#0d0a14]">
                      Anime
                    </div>
                    {animeResults.map((a, i) => (
                      <motion.a
                        key={i}
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/5 transition-colors border-b border-purple-500/5"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <img src={a.img_url} alt={a.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-purple-200 font-medium truncate">{a.title}</p>
                          <p className="text-purple-300/60 text-xs truncate">
                            {a.genre?.slice(0, 3).join(" · ")} {a.score ? `· ★ ${a.score}` : ""}
                          </p>
                        </div>
                        {a.score && (
                          <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            ★ {a.score}
                          </span>
                        )}
                      </motion.a>
                    ))}
                  </div>
                )}

                {mangaResults.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-purple-300/60 uppercase tracking-wider bg-[#0d0a14]">
                      Manga
                    </div>
                    {mangaResults.map((m, i) => (
                      <motion.a
                        key={i}
                        href={m.page_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/5 transition-colors border-b border-purple-500/5"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <img src={m.image_url} alt={m.Title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-purple-200 font-medium truncate">{m.Title}</p>
                          <p className="text-purple-300/60 text-xs">Manga · ★ {m.Score}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}

                {charResults.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-purple-300/60 uppercase tracking-wider bg-[#0d0a14]">
                      Characters
                    </div>
                    {charResults.map((c, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/5 transition-colors border-b border-purple-500/5 cursor-pointer"
                        onClick={() => { navigate("/characters"); setOpen(false); }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <img src={c.id} alt={c.romji} className="w-10 h-10 object-cover rounded-full flex-shrink-0 bg-purple-500/20" />
                        <div>
                          <p className="text-purple-200 font-medium">{c.romji}</p>
                          <p className="text-purple-300/60 text-xs">{c.sex} · {c.hair_color} hair</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
