import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium max-w-xs cursor-pointer ${
              toast.type === "success"
                ? "bg-[#1a1528] border-purple-500/30 text-purple-200"
                : toast.type === "error"
                ? "bg-red-900/90 border-red-500/30 text-red-200"
                : "bg-[#1a1528] border-purple-500/20 text-purple-300"
            }`}
            onClick={() => removeToast(toast.id)}
          >
            <span className="text-purple-400">{toast.type === "success" ? "✓" : toast.type === "error" ? "✗" : "ℹ"}</span>
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
