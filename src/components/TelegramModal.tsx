import { motion, AnimatePresence } from "motion/react";
import { Send, X, ChevronRight } from "lucide-react";

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-[340px] overflow-hidden rounded-[2.5rem] bg-[#0A0000] border-2 border-red-500/30 p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
          >
            {/* Top Badge */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 rounded-b-xl text-[8px] font-black uppercase tracking-[0.3em] text-white">
              Official Access
            </div>

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-red-900 shadow-xl shadow-red-900/40 border border-white/10"
            >
              <Send className="h-10 w-10 text-white drop-shadow-lg" />
            </motion.div>

            <h2 className="mb-3 text-2xl font-black text-white tracking-tight uppercase italic text-glow">
              Zaid Mod Elite
            </h2>
            
            <div className="mb-8 space-y-2">
              <p className="text-white/70 text-xs font-bold leading-relaxed px-4">
                انضم لقناة التليجرام الرسمية للحصول على آخر التحديثات والباتشات الحصرية
              </p>
              <div className="flex items-center justify-center gap-2 opacity-30">
                <div className="h-[1px] w-8 bg-red-500" />
                <div className="h-1 w-1 rounded-full bg-red-500" />
                <div className="h-[1px] w-8 bg-red-500" />
              </div>
            </div>

            <div className="grid gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://t.me/cvh48"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between rounded-2xl bg-white p-4 transition-all hover:bg-red-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                    <Send size={16} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-red-600 uppercase">Telegram Channel</div>
                    <div className="text-sm font-black text-black">انضم الآن @cvh48</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-black/20 group-hover:text-red-500 transition-colors" />
              </motion.a>

              <button
                onClick={onClose}
                className="w-full py-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] transition-colors hover:text-red-500/60"
              >
                الدخول إلى لوحة التحكم
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
