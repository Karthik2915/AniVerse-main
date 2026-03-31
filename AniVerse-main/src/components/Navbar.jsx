import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import { useAuth } from "../context/AuthContext";

export default function AnimeNavbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenu(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { name: "Anime",      to: "/anime"      },
    { name: "Manga",      to: "/manga"      },
    { name: "Characters", to: "/characters" },
    { name: "Quotes",     to: "/quotes"     },
    { name: "Cards",      to: "/cards"      },
    { name: "Quiz",       to: "/quiz"       },
    { name: "Pick",       to: "/pick"       },
    { name: "Stats",      to: "/stats"      },
    { name: "My List",    to: "/watchlist"  },
    { name: "Fun",        to: "/fun"        },
  ];

  const handleLogout = () => { logout(); setUserMenu(false); navigate("/"); };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 navbar-blur transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0a14]/95 shadow-[0_4px_32px_rgba(139,92,246,0.15)] border-b border-purple-500/10"
          : "bg-[#1a1528]/80 border-b border-purple-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 text-xl font-black cursor-pointer flex-shrink-0">
            <motion.div
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
            >
              <span className="text-white text-sm">✦</span>
            </motion.div>
            <NavLink to="/">
              <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                AniVerse
              </span>
            </NavLink>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 overflow-x-auto no-scrollbar flex-1">
            {navItems.map((item, i) => (
              <NavLink key={i} to={item.to}>
                {({ isActive }) => (
                  <motion.span
                    className={`text-sm font-medium relative whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-purple-200" : "text-purple-300/60 hover:text-purple-200"
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-violet-400 rounded-full" />
                    )}
                  </motion.span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: search + user */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <GlobalSearch />

            {/* User menu / login button */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <motion.button
                  onClick={() => setUserMenu(o => !o)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-purple-500/10 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white text-xs font-black">
                    {user.avatar || user.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden md:inline text-purple-200 text-sm font-medium max-w-[80px] truncate">
                    {user.username}
                  </span>
                  <ChevronDown size={13} className="text-purple-300/50" />
                </motion.button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#1a1528] border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <NavLink to="/profile" onClick={() => setUserMenu(false)}>
                        <div className="flex items-center gap-2.5 px-4 py-3 hover:bg-purple-500/10 transition-colors cursor-pointer">
                          <User size={14} className="text-purple-400" />
                          <span className="text-purple-200 text-sm">My Profile</span>
                        </div>
                      </NavLink>
                      <NavLink to="/watchlist" onClick={() => setUserMenu(false)}>
                        <div className="flex items-center gap-2.5 px-4 py-3 hover:bg-purple-500/10 transition-colors cursor-pointer border-t border-purple-500/10">
                          <span className="text-purple-400 text-sm">📋</span>
                          <span className="text-purple-200 text-sm">My List</span>
                        </div>
                      </NavLink>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-red-500/10 transition-colors border-t border-purple-500/10">
                        <LogOut size={14} className="text-red-400" />
                        <span className="text-red-400 text-sm">Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink to="/login">
                <motion.button
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_2px_12px_rgba(139,92,246,0.4)] hover:shadow-[0_2px_20px_rgba(139,92,246,0.6)] transition-all"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                >
                  Sign In
                </motion.button>
              </NavLink>
            )}

            {/* Mobile toggle */}
            <motion.button className="md:hidden text-purple-200 p-1"
              onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0d0a14]/98 border-t border-purple-500/10"
          >
            <div className="grid grid-cols-2 gap-0 py-2">
              {navItems.map((item, i) => (
                <motion.div key={i} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}>
                  <NavLink to={item.to} onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 text-sm font-medium transition-colors ${
                        isActive ? "text-purple-200 bg-purple-500/10" : "text-purple-300/60 hover:text-purple-200"
                      }`
                    }>{item.name}</NavLink>
                </motion.div>
              ))}
            </div>
            {!user && (
              <div className="px-4 pb-4">
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600">
                    Sign In / Create Account
                  </button>
                </NavLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
