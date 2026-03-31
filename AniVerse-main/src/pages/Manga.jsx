import React from "react";
import { motion } from "framer-motion";
import MangaSlide from "../components/MangaSlide";
import Navbar from "../components/Navbar";
import MangaGrid from "../components/MangaGrid";
import CardSliderRankedManga from "../components/CardSliderRankedManga";
import CardSliderRatedManga from "../components/CardSliderRatedManga";
import Genre from "../components/Genre";
import MangaTop10 from "../components/MangaTop10";
import Footer from "../components/Footer";

const genres = [
  { genre: "Action", image: "/action.png" },
  { genre: "Adventure", image: "/adventure.png" },
  { genre: "Comedy", image: "/comedy.png" },
  { genre: "Drama", image: "/drama.png" },
  { genre: "Fantasy", image: "/fantasy.png" },
  { genre: "Game", image: "/game.png" },
  { genre: "Harem", image: "/harem.png" },
  { genre: "Historical", image: "/historical.png" },
  { genre: "Kids", image: "/kids.png" },
  { genre: "Magic", image: "/magic.png" },
  { genre: "Mecha", image: "/mecha.png" },
  { genre: "Military", image: "/military.png" },
  { genre: "Music", image: "/music.png" },
  { genre: "Mystery", image: "/mystery.png" },
  { genre: "Parody", image: "/parody.png" },
  { genre: "Romance", image: "/romance.png" },
  { genre: "School", image: "/school.png" },
  { genre: "Sci-Fi", image: "/sci-fi.png" },
  { genre: "Seinen", image: "/seinen.png" },
  { genre: "Shounen", image: "/shounen.png" },
  { genre: "Slice of Life", image: "/slice-of-life.png" },
  { genre: "Sports", image: "/sports.png" },
  { genre: "Super Power", image: "/super-power.png" },
  { genre: "Supernatural", image: "/supernatural.png" },
  { genre: "Dementia", image: "/dementia.png" },
];

const Manga = () => {
  return (
    <motion.div
      className="bg-[#0d0a14] min-h-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#202216] to-[#0f1009] px-6 pt-10 pb-6">
        <motion.h1
          className="text-4xl font-black text-purple-200 mb-2"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        >
          📚 Manga
        </motion.h1>
        <p className="text-purple-300/60">Discover top-rated manga from around the world</p>
      </div>

      {/* Random manga slideshow */}
      <div className="bg-[#0d0a14] px-4 pb-8">
        <h2 className="text-xl font-bold text-purple-200 mb-4 px-2">🎲 Random Picks</h2>
        <MangaSlide />
      </div>

      <MangaTop10 />
      <CardSliderRankedManga />
      <CardSliderRatedManga />

      <div className="bg-[#0d0a14]">
        <Genre
          items={genres}
          onItemSelect={(item) => console.log(item)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div>

      <Footer />
    </motion.div>
  );
};

export default Manga;
