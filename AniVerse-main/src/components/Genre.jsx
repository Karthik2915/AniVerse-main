import { useRef, useState, useEffect, useContext } from "react";
import { motion, useInView } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import ScrollFloat from "../ReactBits/ScrollText.jsx";
import AnimeGrid from "./AnimeGrid.jsx";
import MangaGrid from "./MangaGrid.jsx";
import ShopContext from "../context/ShopContext.jsx";

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, triggerOnce: false });
  return (
    <motion.div ref={ref} data-index={index} onMouseEnter={onMouseEnter} onClick={onClick}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25, delay }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({ items = [], onItemSelect, showGradients = true, enableArrowNavigation = true, className = "", displayScrollbar = false }) => {
  const location = useLocation();
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const navigate = useNavigate();
  const { setSelectedGenre } = useContext(ShopContext);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        onItemSelect?.(items[selectedIndex], selectedIndex);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  return (
    <div className="flex flex-col md:flex-row pt-5 items-start justify-between px-4 md:px-8 pb-8">
      {/* Genre list */}
      <div className="w-full md:w-1/3 md:pr-4 mb-6 md:mb-0">
        <div className="bg-[#1a1528] border border-purple-500/15 rounded-2xl overflow-hidden">
          <div className="px-4 pt-4 pb-2 text-xl font-bold text-purple-200">
            <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
              Browse by Genre
            </ScrollFloat>
          </div>
          <div className={`relative ${className}`}>
            <div ref={listRef}
              className="max-h-[400px] md:max-h-[700px] overflow-y-auto p-3 no-scrollbar"
              onScroll={handleScroll} style={{ scrollbarWidth: "none" }}>
              {items.map((item, index) => (
                <AnimatedItem key={index} delay={0.05} index={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => { setSelectedIndex(index); onItemSelect?.(item, index); }}>
                  <div
                    className={`relative rounded-xl overflow-hidden border transition-all ${
                      selectedIndex === index
                        ? "border-purple-500/40 shadow-[0_0_12px_rgba(242,222,155,0.15)]"
                        : "border-transparent hover:border-purple-500/20"
                    }`}
                    onClick={() => { setSelectedGenre(item.genre); navigate("/anime-genre"); }}
                  >
                    <img src={item.image} alt={item.genre}
                      className="w-full h-24 object-cover opacity-70 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center pl-4">
                      <p className="text-white font-bold text-sm">{item.genre}</p>
                    </div>
                    {selectedIndex === index && (
                      <motion.div layoutId="genre-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full" />
                    )}
                  </div>
                </AnimatedItem>
              ))}
            </div>
            {showGradients && (
              <>
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#202216] to-transparent pointer-events-none transition-opacity duration-300"
                  style={{ opacity: topGradientOpacity }} />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#202216] to-transparent pointer-events-none transition-opacity duration-300"
                  style={{ opacity: bottomGradientOpacity }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full md:w-2/3">
        <div className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-4">
          {location.pathname.includes("manga") ? <MangaGrid /> : <AnimeGrid />}
        </div>
      </div>
    </div>
  );
};

export default AnimatedList;
