import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prefersReducedMotion } from "../utils/webgl";

export default function PageIntro({ onComplete }) {
  const [isDone, setIsDone] = useState(() => {
    // If reduced motion is requested or already visited, skip immediately
    if (typeof window !== "undefined") {
      if (prefersReducedMotion()) return true;
    }
    return false;
  });

  useEffect(() => {
    if (isDone) {
      if (onComplete) onComplete();
      return;
    }

    // Fast, crisp intro that never traps the user (under 900ms)
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 850);

    // Escape hatch: user interaction instantly clears intro
    const dismiss = () => {
      setIsDone(true);
      if (onComplete) onComplete();
    };

    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, [isDone, onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060913] pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeOut" },
          }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white flex items-center gap-1"
            >
              <span>Naday</span>
              <span className="text-cyan-400">.</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 mt-3 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="text-xs uppercase tracking-widest text-cyan-300/80 mt-2.5 font-mono"
            >
              Frontend Developer
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
