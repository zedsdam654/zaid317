import { motion, AnimatePresence } from "motion/react";
import { Send, X } from "lucide-react";

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TelegramModal({ isOpen, onClose }: TelegramModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] glass-panel p-6 text-center shadow-2xl red-glow-strong"
          >
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-900/50"
            >
              <Send className="h-7 w-7 text-white" />
            </motion.div>

            <h2 className="mb-2 text-xl font-black text-white italic">JOIN TELEGRAM</h2>
            <p className="mb-6 text-white/40 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
              Get exclusive VIP patches and direct support.
            </p>

            <div className="space-y-2">
              <a
                href="https://t.me/cvh48"
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl bg-white py-3 text-xs font-black text-black transition-transform active:scale-95"
              >
                JOIN @cvh48
              </a>
              <button
                onClick={onClose}
                className="block w-full py-2 text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
