import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/animesdataset.json"; // Adjust path if needed
import Mangadetails from "../data/mangadataset.json";
import AnimeQuotes from "../data/AnimeQuotesdataset.json";
import AnimeCharacter from "../data/character_data.json";
// Create Context
const ShopContext = createContext();

// Provider Component
export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Manga, setManga] = useState([]);
  const [Quotes, setQuotes] = useState([]);
  const [Character, setCharacter] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || "Action"
  );

  const filteredProducts = products.filter((product) =>
    product.genre.includes(selectedGenre)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // console.log(sortedProducts);

  useEffect(() => {
    setProducts(productsData);
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);
  useEffect(() => {
    setManga(Mangadetails);
  }, []);
  useEffect(() => {
    setQuotes(AnimeQuotes);
  }, []);
  useEffect(() => {
    setCharacter(AnimeCharacter);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        Manga,
        setManga,
        Quotes,
        setQuotes,
        Character,
        setCharacter,
        selectedGenre,
        setSelectedGenre,
        filteredProducts,
        sortedProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
