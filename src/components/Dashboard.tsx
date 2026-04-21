import { motion } from "motion/react";
import { Zap, Target, ChevronLeft } from "lucide-react";

interface DashboardProps {
  onSelectCracking: () => void;
  onSelectExtraction: () => void;
}

export default function Dashboard({ onSelectCracking, onSelectExtraction }: DashboardProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="mb-4 text-red-500 font-bold uppercase tracking-widest">مرحباً بك في نظام</div>
        <h1 className="text-6xl font-black text-white tracking-tighter shadow-red-500/20 drop-shadow-2xl">ZAID MOD VIP</h1>
        <div className="mt-4 inline-block rounded-lg border border-red-500/30 bg-red-950/20 px-6 py-2 text-xs font-black text-red-400 uppercase tracking-[0.2em]">
          ELITE CONTROL PANEL V5.0
        </div>
      </motion.div>

      <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectCracking}
          className="group relative h-64 overflow-hidden rounded-[2.5rem] border border-red-500/20 bg-gradient-to-br from-[#120000] to-[#050000] p-8 text-right shadow-2xl transition-all hover:border-red-500/50 hover:shadow-red-500/10"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition-colors group-hover:bg-red-600/20" />
          
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-900/50 ring-4 ring-red-500/20">
            <Zap size={32} />
          </div>
          
          <h2 className="mb-2 text-2xl font-black text-white">تكريك لودرات</h2>
          <p className="text-sm leading-relaxed text-red-100/60 font-medium">
            فك حماية اللودرات، وتخطي أنظمة التحقق، وحقن أكواد الدخول المخصصة بضغطة واحدة
          </p>

          <div className="absolute bottom-8 left-8 flex items-center gap-2 text-red-500 opacity-0 transition-all group-hover:left-10 group-hover:opacity-100">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">فتح المحرك</span>
            <ChevronLeft size={16} />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectExtraction}
          className="group relative h-64 overflow-hidden rounded-[2.5rem] border border-red-500/20 bg-gradient-to-br from-[#120000] to-[#050000] p-8 text-right shadow-2xl transition-all hover:border-red-500/50 hover:shadow-red-500/10"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition-colors group-hover:bg-red-600/20" />

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-900/50 ring-4 ring-red-500/20">
            <Target size={32} />
          </div>

          <h2 className="mb-2 text-2xl font-black text-white">تكريك نسخ ببجي</h2>
          <p className="text-sm leading-relaxed text-red-100/60 font-medium">
            تعديل نسخ الببجي المعدلة، حقن أكواد VIP، وتخطي حمايات تسجيل الدخول العالمية
          </p>

          <div className="absolute bottom-8 left-8 flex items-center gap-2 text-red-500 opacity-0 transition-all group-hover:left-10 group-hover:opacity-100">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">حقن النسخة</span>
            <ChevronLeft size={16} />
          </div>
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center"
      >
        <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-red-500/40 font-bold">Powered By</div>
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-black text-white tracking-widest"
        >
          ZAID MOD VIP
        </motion.div>
        <div className="mt-2 flex items-center justify-center gap-4 text-[10px] font-bold text-red-500/60 uppercase">
          <span>@cvh48</span>
          <span className="h-1 w-1 rounded-full bg-red-500/30" />
          <span>@HZU2U</span>
        </div>
      </motion.div>
    </div>
  );
}
