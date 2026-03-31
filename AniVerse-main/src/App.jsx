import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home.jsx";
import Anime from "./pages/Anime.jsx";
import Manga from "./pages/Manga.jsx";
import Characters from "./pages/Characters.jsx";
import Quotes from "./pages/Quotes.jsx";
import GenreBasedFilterAnime from "./pages/GenreBasedFilterAnime.jsx";
import Fun from "./pages/Fun.jsx";
import CollectorCards from "./pages/CollectorCards.jsx";
import AnimeQuiz from "./pages/AnimeQuiz.jsx";
import RandomPicker from "./pages/RandomPicker.jsx";
import Stats from "./pages/Stats.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ToastContainer from "./components/Toast.jsx";
import { useToast } from "./hooks/useToast.js";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();
  const { toasts, addToast, removeToast } = useToast();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/login"       element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/profile"     element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/anime"       element={<PageWrapper><Anime addToast={addToast} /></PageWrapper>} />
          <Route path="/manga"       element={<PageWrapper><Manga /></PageWrapper>} />
          <Route path="/characters"  element={<PageWrapper><Characters /></PageWrapper>} />
          <Route path="/quotes"      element={<PageWrapper><Quotes /></PageWrapper>} />
          <Route path="/anime-genre" element={<PageWrapper><GenreBasedFilterAnime /></PageWrapper>} />
          <Route path="/fun"         element={<PageWrapper><Fun /></PageWrapper>} />
          <Route path="/cards"       element={<PageWrapper><CollectorCards /></PageWrapper>} />
          <Route path="/quiz"        element={<PageWrapper><AnimeQuiz /></PageWrapper>} />
          <Route path="/pick"        element={<PageWrapper><RandomPicker /></PageWrapper>} />
          <Route path="/stats"       element={<PageWrapper><Stats /></PageWrapper>} />
          <Route path="/watchlist"   element={<PageWrapper><Watchlist /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default App;
