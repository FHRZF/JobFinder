import React, { useState } from "react";
import { ArrowLeft, Bookmark, Share2, MapPin, DollarSign, Calendar, Compass, Sparkles, Building2, Briefcase } from "lucide-react";
import { Screen, Job } from "../types";

interface JobDetailProps {
  job: Job | null;
  onTransition: (screen: Screen) => void;
  onBack: () => void;
  onCompanySelect: () => void;
}

export default function JobDetail({ job, onTransition, onBack, onCompanySelect }: JobDetailProps) {
  const [activeTab, setActiveTab] = useState<"description" | "requirements">("description");
  const [isSaved, setIsSaved] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12 text-[#737686]">
        No job selection loaded. Please return home or search.
      </div>
    );
  }

  const handleShare = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: job.title,
          text: `Check out this opening at ${job.companyName}: ${job.title}`,
          url: window.location.href,
        });
      } else {
        alert("Job opening URL copied to clipboard!");
      }
    } catch {
      alert("Job opening URL copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800 pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 neo-shadow">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
          aria-label="Back to Job Search"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Job Details</h2>
        <div className="flex gap-1.5">
          <button 
            onClick={handleShare}
            className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            aria-label="Share Job"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              setIsSaved(!isSaved);
              alert(isSaved ? "Removed from bookmarked folder." : "Opening saved! Added to portfolio bookmarks.");
            }}
            className={`p-2 rounded-full hover:bg-slate-50 transition-all cursor-pointer ${isSaved ? "text-indigo-600 animate-pulse" : "text-slate-400"}`}
            aria-label="Save Job"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-indigo-600 text-indigo-600" : ""}`} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[700px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Visual Hero Header Block */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow flex flex-col items-center text-center relative overflow-hidden select-none animate-fade-in">
          {job.isAiMatch && (
            <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-[10px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1 border border-indigo-100/50">
              <Sparkles className="w-3.5 h-3.5 fill-indigo-100 animate-pulse" />
              <span>AI Match Profile</span>
            </span>
          )}

          <img 
            src={job.companyLogo} 
            alt={job.companyName} 
            className="w-18 h-18 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-2 object-contain mb-4"
          />

          <h3 className="text-xl font-extrabold text-slate-800 leading-snug px-4">
            {job.title}
          </h3>
          
          <button 
            onClick={onCompanySelect}
            className="text-xs font-bold text-indigo-600 hover:underline mt-1.5 flex items-center gap-1.5 cursor-pointer animate-fade-in"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{job.companyName}</span>
          </button>

          <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </p>

          {/* Quick attribute table details rows */}
          <div className="grid grid-cols-2 gap-4 w-full border-t border-slate-100 pt-5 mt-6 justify-center">
            <div className="text-center border-r border-slate-100 pb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Salary Est</span>
              <span className="text-xs font-extrabold text-[#111827] mt-0.5 inline-flex items-center text-slate-800">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>{job.salaryRange.split(" - ")[0]} - {job.salaryRange.split(" - ")[1] || job.salaryRange}</span>
              </span>
            </div>
            <div className="text-center pb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Job Type</span>
              <span className="text-xs font-extrabold text-indigo-600 mt-0.5 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50">
                {job.type}
              </span>
            </div>
          </div>
        </div>

        {/* Action button trigger apply form */}
        <div>
          <button 
            onClick={() => onTransition(Screen.APPLICATION_FORM)}
            className="w-full vibrant-gradient-1 text-[#ffffff] font-extrabold py-3.5 rounded-2xl shadow-md hover:opacity-95 transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply Now</span>
          </button>
        </div>

        {/* Tab Controls */}
        <section className="flex border-b border-slate-100 select-none">
          <button 
            onClick={() => setActiveTab("description")}
            className={`flex-1 py-3 text-xs font-extrabold text-center transition-all border-b-2 cursor-pointer ${
              activeTab === "description" 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Job Description
          </button>
          
          <button 
            onClick={() => setActiveTab("requirements")}
            className={`flex-1 py-3 text-xs font-extrabold text-center transition-all border-b-2 cursor-pointer ${
              activeTab === "requirements" 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Role Requirements
          </button>
        </section>

        {/* Tab content displays */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow">
          {activeTab === "description" ? (
            /* Inside Job Description */
            <div className="space-y-4 animate-fade-in text-xs leading-relaxed text-slate-500">
              <p className="font-semibold">{job.description}</p>
              
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pt-2 border-b border-slate-50 pb-1">
                Benefits & Perks Included:
              </h4>
              <ul className="list-disc list-inside space-y-2.5 pl-1 font-semibold text-slate-600">
                {(job.benefits || [
                  "Comprehensive health coverage plans with zero deductibles",
                  "Direct work hybrid flexibility with corporate home office setups",
                  "Supportive parental leaves, child grants, and continuous training",
                  "Complimentary catered meals and on-premise physical coach classes"
                ]).map((ben) => (
                  <li key={ben}>{ben}</li>
                ))}
              </ul>
            </div>
          ) : (
            /* Inside Role Requirements */
            <div className="space-y-4 animate-fade-in text-xs leading-relaxed text-slate-500">
              <p className="font-semibold">
                To excel in this role, you possess solid engineering credentials, excellent design thinking skills, and strong cross-functional communication abilities.
              </p>

              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pt-2 border-b border-slate-50 pb-1">
                Candidate Requirements:
              </h4>
              <ul className="list-disc list-inside space-y-2.5 pl-1 font-semibold text-slate-600">
                {(job.requirements || [
                  "Experience designing core transaction maps using Figma or Framer",
                  "Solid portfolio demonstrating end-to-end user interfaces and layouts",
                  "Good comprehension of modern frontend modular constraints",
                  "Ability to operate and prioritize tasks in rapid startup tempos"
                ]).map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* About Company profile quick navigation footer banner */}
        <section 
          onClick={onCompanySelect}
          className="bg-indigo-50/40 hover:bg-indigo-50/75 border border-indigo-150 rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-colors select-none"
        >
          <div className="flex gap-3.5 items-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 shrink-0 animate-fade-in">
              <Building2 className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">About Enterprise</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5">{job.companyName}</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-indigo-600 hover:underline">View Page</span>
        </section>

      </main>

    </div>
  );
}
