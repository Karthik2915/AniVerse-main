import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Stats() {
  const { products } = useContext(ShopContext);
  const genreChartRef = useRef(null);
  const scoreChartRef = useRef(null);
  const yearChartRef = useRef(null);

  useEffect(() => {
    if (!products.length) return;

    // Genre counts
    const genreCounts = {};
    products.forEach(p => p.genre?.forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; }));
    const topGenres = Object.entries(genreCounts).sort((a,b) => b[1]-a[1]).slice(0, 12);

    // Score distribution
    const scoreBuckets = {};
    for (let i = 1; i <= 10; i++) scoreBuckets[i] = 0;
    products.forEach(p => {
      if (p.score) { const b = Math.floor(p.score); scoreBuckets[Math.min(10, b)] = (scoreBuckets[b] || 0) + 1; }
    });

    // Year distribution
    const yearCounts = {};
    products.forEach(p => {
      if (p.aired) {
        const match = p.aired.match(/\b(19|20)\d{2}\b/);
        if (match) { const y = match[0]; yearCounts[y] = (yearCounts[y] || 0) + 1; }
      }
    });
    const years = Object.entries(yearCounts).sort((a,b) => a[0]-b[0]).filter(([y]) => y >= 1990 && y <= 2023);

    // Dynamically load Chart.js
    import("chart.js").then(({ Chart, registerables }) => {
      Chart.register(...registerables);

      if (genreChartRef.current) {
        const existing = Chart.getChart(genreChartRef.current);
        if (existing) existing.destroy();
        new Chart(genreChartRef.current, {
          type: "bar",
          data: {
            labels: topGenres.map(([g]) => g),
            datasets: [{ data: topGenres.map(([,c]) => c), backgroundColor: "#f2de9b44", borderColor: "#f2de9b", borderWidth: 2, borderRadius: 6 }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#9ca081", font: { size: 10 } }, grid: { color: "#f2de9b11" } },
              y: { ticks: { color: "#9ca081" }, grid: { color: "#f2de9b11" } },
            },
          },
        });
      }

      if (scoreChartRef.current) {
        const existing = Chart.getChart(scoreChartRef.current);
        if (existing) existing.destroy();
        new Chart(scoreChartRef.current, {
          type: "bar",
          data: {
            labels: Object.keys(scoreBuckets).map(k => `${k}+`),
            datasets: [{ data: Object.values(scoreBuckets), backgroundColor: "#9ca08144", borderColor: "#9ca081", borderWidth: 2, borderRadius: 6 }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#9ca081" }, grid: { color: "#f2de9b11" } },
              y: { ticks: { color: "#9ca081" }, grid: { color: "#f2de9b11" } },
            },
          },
        });
      }

      if (yearChartRef.current) {
        const existing = Chart.getChart(yearChartRef.current);
        if (existing) existing.destroy();
        new Chart(yearChartRef.current, {
          type: "line",
          data: {
            labels: years.map(([y]) => y),
            datasets: [{
              data: years.map(([,c]) => c),
              borderColor: "#f2de9b", backgroundColor: "#f2de9b11",
              fill: true, tension: 0.4, pointBackgroundColor: "#f2de9b", pointRadius: 3,
            }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#9ca081", maxRotation: 45, font: { size: 10 } }, grid: { color: "#f2de9b11" } },
              y: { ticks: { color: "#9ca081" }, grid: { color: "#f2de9b11" } },
            },
          },
        });
      }
    });
  }, [products]);

  const totalAnime = products.length;
  const avgScore = products.filter(p => p.score).reduce((s, p, _, a) => s + p.score / a.length, 0).toFixed(2);
  const topGenre = (() => {
    const g = {};
    products.forEach(p => p.genre?.forEach(x => { g[x] = (g[x]||0)+1; }));
    return Object.entries(g).sort((a,b)=>b[1]-a[1])[0]?.[0] || "-";
  })();

  return (
    <div className="bg-[#0d0a14] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1 className="text-4xl font-black text-purple-200 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          📊 Anime Stats
        </motion.h1>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Anime", value: totalAnime.toLocaleString() },
            { label: "Average Score", value: avgScore },
            { label: "Top Genre", value: topGenre },
            { label: "Data Source", value: "MAL" },
          ].map(({ label, value }, i) => (
            <motion.div key={label}
              className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}>
              <div className="text-2xl font-black text-purple-200">{value}</div>
              <div className="text-xs text-purple-300/60 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-5">
            <h3 className="text-purple-200 font-bold mb-4">Top Genres</h3>
            <div style={{ height: "260px" }}><canvas ref={genreChartRef} /></div>
          </div>
          <div className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-5">
            <h3 className="text-purple-200 font-bold mb-4">Score Distribution</h3>
            <div style={{ height: "260px" }}><canvas ref={scoreChartRef} /></div>
          </div>
        </div>

        <div className="bg-[#1a1528] border border-purple-500/10 rounded-2xl p-5">
          <h3 className="text-purple-200 font-bold mb-4">Anime Released per Year (1990–2023)</h3>
          <div style={{ height: "260px" }}><canvas ref={yearChartRef} /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
