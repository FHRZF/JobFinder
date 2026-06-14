import React, { useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Screen } from "../types";

interface SplashProps {
  onTransition: (screen: Screen) => void;
}

export default function Splash({ onTransition }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTransition(Screen.ONBOARDING);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onTransition]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-50 cursor-pointer"
      onClick={() => onTransition(Screen.ONBOARDING)}
    >
      {/* Central Content Area */}
      <main className="flex flex-col items-center justify-center flex-grow z-10 w-full px-6 text-center animate-fade-in">
        {/* Logo & Icon Wrapper */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Subtle pulse effect behind icon */}
          <div className="absolute w-24 h-24 bg-indigo-200 rounded-full animate-ping opacity-25 z-0"></div>
          
          {/* Icon Glass Container */}
          <div className="relative z-10 w-20 h-20 bg-white rounded-2xl neo-shadow border border-slate-100 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
            <Search className="w-9 h-9 text-indigo-600 stroke-[2.5]" />
          </div>
        </div>

        {/* Typography */}
        <div className="text-center flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
            JobFinder
          </h1>
          <p className="text-sm font-semibold text-slate-400 max-w-[280px]">
            Find Your Dream Career
          </p>
        </div>
      </main>

      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-16 flex justify-center items-center gap-2">
        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin opacity-80" />
        <span className="text-xs font-bold text-indigo-500/80">Loading career engine...</span>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-100 blur-[80px] rounded-full opacity-35 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-purple-100 blur-[80px] rounded-full opacity-45 pointer-events-none"></div>
    </div>
  );
}
