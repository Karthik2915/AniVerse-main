import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Anime", to: "/anime" }, { name: "Manga", to: "/manga" },
    { name: "Characters", to: "/characters" }, { name: "Quotes", to: "/quotes" },
    { name: "Cards", to: "/cards" }, { name: "Quiz", to: "/quiz" },
    { name: "Stats", to: "/stats" }, { name: "Fun", to: "/fun" },
  ];

  return (
    <footer className="bg-[#0d0a14] border-t border-purple-500/10 text-purple-300/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div className="flex items-center gap-2.5 text-xl font-black" whileHover={{ scale: 1.05 }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center">
              <span className="text-white text-sm">✦</span>
            </div>
            <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              AniVerse
            </span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-5">
            {links.map((l, i) => (
              <NavLink key={i} to={l.to}
                className="text-sm hover:text-purple-300 transition-colors duration-200">
                {l.name}
              </NavLink>
            ))}
          </div>

          <p className="text-sm text-purple-300/30">© 2025 AniVerse ✦</p>
        </div>

        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </footer>
  );
}
