import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Lock, ArrowLeftCircle, Shield, Zap } from "lucide-react";

interface LoginScreenProps {
  onLogin: (code: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === "ZAID-MOD-VIP") {
      onLogin(code);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 transition-all duration-300">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 text-center"
      >
        <motion.h1 
          className="text-5xl font-black tracking-tight text-white text-glow"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ZAID
        </motion.h1>
        <h2 className="text-2xl font-bold tracking-tight text-red-500">ZAID MOD VIP</h2>
        <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[340px] space-y-4"
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center text-red-500/50 group-focus-within:text-red-500 transition-colors">
            <Lock size={18} />
          </div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ادخل كود التفعيل"
            dir="rtl"
            className={`w-full rounded-2xl border bg-black/40 py-4 px-12 text-center text-white outline-none transition-all placeholder:text-white/10 ${
              error ? "border-red-500 bg-red-900/10 animate-shake" : "border-red-500/20 focus:border-red-500/50 red-glow"
            }`}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220, 38, 38, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-900 py-4 text-base font-black text-white shadow-xl shadow-red-900/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span>تسجيل الدخول</span>
          <ArrowLeftCircle size={20} className="rotate-180" />
        </motion.button>

        <button 
          type="button"
          className="w-full text-center py-2"
        >
          <a href="https://t.me/cvh48" target="_blank" rel="noreferrer" className="text-xs text-red-500/60 hover:text-red-500 transition-colors flex items-center justify-center gap-1">
            الحصول على كود التفعيل <ArrowLeftCircle size={12} className="rotate-180" />
          </a>
        </button>
      </motion.form>

      <div className="mt-12 grid w-full max-w-[340px] grid-cols-2 gap-3">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center glass-panel"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Zap size={20} />
          </div>
          <h3 className="text-[11px] font-bold text-white">سرعة البرق</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center glass-panel"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Shield size={20} />
          </div>
          <h3 className="text-[11px] font-bold text-white">حماية VIP</h3>
        </motion.div>
      </div>

      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-12 text-center text-[10px] uppercase tracking-widest text-red-500/50"
      >
        ZAID MOD VIP نظام استخراج احترافي - نسخة
      </motion.div>
    </div>
  );
}
