/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Background from "./components/Background";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import TelegramModal from "./components/TelegramModal";
import CrackingScreen from "./components/CrackingScreen";
import PubgCrackingScreen from "./components/PubgCrackingScreen";

type View = "login" | "dashboard" | "cracking" | "pubgCracking";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [showTelegram, setShowTelegram] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Show Telegram modal on first real visit (after login) or initially as requested
  useEffect(() => {
    const timer = setTimeout(() => {
      if (view === "login") {
        setShowTelegram(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [view]);

  const handleLogin = (code: string) => {
    if (code === "ZAID-MOD-VIP") {
      setIsAuthorized(true);
      setView("dashboard");
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-red-500/30">
      <Background />
      
      <main className="relative z-10 w-full animate-in fade-in duration-700">
        {view === "login" && (
          <LoginScreen onLogin={handleLogin} />
        )}

        {isAuthorized && view === "dashboard" && (
          <Dashboard 
            onSelectCracking={() => setView("cracking")}
            onSelectExtraction={() => setView("pubgCracking")}
          />
        )}

        {isAuthorized && view === "cracking" && (
          <CrackingScreen onBack={() => setView("dashboard")} />
        )}

        {isAuthorized && view === "pubgCracking" && (
          <PubgCrackingScreen onBack={() => setView("dashboard")} />
        )}
      </main>

      <TelegramModal 
        isOpen={showTelegram} 
        onClose={() => setShowTelegram(false)} 
      />
    </div>
  );
}

