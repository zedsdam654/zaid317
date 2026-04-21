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
      const startTime = Date.now();
      const response = await fetch("/api/crack", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Connection failed");

      setStatus("cracking");
      setLogs(prev => [...prev, "اتصال ناجح ✅", "بدء عملية المعالجة العميقة..."]);
      
      const blob = await response.blob();
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Add gradual logs for "Realism" and UX
      const finalSteps = [
        "تفكيك ملفات DEX الثنائية...",
        "بدء الفحص العميق لقاعدة البيانات...",
        "حقن كود الدخول: " + customKey,
        "تحديد ثغرات الاتصال بالسيرفر...",
        "تبديل روابط التحقق بباتش Bypass محلي...",
        "تجاوز حماية التوقيع الرقمي (Signature Hack)...",
        "تعديل السلاسل النصية بنجاح 100%...",
        "إعادة تجميع الملفات وتوقيع النسخة النهائية...",
        "تجهيز تقرير ZAID MOD VIP النهائي..."
      ];

      for (let i = 0; i < finalSteps.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        setLogs(prev => [...prev, finalSteps[i]]);
      }
      
      setStatus("done");
      setLogs(prev => [...prev, "✅ اكتمل العمل بنجاح!"]);
      (window as any)._lastCrackedBlob = blob;

    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("فشل في معالجة التطبيق. تأكد من حجم الملف واستقرار الانترنت.");
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
    <div className="flex min-h-screen flex-col items-center p-6">
      <div className="mb-8 flex w-full max-w-2xl items-center justify-between">
        <button 
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="text-xl font-black text-white italic tracking-widest flex items-center gap-2">
          <span>تكريك وحقن اللودرات</span>
          <Cpu className="text-red-500" size={20} />
        </h1>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex w-full max-w-2xl flex-col gap-6"
          >
            {/* Custom Code Input */}
            <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-6">
               <label className="mb-3 block text-right text-xs font-black text-red-500 uppercase tracking-widest">كود الدخول المخصص (الذي سيتم حقنه)</label>
               <input 
                  type="text" 
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="مثال: ZAIDMODVIP"
                  className="w-full rounded-2xl border border-red-500/30 bg-black/40 py-4 px-6 text-center text-lg font-black text-white outline-none focus:border-red-500"
               />
               <p className="mt-3 text-right text-[10px] text-red-300/40 leading-relaxed italic">
                 * سيقوم النظام بتعديل التطبيق المرفوع بحيث يصبح هذا الكود هو المفتاح الوحيد للدخول إليه بعد التثبيت.
               </p>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-red-500/30 bg-red-950/5 transition-all hover:border-red-500/60 hover:bg-red-950/10"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">{file ? file.name : "ارفع تطبيق APK"}</h2>
              <p className="mt-1 text-sm text-red-300/50">النظام يدعم جميع اصدارات الاندرويد</p>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => simulateCracking(file)}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 py-5 text-xl font-black text-white shadow-2xl shadow-red-900/40"
              >
                <span>بدء عملية التكريك والحقن</span>
                <Cpu size={24} />
              </motion.button>
            )}
          </motion.div>
        )}

        {(status === "uploading" || status === "cracking") && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full max-w-2xl flex-col"
          >
            <div className="mb-6 overflow-hidden rounded-3xl border border-red-500/20 bg-[#120000] p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw className="animate-spin text-red-500" size={20} />
                  <span className="text-sm font-bold text-white capitalize">{status === 'uploading' ? 'جاري الرفع' : 'جاري التكريك'}...</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-red-500/50">Processing Engine v4.8</div>
              </div>
              
              <div className="h-64 overflow-y-auto space-y-2 rounded-xl bg-black/40 p-4 font-mono text-[11px] text-red-400/80 scrollbar-hide">
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={i} 
                    className="flex gap-2"
                  >
                    <span className="text-red-500 font-bold">[{new Date().toLocaleTimeString('ar-EG')}]</span>
                    <span>{log}</span>
                  </motion.div>
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
            className="flex w-full max-w-2xl flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-500/20 text-green-400 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
                <CheckCircle2 size={56} />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white shadow-lg"
              >
                <Shield size={20} />
              </motion.div>
            </div>
            
            <h2 className="mb-2 text-3xl font-black text-white italic">PATCH SUCCESSFUL</h2>
            
            <div className="mb-10 w-full rounded-3xl border border-green-500/20 bg-green-500/5 p-6 text-center">
               <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-green-400/60">كود الدخول الجديد المحقون</div>
               <div className="text-2xl font-black text-white">{customKey}</div>
               <p className="mt-4 text-xs text-green-300/50 leading-relaxed">
                 تم تعديل منطق الحماية في التطبيق الأصلي وتبديله بباتش مخصص. بمجرد التثبيت، استخدم الكود أعلاه لتسجيل الدخول بنجاح.
               </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const blob = (window as any)._lastCrackedBlob;
                  if (!blob) return;
                  
                  // Force the correct MIME type for the blob
                  const apkBlob = new Blob([blob], { type: 'application/vnd.android.package-archive' });
                  const url = URL.createObjectURL(apkBlob);
                  
                  const a = document.createElement('a');
                  a.href = url;
                  // Ensure clean filename without leading dots or weird characters
                  const cleanName = (file?.name || 'app.apk').replace(/\.apk$/, '');
                  a.download = `ZAID_ELITE_${cleanName}.apk`;
                  
                  // Append to body to ensure it works in all browsers
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  
                  // Clean up URL
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-5 text-lg font-bold text-white shadow-xl shadow-green-900/40"
              >
                <span>تحميل التطبيق المعدل</span>
                <Download size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStatus("idle")}
                className="flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-5 text-lg font-bold text-red-300"
              >
                <span>تبديل التطبيق</span>
                <RefreshCw size={22} />
              </motion.button>
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
