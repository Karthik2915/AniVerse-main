import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import "../indexbook.css";

const pictures = [
  "11",
  "22",
  "33",
  "44",
  "55",
  "66",
  "77",
  "88",
  "99",
  "111",
  "222",
  "333",
  "444",
  "555",
  "666",
  "777",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <div className="genre-bg">
        <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
          <a
            className="pointer-events-auto mt-10 ml-10"
            href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          >
            <img className="w-20" src="/images/wawasensei-white.png" />
          </a>
          <div className="w-full overflow-auto pointer-events-auto flex justify-center">
            <div className="overflow-auto flex items-center gap-2 sm:gap-4 max-w-full p-4 sm:p-10 flex-wrap justify-center">
              {[...pages].map((_, index) => (
                <button
                  key={index}
                  className={`border-transparent hover:border-white transition-all duration-300 px-3 py-2 sm:px-4 sm:py-3 rounded-full text-sm sm:text-lg uppercase shrink-0 border ${
                    index === page
                      ? "bg-white/90 text-black"
                      : "bg-black/30 text-white"
                  }`}
                  onClick={() => setPage(index)}
                >
                  {index === 0 ? "Cover" : `Page ${index}`}
                </button>
              ))}
              <button
                className={`border-transparent hover:border-white transition-all duration-300 px-3 py-2 sm:px-4 sm:py-3 rounded-full text-sm sm:text-lg uppercase shrink-0 border ${
                  page === pages.length
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(pages.length)}
              >
                Back Cover
              </button>
            </div>
          </div>
        </main>

        <div className="fixed inset-0 flex items-center -rotate-2 select-none"></div>
      </div>
    </>
  );
};
