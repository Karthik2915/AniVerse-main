import { useRef, useState, useEffect, useContext } from "react";
import { motion, useInView } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import ScrollFloat from "../ReactBits/ScrollText.jsx";
import AnimeGrid from "./AnimeGrid.jsx";
import MangaGrid from "./MangaGrid.jsx";
import ShopContext from "../context/ShopContext.jsx";

const AnimatedItem = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = false,
  initialSelectedIndex = -1,
}) => {
  const location = useLocation();
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  // const [selectedGenre, setSelectedGenre] = useState([]);
  const navigate = useNavigate();

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };
  // sort
  const { setSelectedGenre } = useContext(ShopContext);
  // console.log(genres.genre);

  // Keyboard Navigation
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  return (
    <div className="flex flex-col md:flex-row pt-5 items-start justify-between">
      <div className="w-full md:w-1/3">
        <div className="bg-[#202216] border  border-[#f2de9b] mb-5 mr-4 ml-3">
          <div className="pl-4 text-xl font-semibold text-[#f2de9b]">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Top Genres
            </ScrollFloat>
          </div>
          <div className={`relative ${className}`}>
            <div
              ref={listRef}
              className="max-h-[400px] md:max-h-[730px] overflow-y-auto p-4 md:mb-4 no-scrollbar"
              onScroll={handleScroll}
              style={{ scrollbarWidth: "none" }}
            >
              {items.map((item, index) => (
                <AnimatedItem
                  key={index}
                  delay={0.1}
                  index={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    setSelectedIndex(index);
                    if (onItemSelect) {
                      onItemSelect(item, index);
                    }
                  }}
                >
                  <div
                    className={`relative bg-[#111] rounded-lg ${
                      selectedIndex === index ? "bg-[#222]" : ""
                    } ${itemClassName}`}
                    onClick={() => {
                      setSelectedGenre(item.genre);
                      navigate("/anime-genre");
                    }}
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full max-h-32 hover:opacity-100 object-cover rounded-lg"
                    />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center pl-4 rounded-lg">
                      <p className="text-white">{item.genre}</p>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
            {showGradients && (
              <>
                <div
                  className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#202216] to-transparent pointer-events-none transition-opacity duration-300 ease"
                  style={{ opacity: topGradientOpacity }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#202216] to-transparent pointer-events-none transition-opacity duration-300 ease"
                  style={{ opacity: bottomGradientOpacity }}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Genre Grid */}
      <div className="w-full md:w-2/3 mb-4 md:mb-0">
        {location.pathname.includes("manga") ? <MangaGrid /> : <AnimeGrid />}
      </div>

      {/* Genre List */}
    </div>
  );
};

export default AnimatedList;
