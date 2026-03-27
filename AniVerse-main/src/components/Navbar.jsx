import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnimeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: "Anime", to: "/anime" },
    { name: "Manga", to: "/manga" },
    { name: "Characters", to: "/characters" },
    { name: "Quotes", to: "/quotes" },
    { name: "Fun", to: "/fun" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#202216] via-[#2c2f23] to-[#4a4d39] text-[#f2de9b] shadow-lg">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#f2de9b] tracking-wide cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xl font-bold">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6745 16.9224L12.6233 10.378C12.2167 9.85117 11.4185 9.8611 11.0251 10.3979L6.45728 16.631C6.26893 16.888 5.96935 17.0398 5.65069 17.0398H3.79114C2.9635 17.0398 2.49412 16.0919 2.99583 15.4336L11.0224 4.90319C11.4206 4.38084 12.2056 4.37762 12.608 4.89668L20.9829 15.6987C21.4923 16.3558 21.024 17.3114 20.1926 17.3114H18.4661C18.1562 17.3114 17.8638 17.1677 17.6745 16.9224ZM12.5866 15.5924L14.8956 18.3593C15.439 19.0105 14.976 20 14.1278 20H9.74075C8.9164 20 8.4461 19.0586 8.94116 18.3994L11.0192 15.6325C11.4065 15.1169 12.1734 15.0972 12.5866 15.5924Z"
                  fill="#f2de9b"
                />
              </svg>
              <NavLink to="/">AniVerse</NavLink>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-16">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className="text-lg font-medium hover:text-[#9ca081] transition duration-300 "
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white pt-2 hover:text-[#9ca081]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-4 py-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="text-lg font-medium hover:text-[#9ca081] transition duration-300 "
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
