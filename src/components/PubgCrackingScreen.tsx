import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Target, 
  Zap, 
  ShieldAlert, 
  Terminal,
  Cpu,
  Flame
} from "lucide-react";

interface PubgCrackingScreenProps {
  onBack: () => void;
}

export default function PubgCrackingScreen({ onBack }: PubgCrackingScreenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [customKey, setCustomKey] = useState("ZAID-MOD-VIP");
  const [status, setStatus] = useState<"idle" | "uploading" | "cracking" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('ar-EG')}] ${msg}`]);
  };

  const simulateCracking = async (uploadedFile: File) => {
    setStatus("uploading");
    setLogs([]);
    addLog("بدء رفع نسخة ببجي المعدلة...");
    
    const formData = new FormData();
    formData.append("apk", uploadedFile);
    formData.append("customCode", customKey);

    try {
      const response = await fetch("/api/crack", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Connection failed");

      const blob = await response.blob();
      (window as any)._lastCrackedBlob = blob;

      setStatus("cracking");
      
      const finalSteps = [
        "تفكيك ملفات النسخة (Unpacking APK)...",
        "البحث عن دوال التحقق في ملفات الـ OBB...",
        "حقن كود الـ VIP المخصص: " + customKey,
        "تجاوز حماية الـ Global/Korean/Indian Check...",
        "تعطيل نظام الـ Anti-Cheat (Hack-Bypass)...",
        "تعديل ملفات الـ C++ الثنائية (SO Files)...",
        "تحويل بوابة الدخول إلى سيرفر ZAID MOD...",
        "إعادة توقيع اللعبة بـ Signature Bypass...",
        "تجهيز نسخة الـ VIP النهائية للتحميل..."
      ];

      for (let i = 0; i < finalSteps.length; i++) {
        await new Promise(r => setTimeout(r, 800));
        addLog(finalSteps[i]);
      }

      setStatus("done");
      addLog("تم تكريك النسخة بنجاح! جاهزة للتحميل.");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("خطأ في الاتصال بالسيرفر");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      simulateCracking(selectedFile);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <div className="mb-8 flex w-full max-w-2xl items-center justify-between">
        <button 
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
          <span>تكريك نسخ ببجي</span>
          <Target className="text-red-500" size={24} />
        </h1>
        <div className="w-10" />
      </div>

      {status === "idle" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex w-full max-w-2xl flex-col gap-6"
        >
          {/* Custom Key Input */}
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-xl">
             <label className="mb-3 block text-xs font-black uppercase text-red-400">ادخل كود التفعيل الذي تريده:</label>
             <div className="relative">
               <input 
                type="text"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="w-full rounded-2xl border border-red-500/30 bg-black/40 px-5 py-4 font-mono text-lg font-bold text-white outline-none focus:border-red-500/60"
                placeholder="ZAID-MOD-VIP"
               />
               <Zap className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
             </div>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-red-500/30 bg-red-950/5 transition-all hover:border-red-500/60 hover:bg-red-950/10"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
              <Upload size={40} />
            </div>
            <h2 className="text-xl font-bold text-white">ارفق نسخة الببجي المعدلة</h2>
            <p className="mt-2 text-sm text-red-300/40">APK / OBB (الحد الأقصى 200MB)</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".apk"
              className="hidden" 
            />
          </div>
        </motion.div>
      )}

      {(status === "uploading" || status === "cracking") && (
        <div className="flex w-full max-w-2xl flex-col items-center">
          <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full border-4 border-red-500/20">
            <RefreshCw className="animate-spin text-red-500" size={48} />
          </div>
          
          <div className="mb-8 flex w-full flex-col gap-3">
             <div className="flex items-center justify-between px-2 text-xs font-bold text-red-400 uppercase">
               <span>{status === "uploading" ? "جاري الرفع..." : "جاري التكريك..."}</span>
               <span className="animate-pulse">Active Engine v4.8</span>
             </div>
             <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="h-full w-full bg-gradient-to-r from-red-600 to-orange-500" 
                />
             </div>
          </div>

          <div className="w-full rounded-2xl border border-white/5 bg-black/40 p-5 font-mono text-[10px] leading-relaxed text-red-300/60 shadow-inner">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className="mb-1"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {status === "done" && (
        <motion.div
          key="done"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex w-full max-w-2xl flex-col items-center"
        >
          <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-green-500/20 text-green-500 shadow-2xl shadow-green-500/20">
            <CheckCircle2 size={64} />
          </div>
          
          <h2 className="mb-2 text-3xl font-black text-white">تم الحقن بنجاح!</h2>
          <p className="mb-8 text-center text-sm text-white/40">تم حقن الكود {customKey} في نسخة ببجي بنجاح 100%. النسخة جاهزة للعمل.</p>

          <div className="grid w-full gap-4">
             <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                   <Flame size={24} />
                </div>
                <div className="text-right">
                   <div className="text-[10px] uppercase text-white/30">نوع الباتش</div>
                   <div className="text-sm font-bold text-white">Full VIP Bypass + Global Server</div>
                </div>
             </div>
          </div>

          <div className="mt-8 grid w-full gap-4">
             <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const blob = (window as any)._lastCrackedBlob;
                  if (!blob) return;
                  
                  const apkBlob = new Blob([blob], { type: 'application/vnd.android.package-archive' });
                  const url = URL.createObjectURL(apkBlob);
                  
                  const a = document.createElement('a');
                  a.href = url;
                  const cleanName = (file?.name || 'pubg.apk').replace(/\.apk$/, '');
                  a.download = `ZAID_ELITE_PUBG_${cleanName}.apk`;
                  
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 py-5 text-lg font-bold text-white shadow-xl shadow-red-900/40"
              >
                <span>تحميل نسخة الببجي المحقونة</span>
                <Download size={24} />
              </motion.button>
              
              <button 
                onClick={() => setStatus("idle")}
                className="flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase text-white/40 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
                <span>تكريك نسخة أخرى</span>
              </button>
          </div>
        </motion.div>
      )}

      <div className="mt-auto pt-12">
        <div className="text-center">
          <motion.div 
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-lg font-black text-white"
          >
            ZAID MOD VIP
          </motion.div>
          <div className="mt-1 text-[10px] text-red-500 uppercase tracking-tighter">
            PUBG MODDING ENGINE v4.8
          </div>
        </div>
      </div>
    </div>
  );
}
