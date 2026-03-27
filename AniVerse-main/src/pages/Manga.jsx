import React from "react";
import MangaSlide from "../components/MangaSlide";
import Navbar from "../components/Navbar";
import FallingText from "../ReactBits/FallingText";
import MangaGrid from "../components/MangaGrid";
import CardSliderRankedManga from "../components/CardSliderRankedManga";
import CardSliderRatedManga from "../components/CardSliderRatedManga";
import Genre from "../components/Genre";
import MangaTop10 from "../components/MangaTop10";
import AddComment from "../components/AddComment";
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
  const handleCommentPost = (comment) => {
    console.log("New Comment:", comment);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-[#202216]">
        <span className="text-2xl blur-text ml-5 mt-10 font-bold flex flex-wrap pt-2 text-[#f2de9f] mb-4">
          Random Manga's
        </span>

        <MangaSlide />
      </div>
      {/* 
      <FallingText
        text={`Top 10 Manga's Of All Time`}
        highlightWords={["10", "Time"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      /> */}
      <MangaTop10 />
      <CardSliderRankedManga />
      <CardSliderRatedManga />
      <Genre
        items={genres}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />
      {/* <div className="w-full h-full p-7 lg:p-20">
        <AddComment onCommentPost={handleCommentPost} />
      </div>{" "} */}
      <Footer />
    </div>
  );
};

export default Manga;
