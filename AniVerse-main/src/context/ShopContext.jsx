import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/animesdataset.json";
import Mangadetails from "../data/mangadataset.json";
import AnimeQuotes from "../data/AnimeQuotesdataset.json";
import AnimeCharacter from "../data/character_data.json";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Manga, setManga] = useState([]);
  const [Quotes, setQuotes] = useState([]);
  const [Character, setCharacter] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || "Action"
  );

  // ── Watchlist: { id, status: "watching"|"plan"|"completed" } ──
  const [watchlist, setWatchlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("watchlist") || "[]"); }
    catch { return []; }
  });

  // ── Favourites: array of uid strings ──
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favourites") || "[]"); }
    catch { return []; }
  });

  // ── User ratings: { uid: score } ──
  const [userRatings, setUserRatings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("userRatings") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => { setProducts(productsData); }, []);
  useEffect(() => { setManga(Mangadetails); }, []);
  useEffect(() => { setQuotes(AnimeQuotes); }, []);
  useEffect(() => { setCharacter(AnimeCharacter); }, []);
  useEffect(() => { localStorage.setItem("selectedGenre", selectedGenre); }, [selectedGenre]);
  useEffect(() => { localStorage.setItem("watchlist", JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem("favourites", JSON.stringify(favourites)); }, [favourites]);
  useEffect(() => { localStorage.setItem("userRatings", JSON.stringify(userRatings)); }, [userRatings]);

  const filteredProducts = products.filter(p => p.genre?.includes(selectedGenre));
  const sortedProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));

  // Watchlist helpers
  const addToWatchlist = (uid, status = "plan") => {
    setWatchlist(prev => {
      const exists = prev.find(w => w.uid === uid);
      if (exists) return prev.map(w => w.uid === uid ? { ...w, status } : w);
      return [...prev, { uid, status }];
    });
  };
  const removeFromWatchlist = (uid) => setWatchlist(prev => prev.filter(w => w.uid !== uid));
  const getWatchStatus = (uid) => watchlist.find(w => w.uid === uid)?.status || null;

  // Favourites helpers
  const toggleFavourite = (uid) => {
    setFavourites(prev =>
      prev.includes(uid) ? prev.filter(f => f !== uid) : [...prev, uid]
    );
  };
  const isFavourite = (uid) => favourites.includes(uid);

  // Rating helpers
  const setRating = (uid, score) => setUserRatings(prev => ({ ...prev, [uid]: score }));
  const getRating = (uid) => userRatings[uid] || null;

  return (
    <ShopContext.Provider value={{
      products, setProducts,
      Manga, setManga,
      Quotes, setQuotes,
      Character, setCharacter,
      selectedGenre, setSelectedGenre,
      filteredProducts, sortedProducts,
      watchlist, addToWatchlist, removeFromWatchlist, getWatchStatus,
      favourites, toggleFavourite, isFavourite,
      userRatings, setRating, getRating,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
