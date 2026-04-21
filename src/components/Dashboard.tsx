import { motion } from "motion/react";
import { Zap, Target, ChevronLeft } from "lucide-react";

interface DashboardProps {
  onSelectCracking: () => void;
  onSelectExtraction: () => void;
}

export default function Dashboard({ onSelectCracking, onSelectExtraction }: DashboardProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-black text-white tracking-tighter text-glow">DASHBOARD</h1>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-4 py-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">System Secure</span>
        </div>
      </motion.div>

      <div className="grid w-full max-w-[360px] gap-4">
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectCracking}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-right transition-all hover:border-red-500/30 red-glow glass-panel"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-900/40">
            <Zap size={24} />
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-black text-white group-hover:text-red-500 transition-colors">تكريك لودرات</h2>
            <p className="text-[10px] text-white/40 font-medium">Bypass Security & Key Injection</p>
          </div>

          <ChevronLeft size={18} className="text-red-500 group-hover:-translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectExtraction}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-right transition-all hover:border-red-500/30 red-glow glass-panel"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-900/40">
            <Target size={24} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-black text-white group-hover:text-red-500 transition-colors">تكريك نسخ ببجي</h2>
            <p className="text-[10px] text-white/40 font-medium">PUBG Modding & VIP Access</p>
          </div>

          <ChevronLeft size={18} className="text-red-500 group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-red-500/40 uppercase">
          <span>@cvh48</span>
          <span className="h-1 w-1 rounded-full bg-red-500/20" />
          <span>ZAID ELITE V5.0</span>
        </div>
      </motion.div>
    </div>
  );
}
