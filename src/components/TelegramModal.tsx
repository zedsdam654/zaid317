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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-red-500/30 bg-[#120000] p-8 text-center shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-red-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            >
              <Send className="h-10 w-10 text-white" />
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-white">انضم لقناتنا</h2>
            <p className="mb-8 text-red-200/70 text-sm leading-relaxed">
              تابع آخر التحديثات والباتشات الحصرية على قناتنا الرسمية في تليجرام
            </p>

            <div className="space-y-3">
              <a
                href="https://t.me/cvh48"
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl bg-white py-4 text-center font-bold text-black transition-transform active:scale-95"
              >
                انضم الآن @cvh48
              </a>
              <button
                onClick={onClose}
                className="block w-full rounded-xl border border-red-500/20 bg-red-500/10 py-4 text-center font-bold text-red-400 transition-colors hover:bg-red-500/20"
              >
                تخطي الآن
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
