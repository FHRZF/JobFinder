import React, { useState } from "react";
import { ArrowLeft, Check, Sparkles, FolderKanban, BookOpen, Clock, Settings2, Shield, LogOut, ChevronRight, Briefcase } from "lucide-react";
import { Screen, UserProfile, ApplicationPipelineItem } from "../types";
import { initialPipeline } from "../data";

interface ProfilePageProps {
  userProfile: UserProfile;
  onTransition: (screen: Screen) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfilePage({ userProfile, onTransition, onBack, onLogout }: ProfilePageProps) {
  const [pipeline, setPipeline] = useState<ApplicationPipelineItem[]>(initialPipeline);
  const [notifSound, setNotifSound] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#faf8ff] text-[#131b2e] pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3c6d7]/15 shadow-sm">
        <button 
          onClick={onBack}
          className="text-[#434655] hover:text-[#004ac6] p-2 hover:bg-slate-50 rounded-full transition-all mr-2"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-extrabold text-base text-[#131b2e]">Profile Settings</h1>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[700px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Core Profile Hero Block */}
        <section className="bg-white rounded-2xl border border-[#c3c6d7]/20 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5 select-none relative overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#eaedff]/40 to-transparent pointer-events-none"></div>

          <img 
            src={userProfile.avatarUrl} 
            alt={userProfile.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md relative z-10"
          />

          <div className="text-center sm:text-left flex-grow relative z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-[#111827]">{userProfile.name}</h2>
              <span className="bg-[#e0e3f9] text-[#004ac6] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                {userProfile.role}
              </span>
            </div>
            <p className="text-xs text-[#737686] font-semibold mt-0.5">{userProfile.headline}</p>
            <p className="text-[11px] text-slate-400 mt-1">{userProfile.email} • {userProfile.phone}</p>
          </div>
        </section>

        {/* Dynamic Interactive Features Cards */}
        <div className="flex flex-col gap-4">
          
          {/* Trigger 1: Portfolio Showcase (Links to Screen 8) */}
          <button 
            onClick={() => onTransition(Screen.PORTFOLIO_BUILDER)}
            className="bg-white hover:bg-[#faf8ff] p-4 rounded-xl border border-[#c3c6d7]/30 text-left transition-all duration-200 shadow-sm flex items-center justify-between group"
          >
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#004ac6] flex items-center justify-center border border-blue-100">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#131b2e]">My Portfolio Builder</h4>
                <p className="text-[10px] text-[#737686] mt-0.5 font-semibold">
                  Manage and edit your projects portfolio showcase.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#737686] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trigger 2: Experience Timeline */}
          <button 
            onClick={() => {
              onTransition(Screen.RESUME);
              alert("Routing back to Resume Section to add details.");
            }}
            className="bg-white hover:bg-[#faf8ff] p-4 rounded-xl border border-[#c3c6d7]/30 text-left transition-all duration-200 shadow-sm flex items-center justify-between group"
          >
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#196fc0] flex items-center justify-center border border-[#196fc0]/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#131b2e]">Education & CV Details</h4>
                <p className="text-[10px] text-[#737686] mt-0.5 font-semibold">
                  Update school terms, internships, and certification items.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#737686] group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        {/* Section 4: Live Submitted Applications Track */}
        <section className="bg-white rounded-xl border border-[#c3c6d7]/20 p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 select-none">
            <Clock className="w-5 h-5 text-[#004ac6]" />
            <h3 className="text-xs font-extrabold text-[#131b2e]">Active Applications Pipeline</h3>
          </div>

          <div className="flex flex-col gap-3">
            {pipeline.map((item) => (
              <div key={item.id} className="p-3.5 bg-[#faf8ff] border border-slate-100 rounded-xl hover:border-blue-150 transition-colors flex justify-between items-center select-none">
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-[#131b2e] truncate">{item.jobTitle}</h4>
                  <p className="text-[10px] text-[#737686] font-semibold mt-0.5">{item.companyName} • {item.location}</p>
                </div>
                
                {/* Custom styling status labels */}
                <div className="text-right shrink-0">
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    item.status === "Interview" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                    item.status === "Reviewing" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                    item.status === "Submitted" ? "bg-slate-100 text-slate-800 border border-slate-100" :
                    "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-[9px] text-[#737686] mt-1 font-semibold">
                    {item.interviewDate || item.appliedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Settings Preferences toggles */}
        <section className="bg-white rounded-xl border border-[#c3c6d7]/20 p-5 shadow-sm flex flex-col gap-4 select-none">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Settings2 className="w-5 h-5 text-[#004ac6]" />
            <h3 className="text-xs font-extrabold text-[#131b2e]">App Preferences</h3>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <div>
              <p className="text-xs font-extrabold text-[#131b2e]">Profile Visibility</p>
              <p className="text-[10px] text-[#737686] font-semibold">Allow verified startup recruiters to view your projects.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-[#c3c6d7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#004ac6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <div>
              <p className="text-xs font-extrabold text-[#131b2e]">Sound Alerts</p>
              <p className="text-[10px] text-[#737686] font-semibold">Play chime indicators when interview invites arrive.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifSound}
                onChange={() => setNotifSound(!notifSound)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-[#c3c6d7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#004ac6]"></div>
            </label>
          </div>
        </section>

        {/* Logout action */}
        <div className="text-center">
          <button 
            onClick={onLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-[#ba1a1a] border border-red-200/55 rounded-xl py-4 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Account</span>
          </button>
        </div>

      </main>

    </div>
  );
}
