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
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <motion.h1 
          className="text-6xl font-black tracking-tighter text-white"
          animate={{ textShadow: ["0 0 10px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.5)", "0 0 10px rgba(239,68,68,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ZAID
        </motion.h1>
        <h2 className="text-3xl font-bold tracking-tight text-red-500">ZAID MOD VIP</h2>
        <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-red-400/50 uppercase">
          Elite Modding System
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm space-y-4"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center text-red-400">
            <Lock size={20} />
          </div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="... ادخل كود التفعيل"
            dir="rtl"
            className={`w-full rounded-2xl border bg-red-950/20 py-5 px-12 text-center text-white outline-none transition-all placeholder:text-red-400/30 ${
              error ? "border-red-500 bg-red-500/10 animate-shake" : "border-red-500/20 focus:border-red-500/50"
            }`}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 py-5 text-lg font-bold text-white shadow-xl shadow-red-900/20"
        >
          <span>تسجيل الدخول</span>
          <ArrowLeftCircle className="rotate-180" />
        </motion.button>

        <div className="text-center">
          <a href="#" className="flex items-center justify-center gap-2 text-sm text-red-400 underline decoration-red-500/30 underline-offset-4">
            <ArrowLeftCircle size={16} />
            الحصول على كود التفعيل (تواصل معي)
          </a>
        </div>
      </motion.form>

      <div className="mt-16 grid w-full max-w-sm grid-cols-2 gap-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-red-500/10 bg-red-950/10 p-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Zap />
          </div>
          <h3 className="text-sm font-bold text-white">سرعة فائقة</h3>
          <p className="text-[10px] text-red-400/50">تحليل فوري للملفات</p>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-red-500/10 bg-red-950/10 p-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Shield />
          </div>
          <h3 className="text-sm font-bold text-white">حماية قوية</h3>
          <p className="text-[10px] text-red-400/50">باتشات احترافية</p>
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
