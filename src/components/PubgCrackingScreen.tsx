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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Server rejection" }));
        throw new Error(errorData.error || "Bypass failed");
      }

      const blob = await response.blob();
      if (blob.type.includes("json")) {
        const text = await blob.text();
        const json = JSON.parse(text);
        throw new Error(json.error || "File error");
      }
      
      (window as any)._lastCrackedBlob = blob;

      setStatus("cracking");
      
      const finalSteps = [
        "Unpacking PUBG Assets...",
        "Bypassing OBB Integrity...",
        "Injecting VIP Code: " + customKey,
        "Neutralizing Anti-Cheat...",
        "Patching Binary Symbols...",
        "Applying RSA Signature Hack...",
        "Finalizing Elite Build..."
      ];

      for (let i = 0; i < finalSteps.length; i++) {
        await new Promise(r => setTimeout(r, 200));
        addLog(finalSteps[i]);
      }

      setStatus("done");
      addLog("✅ PUBG VIP Mod Processed Successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus("idle");
      addLog("❌ Error: " + err.message);
      alert("Crack Failed: " + err.message);
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
    <div className="flex min-h-[100dvh] flex-col items-center p-4">
      <div className="mb-6 flex w-full max-w-md items-center justify-between px-2">
        <button 
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
        >
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-black text-white italic tracking-widest uppercase">PUBG Injector</h1>
          <Target className="text-red-500" size={18} />
        </div>
        <div className="w-9" />
      </div>

      {status === "idle" && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <div className="rounded-2xl glass-panel p-4">
             <label className="mb-2 block text-[10px] font-black uppercase text-red-500 tracking-widest leading-none">VIP Activation Key</label>
             <div className="relative">
               <input 
                type="text"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="w-full rounded-xl border border-red-500/20 bg-black/40 px-4 py-3 font-mono text-sm font-bold text-white outline-none focus:border-red-500/50"
                placeholder="ZAID-VIP"
               />
               <Zap className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} />
             </div>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-red-500/20 bg-white/[0.01] transition-all hover:bg-white/[0.03]"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
              <Upload size={30} />
            </div>
            <h2 className="text-sm font-bold text-white">Upload PUBG APK</h2>
            <p className="mt-1 text-[10px] text-white/30 uppercase tracking-[0.2em]">Max 200MB - Optimized Engine</p>
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
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-red-500/20">
            <RefreshCw className="animate-spin text-red-500" size={32} />
          </div>
          
          <div className="mb-6 flex w-full flex-col gap-2 px-2">
             <div className="flex items-center justify-between text-[10px] font-black text-red-500 uppercase tracking-widest">
               <span>{status === "uploading" ? "Broadcasting" : "Injecting"}...</span>
               <span className="animate-pulse">Active V5.0</span>
             </div>
             <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="h-full w-full bg-gradient-to-r from-red-600 to-red-900" 
                />
             </div>
          </div>

          <div className="w-full rounded-2xl glass-panel p-4 font-mono text-[9px] leading-relaxed text-red-400/80 shadow-inner h-40 overflow-y-auto scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className="mb-0.5 flex gap-2">
                <span className="opacity-40">{new Date().toLocaleTimeString('ar-EG', { hour12: false })}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "done" && (
        <motion.div
          key="done"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex w-full max-w-md flex-col items-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass-panel bg-green-500/10 text-green-500 shadow-xl shadow-green-500/10">
            <CheckCircle2 size={32} />
          </div>
          
          <h2 className="mb-1 text-lg font-black text-white italic text-center uppercase tracking-tight">Injection Complete</h2>
          <p className="mb-6 text-center text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">VIP Key: {customKey}</p>

          <div className="mb-6 w-full rounded-xl glass-panel p-4 flex items-center gap-3">
             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/20 text-red-500">
                <Flame size={20} />
             </div>
             <div className="text-right">
                <div className="text-[10px] font-black text-white uppercase italic">Full VIP Bypass</div>
                <div className="text-[9px] text-white/30 uppercase leading-none mt-1">Building specialized binaries</div>
             </div>
          </div>

          <div className="grid w-full gap-3">
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
                  a.download = `ZAID_ELITE_${cleanName}.apk`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
                className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-900 py-4 text-xs font-black text-white red-glow-strong"
              >
                <span>Download Elite Build</span>
                <Download size={16} />
              </motion.button>
              
              <button 
                onClick={() => setStatus("idle")}
                className="py-2 text-[10px] font-black uppercase text-white/20 hover:text-white/40 transition-colors"
                dir="rtl"
              >
                تعديل تطبيق آخر
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
