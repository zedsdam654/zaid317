import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, ChevronRight, Download, RefreshCw, CheckCircle2, FileCode, Cpu, Shield } from "lucide-react";

interface CrackingScreenProps {
  onBack: () => void;
}

export default function CrackingScreen({ onBack }: CrackingScreenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [customKey, setCustomKey] = useState("ZAID-MOD-VIP");
  const [status, setStatus] = useState<"idle" | "uploading" | "cracking" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateCracking = async (uploadedFile: File) => {
    if (!customKey) {
      alert("يرجى إدخال كود التفعيل المخصص");
      return;
    }
    setStatus("uploading");
    setLogs(["بدء رفع التطبيق...", `ارسال كود الحقن: ${customKey}`, "انتظار رد السيرفر..."]);
    
    const formData = new FormData();
    formData.append("apk", uploadedFile);
    formData.append("customCode", customKey);

    try {
      const response = await fetch("/api/crack", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "فشل غير معروف في السيرفر" }));
        throw new Error(errorData.error || "Connection failed");
      }

      setStatus("cracking");
      setLogs(prev => [...prev, "اتصال ناجح ✅", "بدء المعالجة الذكية..."]);
      
      const blob = await response.blob();
      if (blob.type.includes("json")) {
        const text = await blob.text();
        const json = JSON.parse(text);
        throw new Error(json.error || "Format error");
      }
      
      const finalSteps = [
        "تفكيك ملفات DEX...",
        "حقن كود الدخول: " + customKey,
        "تبديل روابط التحقق...",
        "تجاوز حماية التوقيع...",
        "تعديل السلاسل النصية...",
        "إعادة تجميع الملفات...",
        "توقع النسخة وتجهيزها..."
      ];

      for (let i = 0; i < finalSteps.length; i++) {
        await new Promise(r => setTimeout(r, 150));
        setLogs(prev => [...prev, finalSteps[i]]);
      }
      
      setStatus("done");
      setLogs(prev => [...prev, "✅ تم تعديل التطبيق بنجاح!"]);
      (window as any)._lastCrackedBlob = blob;

    } catch (err: any) {
      console.error(err);
      setStatus("idle");
      setLogs(prev => [...prev, "❌ خطأ: " + err.message]);
      alert(err.message);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Don't start immediately, let user see the code input
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
          <h1 className="text-sm font-black text-white italic tracking-widest uppercase">Loader Modder</h1>
          <Cpu className="text-red-500" size={16} />
        </div>
        <div className="w-9" />
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex w-full max-w-md flex-col gap-4"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 glass-panel">
               <label className="mb-2 block text-[10px] font-black text-red-500 uppercase tracking-widest">Injection Key</label>
               <input 
                  type="text" 
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="EX: ZAIDMOD"
                  className="w-full rounded-xl border border-red-500/20 bg-black/40 py-3 px-4 text-center text-sm font-black text-white outline-none focus:border-red-500/50"
               />
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-red-500/20 bg-white/[0.01] transition-all hover:bg-white/[0.03]"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <h2 className="text-sm font-bold text-white">{file ? file.name : "Select Loader APK"}</h2>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".apk"
                className="hidden" 
              />
            </div>

            {file && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => simulateCracking(file)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 py-4 text-sm font-black text-white red-glow-strong"
              >
                <span>Process Application</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {(status === "uploading" || status === "cracking") && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full max-w-md flex-col"
          >
            <div className="overflow-hidden rounded-2xl glass-panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="animate-spin text-red-500" size={14} />
                  <span className="text-[11px] font-black text-white uppercase">{status === 'uploading' ? 'Uploading' : 'Processing'}...</span>
                </div>
                <div className="text-[9px] font-bold text-red-500/40 tracking-[0.2em]">ENGINE V5.0</div>
              </div>
              
              <div className="h-48 overflow-y-auto space-y-1.5 rounded-lg bg-black/40 p-3 font-mono text-[9px] text-red-400/80 scrollbar-hide">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="opacity-40">{new Date().toLocaleTimeString('ar-EG', { hour12: false })}</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
            <p className="mb-6 text-center text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Injected Key: {customKey}</p>

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
                    const cleanName = (file?.name || 'app.apk').replace(/\.apk$/, '');
                    a.download = `ZAID_ELITE_${cleanName}.apk`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                  }}
                  className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-900 py-4 text-xs font-black text-white red-glow-strong"
                >
                  <span>Download Build</span>
                  <Download size={16} />
                </motion.button>
                
                <button 
                  onClick={() => setStatus("idle")}
                  className="py-2 text-[10px] font-black uppercase text-white/20 hover:text-white/40 transition-colors"
                >
                  Process Another
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-12">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-red-500/40 font-bold mb-2">Developed By</div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg font-black text-white"
          >
            ZAID MOD VIP
          </motion.div>
        </div>
      </div>
    </div>
  );
}
