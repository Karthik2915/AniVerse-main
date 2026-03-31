import { useState, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopContext from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function shuffleArr(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function getQuestions(products, quotes) {
  const validAnime = products.filter(p =>
    p.img_url?.startsWith("https://") && p.score && p.title
  );

  const qs = [];

  // Q type 1: Guess anime from image
  shuffleArr(validAnime).slice(0, 5).forEach(anime => {
    const wrong = shuffleArr(validAnime.filter(a => a.uid !== anime.uid)).slice(0, 3);
    qs.push({
      type: "image",
      question: "Which anime is this?",
      image: anime.img_url,
      options: shuffleArr([anime.title, ...wrong.map(w => w.title)]),
      answer: anime.title,
    });
  });

  // Q type 2: Guess anime from quote
  const validQuotes = quotes.filter(q => q.Quote && q.Anime && q.Character);
  shuffleArr(validQuotes).slice(0, 4).forEach(q => {
    const wrong = shuffleArr(validAnime.filter(a => a.title !== q.Anime)).slice(0, 3);
    qs.push({
      type: "quote",
      question: "Which anime is this quote from?",
      quote: q.Quote,
      character: q.Character,
      options: shuffleArr([q.Anime, ...wrong.map(w => w.title)]),
      answer: q.Anime,
    });
  });

  // Q type 3: Score guess
  shuffleArr(validAnime.filter(a => a.score)).slice(0, 3).forEach(anime => {
    const score = anime.score;
    const opts = [score, +(score + 0.5).toFixed(2), +(score - 0.3).toFixed(2), +(score + 0.8).toFixed(2)]
      .map(s => Math.min(10, Math.max(1, s)).toFixed(2));
    qs.push({
      type: "score",
      question: `What is the MAL score of "${anime.title}"?`,
      image: anime.img_url,
      options: shuffleArr([...new Set(opts)]).slice(0, 4),
      answer: String(score),
    });
  });

  return shuffleArr(qs).slice(0, 10);
}

export default function AnimeQuiz() {
  const { products, Quotes } = useContext(ShopContext);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const questions = useMemo(() => getQuestions(products, Quotes), [products, Quotes]);

  const q = questions[current];

  const handleAnswer = (opt) => {
    if (selected) return;
    setSelected(opt);
    const correct = opt === q.answer || String(opt) === String(q.answer);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: q.question, answer: q.answer, selected: opt, correct }]);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent(c => c + 1); setSelected(null); }
    }, 1200);
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setScore(0);
    setDone(false); setAnswers([]); setStarted(false);
  };

  const pct = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">

        <AnimatePresence mode="wait">
          {/* Start screen */}
          {!started && !done && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h1 className="text-4xl font-black text-purple-200 mb-3">Anime Quiz</h1>
              <p className="text-purple-300/60 mb-8">Test your anime knowledge! 10 questions — images, quotes & scores.</p>
              <motion.button onClick={() => setStarted(true)}
                className="px-8 py-4 bg-purple-500 text-[#0d0a14] font-black rounded-2xl text-lg"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                Start Quiz →
              </motion.button>
            </motion.div>
          )}

          {/* Question */}
          {started && !done && q && (
            <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-purple-300/60 text-sm">Question {current + 1} / {questions.length}</span>
                <span className="text-purple-200 font-bold">Score: {score}</span>
              </div>
              <div className="h-2 bg-[#1a1528] rounded-full mb-6 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-purple-300 to-violet-300 rounded-full"
                  animate={{ width: `${((current) / questions.length) * 100}%` }} />
              </div>

              {/* Image question */}
              {q.type === "image" && (
                <div className="mb-4 rounded-2xl overflow-hidden border border-purple-500/20">
                  <img src={q.image} alt="guess" className="w-full h-64 object-cover object-top" />
                </div>
              )}

              {/* Quote question */}
              {q.type === "quote" && (
                <div className="mb-4 bg-[#1a1528] border border-purple-500/20 rounded-2xl p-6">
                  <p className="text-purple-200 text-lg italic mb-2">"{q.quote}"</p>
                  <p className="text-purple-300/60 text-sm">— {q.character}</p>
                </div>
              )}

              {/* Score question */}
              {q.type === "score" && q.image && (
                <div className="mb-4 rounded-2xl overflow-hidden border border-purple-500/20">
                  <img src={q.image} alt="anime" className="w-full h-48 object-cover object-top" />
                </div>
              )}

              <h2 className="text-xl font-bold text-purple-200 mb-4">{q.question}</h2>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  const isCorrect = String(opt) === String(q.answer);
                  const isSelected = selected === opt;
                  let cls = "bg-[#1a1528] border border-purple-500/10 text-purple-300/60 hover:border-purple-500/40 hover:text-purple-200";
                  if (selected) {
                    if (isCorrect) cls = "bg-green-500/20 border-green-500 text-green-300";
                    else if (isSelected) cls = "bg-red-500/20 border-red-500 text-red-300";
                    else cls = "bg-[#1a1528] border-purple-500/5 text-purple-300/60/50";
                  }
                  return (
                    <motion.button key={i} onClick={() => handleAnswer(opt)}
                      className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${cls}`}
                      whileHover={!selected ? { scale: 1.02 } : {}}
                      whileTap={!selected ? { scale: 0.98 } : {}}>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {done && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center">
              <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "😅"}</div>
              <h2 className="text-4xl font-black text-purple-200 mb-2">{score}/{questions.length}</h2>
              <p className="text-purple-300/60 text-lg mb-2">
                {pct >= 80 ? "Anime Master! You really know your stuff!" :
                 pct >= 50 ? "Good effort! Keep watching more anime!" :
                 "Time to binge more anime! 📺"}
              </p>
              <div className="text-3xl font-black mb-6" style={{ color: pct >= 80 ? "#FFD700" : pct >= 50 ? "#9ca081" : "#9ca081" }}>
                {pct}%
              </div>

              {/* Answer review */}
              <div className="text-left space-y-2 mb-8 max-h-64 overflow-y-auto">
                {answers.map((a, i) => (
                  <div key={i} className={`p-3 rounded-xl text-sm flex gap-2 ${a.correct ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                    <span>{a.correct ? "✓" : "✗"}</span>
                    <div>
                      <p className={a.correct ? "text-green-300" : "text-red-300"}>{a.question}</p>
                      {!a.correct && <p className="text-purple-300/60 text-xs">Answer: {a.answer}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button onClick={restart}
                className="px-8 py-4 bg-purple-500 text-[#0d0a14] font-black rounded-2xl text-lg"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                Play Again →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
