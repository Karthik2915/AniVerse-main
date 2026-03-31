import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}));

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      if (!form.username.trim()) return setError("Username is required."), setLoading(false);
      if (form.password !== form.confirm) return setError("Passwords don't match."), setLoading(false);
      if (form.password.length < 6) return setError("Password must be at least 6 characters."), setLoading(false);
      const res = signup(form.username.trim(), form.email.trim().toLowerCase(), form.password);
      if (res.error) { setError(res.error); setLoading(false); return; }
    } else {
      const res = login(form.email.trim().toLowerCase(), form.password);
      if (res.error) { setError(res.error); setLoading(false); return; }
    }

    setTimeout(() => navigate("/anime"), 300);
  };

  const switchMode = (m) => { setMode(m); setError(""); setForm({ username: "", email: "", password: "", confirm: "" }); };

  return (
    <div className="min-h-screen bg-[#0d0a14] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background particles */}
      {PARTICLES.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full bg-purple-500/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center gap-3 mb-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              AniVerse
            </span>
          </motion.div>
          <p className="text-purple-300/60 text-sm">Your anime universe awaits</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1528]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
          {/* Tab switcher */}
          <div className="flex bg-[#251d38] rounded-2xl p-1 mb-7">
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  mode === m
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                    : "text-purple-300/60 hover:text-purple-200"
                }`}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Username (signup only) */}
              {mode === "signup" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="text-purple-200/70 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Username</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
                    <input
                      type="text" value={form.username} onChange={set("username")}
                      placeholder="Your display name"
                      className="w-full pl-10 pr-4 py-3 bg-[#251d38] border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-400/30 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all text-sm"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="text-purple-200/70 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
                  <input
                    type="email" value={form.email} onChange={set("email")}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#251d38] border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-400/30 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-purple-200/70 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
                  <input
                    type={showPass ? "text" : "password"} value={form.password} onChange={set("password")}
                    placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                    className="w-full pl-10 pr-10 py-3 bg-[#251d38] border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-400/30 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all text-sm"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm (signup only) */}
              {mode === "signup" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="text-purple-200/70 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
                    <input
                      type={showPass ? "text" : "password"} value={form.confirm} onChange={set("confirm")}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-4 py-3 bg-[#251d38] border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-400/30 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all text-sm"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-2.5 rounded-xl">
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all disabled:opacity-60"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                {loading ? "..." : mode === "login" ? "Sign In →" : "Create Account →"}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-purple-500/15" />
                <span className="text-purple-400/40 text-xs">or</span>
                <div className="flex-1 h-px bg-purple-500/15" />
              </div>

              {/* Guest */}
              <Link to="/anime">
                <button type="button"
                  className="w-full py-3 rounded-xl font-medium text-purple-300/70 text-sm border border-purple-500/15 hover:border-purple-500/35 hover:text-purple-200 transition-all">
                  Continue as Guest
                </button>
              </Link>
            </motion.form>
          </AnimatePresence>
        </div>

        <p className="text-center text-purple-400/30 text-xs mt-6">
          Your data stays on this device — no server required.
        </p>
      </motion.div>
    </div>
  );
}
