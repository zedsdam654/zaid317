import express from "express";
import multer from "multer";
import AdmZip from "adm-zip";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "200mb" }));
  app.use(express.urlencoded({ limit: "200mb", extended: true }));

  // Global Error Handler for JSON responses
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ 
      error: "حدث خطأ في السيرفر", 
      details: err.message,
      results: [],
      securityData: null 
    });
  });

  // API Route: Extract Patterns
  app.post("/api/extract", (req, res, next) => {
    upload.single("apk")(req, res, (err) => {
      if (err) return res.status(400).json({ error: "فشل رفع الملف: " + err.message });
      if (!req.file) return res.status(400).json({ error: "لم يتم اختيار ملف" });

      try {
        const zip = new AdmZip(req.file.buffer);
        const zipEntries = zip.getEntries();
        const results: { label: string; value: string }[] = [];
        let securityMatch = "";

        zipEntries.forEach((entry) => {
          try {
            if (entry.isDirectory) return;

            const entryName = entry.entryName.toLowerCase();
            if (!entryName.endsWith(".dex") && !entryName.endsWith(".arsc") && 
                !entryName.endsWith(".xml") && !entryName.endsWith(".smali") &&
                !entryName.endsWith(".so") && !entryName.endsWith(".cpp") &&
                !entryName.endsWith(".h")) return;

            const content = entry.getData().toString("latin1");

            // Search for URLs
            const urls = content.match(/https?:\/\/[^\s"'`<>\\\[\]]+(\.json|\.zip|\.php|\.py|\.html)/gi);
            if (urls) {
              urls.forEach(u => {
                const cleanUrl = u.replace(/[^\x20-\x7E]/g, ''); 
                if (cleanUrl.length > 15 && !results.find(r => r.value === cleanUrl)) {
                  results.push({ label: `رابط في ${entry.entryName}`, value: cleanUrl });
                }
              });
            }

            // Search JNI & OBFUSCATE Patterns
            if (content.includes("OBFUSCATE") || content.includes("Java_") || content.includes("mainURL")) {
              const obfuscatedUrlRegex = /OBFUSCATE\s*\(\s*["']([^"']+)["']\s*\)/gi;
              let m;
              while ((m = obfuscatedUrlRegex.exec(content)) !== null) {
                  results.push({ label: `نص مشفر (${entry.entryName})`, value: m[1] });
              }
            }

            // Search for security patterns
            if (content.includes("MoveAssets") || content.includes("Loadssets")) {
              const loadAssetsRegex = /private\s+void\s+Loadssets\s*\(\)\s*\{[\s\S]*?\}/gi;
              const assetsMatch = content.match(loadAssetsRegex);
              if (assetsMatch) {
                  securityMatch += `\n/* Found in ${entry.entryName} */\n` + assetsMatch[0] + "\n";
              }
            }
          } catch (e) { /* ignore single entry errors */ }
        });

        res.json({ results, securityData: securityMatch || null });
      } catch (err) {
        res.status(500).json({ error: "فشل تحليل الملف، قد يكون الملف تالفاً أو محمياً بشدة" });
      }
    });
  });

  // API Route: Bypass Endpoint (for redirected apps)
  app.all("/api/bypass/*", (req, res) => {
    console.log("BYPASS REQUEST RECEIVED:", req.url);
    // Typical "Success" responses for loaders
    res.json({
      status: "success",
      msg: "Login Successful",
      user: "ZAID-MOD-VIP",
      expiry: "2099-01-01",
      token: "elite_access_granted",
      code: 200,
      data: {
        is_vip: true,
        days_left: 9999
      }
    });
  });

  // API Route: Login Bypass (Cracking) & Custom Code Injection
  app.post("/api/crack", (req, res) => {
    upload.single("apk")(req, res, (err) => {
      if (err) return res.status(400).json({ error: "Upload failed" });
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      
      const customCode = req.body.customCode || "ZAID-MOD-VIP";
      const appUrl = process.env.APP_URL || "http://localhost:3000";
      const bypassUrl = `${appUrl}/api/bypass/`.substring(0, 30); // Keep it relatively short

      try {
        const zip = new AdmZip(req.file.buffer);
        const zipEntries = zip.getEntries();
        let patchCount = 0;
        
        // 1. Remove signatures
        zipEntries.forEach(entry => {
          if (entry.entryName.startsWith("META-INF/")) {
            zip.deleteFile(entry.entryName);
          }
        });

        // 2. "Deep Patching": Search and replace URLs and Boolean results in DEX/SO files
        zipEntries.forEach(entry => {
          const entryName = entry.entryName.toLowerCase();
          if (entryName.endsWith(".dex") || entryName.endsWith(".so")) {
             let data = entry.getData();
             const content = data.toString("latin1");
             
             // A. URL Redirection Patch
             const urlPattern = /https?:\/\/[a-z0-9.-]+\/[a-z0-9._\/-]+\?/gi;
             
             let match;
             let modified = false;
             while ((match = urlPattern.exec(content)) !== null) {
                const originalUrl = match[0];
                // Replace with a bypass proxy (preserving exact length)
                let fakeBase = `http://zaid.vip/api/bypass?`;
                if (fakeBase.length <= originalUrl.length) {
                  let finalUrl = fakeBase.padEnd(originalUrl.length, " ");
                  const bufferPayload = Buffer.from(finalUrl, "latin1");
                  data.fill(bufferPayload, match.index, match.index + originalUrl.length);
                  modified = true;
                  patchCount++;
                }
             }

             // B. Method Logic Patching (Heuristic)
             if (entryName.endsWith(".dex")) {
                const indicators = ["isRegistered", "checkLicense", "verifyUser", "loginResult"];
                indicators.forEach(pattern => {
                   if (content.includes(pattern)) {
                     // Metadata marking (simulation of bytecode replacement)
                     modified = true;
                   }
                });
             }

             if (modified) {
               zip.updateFile(entry.entryName, data);
             }
          }
        });

        // 3. Inject side-channel config
        zip.addFile("assets/config_zaid.json", Buffer.from(JSON.stringify({
          key: customCode,
          bypass: true,
          developer: "ZAID MOD VIP",
          patches: patchCount
        })));

        const buffer = zip.toBuffer();
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', `attachment; filename="ZAID_ELITE_MOD.apk"`);
        res.send(buffer);
      } catch (err) {
        res.status(500).json({ error: "CRACK_ERROR", details: "Deep patching failed" });
      }
    });
  });

  // Vite middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
