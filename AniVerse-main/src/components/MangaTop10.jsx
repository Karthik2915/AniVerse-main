import React, { useContext } from "react";
import ShopContext from "../context/ShopContext";

const MangaTop10 = () => {
  const { Manga } = useContext(ShopContext);

  const Top10Manga = Manga.sort((a, b) => a.Rank - b.Rank).slice(10, 20);

  return (
    <div className="p-4">
      <div className="flex mt-2  items-center justify-center text-[#202216]">
        <h2 className="text-4xl  font-bold mb-7">
          Some Top-Rated Manga's Of All Time
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Top10Manga.map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer border-4 border-[#202216] rounded-xl transition-transform transform hover:scale-105"
            onClick={() => window.open(item.page_url, "_blank")}
          >
            <img
              src={item.image_url}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover rounded-lg"
              alt={item.Title}
            />
            <div className="absolute inset-0 flex items-end justify-end p-2 text-white text-2xl font-bold bg-black bg-opacity-50 hover:bg-opacity-0 transition-all duration-500 rounded-lg">
              {item.Title.slice(0, 10) + "..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaTop10;
