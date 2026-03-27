import React, { useContext } from "react";
// import ProductDetails from "./components/ProductDetails";
import ShopContext from "../context/ShopContext.jsx";
import Slider from "../components/Slider.jsx";
import Navbar from "../components/Navbar.jsx";
import "../App.css";
import CardSliderPopular from "../components/CardSliderPopular.jsx";
import CardSliderTrending from "../components/CardSliderTrending.jsx";
import CardSliderRanked from "../components/CardSliderRanked.jsx";
import CircularGallery from "../ReactBits/Gallery.jsx";
import Genre from "../components/Genre.jsx";
import AddComment from "../components/AddComment.jsx";
import Footer from "../components/Footer.jsx";

const App = () => {
  const { products } = useContext(ShopContext);

  // The details required are comming properly
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

  const handleCommentPost = (comment) => {
    console.log("New Comment:", comment);
  };

  return (
    <>
      <div>
        {/* //{" "}
      <div>
      // <div>{products.map(ProductDetails)}</div>
      //{" "}
      </div> */}
        <Navbar />
        <Slider />

        <CardSliderTrending />
        <CardSliderPopular />
        <CardSliderRanked />
        <div
          className="mb-14"
          style={{ height: "600px", position: "relative" }}
        >
          <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
        </div>

        <Genre
          items={genres}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
        {/* <div className="w-full h-full p-7 lg:p-20">
          <AddComment onCommentPost={handleCommentPost} />
        </div> */}
        <Footer />
      </div>
    </>
  );
};

export default App;
