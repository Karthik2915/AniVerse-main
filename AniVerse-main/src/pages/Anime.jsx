import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext.jsx";
import Slider from "../components/Slider.jsx";
import Navbar from "../components/Navbar.jsx";
import "../App.css";
import CardSliderPopular from "../components/CardSliderPopular.jsx";
import CardSliderTrending from "../components/CardSliderTrending.jsx";
import CardSliderRanked from "../components/CardSliderRanked.jsx";
import CircularGallery from "../ReactBits/Gallery.jsx";
import Genre from "../components/Genre.jsx";
import Footer from "../components/Footer.jsx";
import AnimeDetailModal from "../components/AnimeDetailModal.jsx";

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

const App = ({ addToast }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <Slider onAnimeClick={setSelectedAnime} />
      <CardSliderTrending onAnimeClick={setSelectedAnime} />
      <CardSliderPopular onAnimeClick={setSelectedAnime} />
      <CardSliderRanked onAnimeClick={setSelectedAnime} />

      <div className="bg-[#13102 0]" style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#f2de9b" borderRadius={0.05} />
      </div>

      <div className="bg-[#0d0a14]">
        <Genre items={genres} onItemSelect={(item) => console.log(item)}
          showGradients={true} enableArrowNavigation={true} displayScrollbar={true} />
      </div>

      <Footer />

      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onToast={addToast}
        />
      )}
    </motion.div>
  );
};

export default App;
