import React from "react";
import { Search as SearchIcon, Bell, Bookmark, Send, Calendar, Briefcase, Code, Brush, Sparkles, SlidersHorizontal, ChevronRight, Settings, HelpCircle, GraduationCap } from "lucide-react";
import { Screen, UserProfile, Job } from "../types";

interface HomeDashboardProps {
  userProfile: UserProfile;
  jobs: Job[];
  onTransition: (screen: Screen) => void;
  onSelectJob: (job: Job) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function HomeDashboard({
  userProfile,
  jobs,
  onTransition,
  onSelectJob,
  selectedCategory,
  setSelectedCategory
}: HomeDashboardProps) {

  // Category tags matching Screen 12
  const categories = ["UI/UX Design", "Front-End", "Graphic Design", "Product Management", "Data Science"];

  // Find a recommended job to showcase (e.g. Senior UX/UI Designer / job-4 or job-5)
  const recommendedJob = jobs.find(j => j.id === "job-4" || j.isAiMatch) || jobs[0];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#131b2e] pb-[100px] md:pb-6 flex flex-col md:flex-row font-sans">
      
      {/* Web Side Nav (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 neo-shadow z-30 p-5">
        <div 
          className="flex items-center gap-3 mb-8 p-1 cursor-pointer"
          onClick={() => onTransition(Screen.PROFILE)}
        >
          <img 
            src={userProfile.avatarUrl} 
            alt={userProfile.name} 
            className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
          />
          <div>
            <h2 className="text-indigo-600 font-extrabold text-sm">{userProfile.name}</h2>
            <p className="text-[11px] text-slate-500 font-semibold">{userProfile.headline}</p>
          </div>
        </div>

        {/* Side menu links matching dashboard instructions */}
        <div className="flex flex-col gap-1 flex-grow">
          <button 
            onClick={() => onTransition(Screen.HOME)}
            className="w-full flex items-center justify-start gap-4 p-3 bg-indigo-50 text-indigo-600 font-extrabold rounded-xl transition-all shadow-sm"
          >
            <Briefcase className="w-5 h-5 text-[#6366F1]" />
            <span className="text-xs">Home Dashboard</span>
          </button>
          
          <button 
            onClick={() => onTransition(Screen.SEARCH)}
            className="w-full flex items-center justify-start gap-4 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-left"
          >
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <span>Search Jobs</span>
          </button>

          <button 
            onClick={() => onTransition(Screen.APPS)}
            className="w-full flex items-center justify-start gap-4 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-style text-xs font-semibold text-left"
          >
            <Sparkles className="w-5 h-5 text-slate-400" />
            <span>AI Career Assistant</span>
          </button>

          <button 
            onClick={() => onTransition(Screen.RESUME)}
            className="w-full flex items-center justify-start gap-4 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-left"
          >
            <GraduationCap className="w-5 h-5 text-slate-400" />
            <span>Resume Builder</span>
          </button>

          <button 
            onClick={() => onTransition(Screen.PROFILE)}
            className="w-full flex items-center justify-start gap-4 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-left mt-auto mb-2"
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Settings</span>
          </button>

          <button 
            onClick={() => alert("Simulated dynamic support channels opened.")}
            className="w-full flex items-center justify-start gap-4 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-left"
          >
            <HelpCircle className="w-5 h-5 text-slate-400" />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      {/* Main content pane container */}
      <div className="flex-grow flex-1 w-full md:pl-72 flex flex-col items-center">
        <div className="w-full max-w-[800px] px-6">
          
          {/* Mobile TopAppBar */}
          <header className="md:hidden flex justify-between items-center w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onTransition(Screen.PROFILE)}
            >
              <img 
                src={userProfile.avatarUrl} 
                alt={userProfile.name} 
                className="w-9 h-9 rounded-full object-cover border border-slate-100"
              />
              <span className="font-extrabold text-base text-indigo-600">JobFinder</span>
            </div>
            <button 
              onClick={() => onTransition(Screen.ACTIVITY)}
              className="text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-all relative"
              aria-label="View notifications list"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white"></span>
            </button>
          </header>

          {/* Handheld desktop notification header panel */}
          <div className="hidden md:flex justify-between items-center w-full mt-6 mb-4">
            <h1 className="text-xl font-extrabold text-indigo-600">JobFinder Home</h1>
            <button 
              onClick={() => onTransition(Screen.ACTIVITY)}
              className="text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-all relative"
              aria-label="View notifications list"
            >
              <Bell className="w-6 h-6 animate-pulse" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
            </button>
          </div>

          {/* Welcome User Section */}
          <section className="mt-4 mb-6">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              Hi, {userProfile.name.split(" ")[0]} <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-1">Ready to find your next big opportunity?</p>
          </section>

          {/* Quick Search Redirect Input Box */}
          <section className="mb-6 relative">
            <div 
              onClick={() => onTransition(Screen.SEARCH)}
              className="flex items-center w-full bg-white rounded-2xl neo-shadow border border-slate-100 hover:border-indigo-400 cursor-pointer p-4 transition-all"
            >
              <SearchIcon className="w-5 h-5 text-slate-400 mr-3" />
              <span className="text-xs text-slate-500 font-medium flex-grow">Search for jobs, companies, or keywords</span>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Metric Bento Cards */}
          <section className="grid grid-cols-3 gap-3 md:gap-4 mb-6 select-none">
            {/* Metric Card 1 */}
            <div className="bg-white rounded-2xl p-4 neo-shadow border border-slate-50 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-2">
                <Bookmark className="w-5 h-5 text-[#6366F1]" />
              </div>
              <span className="text-xl font-extrabold text-slate-800">24</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Saved Jobs</span>
            </div>

            {/* Metric Card 2 */}
            <div className="bg-white rounded-2xl p-4 neo-shadow border border-slate-50 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-2">
                <Send className="w-5 h-5 text-[#F43F5E]" />
              </div>
              <span className="text-xl font-extrabold text-slate-800">12</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Applications</span>
            </div>

            {/* Metric Card 3 */}
            <button 
              onClick={() => {
                onTransition(Screen.APPS);
                alert("Simulating redirect to Interviews Tracker on apps.");
              }}
              className="bg-white rounded-2xl p-4 neo-shadow border border-slate-50 flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-xl font-extrabold text-slate-800">3</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Interviews</span>
            </button>
          </section>

          {/* Dynamic Job category horiz sliding filter chips */}
          <section className="mb-6">
            <div className="flex overflow-x-auto gap-2 pb-2 hscroll-container scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    cat === selectedCategory
                      ? "vibrant-gradient-1 text-white border-transparent font-extrabold shadow-sm"
                      : "bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Recommended Jobs */}
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Recommended For You</h3>
              <button 
                onClick={() => onTransition(Screen.SEARCH)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                See All
              </button>
            </div>
            
            {/* The AI matched highlighted card layout */}
            <div className="bg-white rounded-3xl p-6 neo-shadow border border-slate-100 relative overflow-hidden group hover:border-[#6366F1]/55 transition-all select-none">
              
              {/* Soft Gradient Overlay */}
              <div className="absolute top-0 right-0 vibrant-gradient-1 text-white px-4 py-1.5 rounded-bl-2xl font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white animate-spin-slow" />
                <span>AI MATCH</span>
              </div>

              {/* Main Job visual card layout */}
              <div 
                className="flex items-start gap-4 mb-5 cursor-pointer"
                onClick={() => {
                  onSelectJob(recommendedJob);
                  onTransition(Screen.JOB_DETAIL);
                }}
              >
                <img 
                  src={recommendedJob.companyLogo} 
                  alt={recommendedJob.companyName} 
                  className="w-14 h-14 rounded-2xl border border-slate-100 bg-[#faf8ff] p-2.5 object-contain"
                />
                <div className="flex-1 pr-14">
                  <h4 className="text-base font-extrabold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                    {recommendedJob.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    {recommendedJob.companyName} • {recommendedJob.location}
                  </p>
                </div>
              </div>

              {/* Categories/Attribute Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100/50">
                  {recommendedJob.type}
                </span>
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100/50">
                  {recommendedJob.experienceLevel}
                </span>
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100/50">
                  {recommendedJob.salaryRange}
                </span>
              </div>

              {/* Quick interactive actions button bar */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    onSelectJob(recommendedJob);
                    onTransition(Screen.APPLICATION_FORM);
                  }}
                  className="flex-1 vibrant-gradient-1 text-white text-xs font-extrabold py-3.5 rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => alert("Job saved to your bookmarks.")}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"
                  aria-label="Bookmark Recommended Job"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

            </div>
          </section>

          {/* Trending Jobs compact section */}
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Trending Roles</h3>
              <button 
                onClick={() => onTransition(Screen.SEARCH)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                See All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Compact Card 1 */}
              <div 
                className="bg-white rounded-2xl p-4 neo-shadow border border-slate-50 flex items-center gap-4 hover:border-indigo-100 transition-all cursor-pointer select-none"
                onClick={() => {
                  const job = jobs.find(j => j.title.toLowerCase().includes("frontend")) || jobs[1];
                  onSelectJob(job);
                  onTransition(Screen.JOB_DETAIL);
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 p-2 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-[#6366F1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-800 truncate">Frontend Developer</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">GlobalTech • Hybrid</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); alert("Job bookmarked."); }}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  <Bookmark className="w-4 h-4 pointer-events-auto" />
                </button>
              </div>

              {/* Compact Card 2 */}
              <div 
                className="bg-white rounded-2xl p-4 neo-shadow border border-slate-50 flex items-center gap-4 hover:border-indigo-100 transition-all cursor-pointer select-none"
                onClick={() => {
                  const job = jobs.find(j => j.title.toLowerCase().includes("ux researcher")) || jobs[3];
                  onSelectJob(job);
                  onTransition(Screen.JOB_DETAIL);
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 p-2 flex items-center justify-center shrink-0">
                  <Brush className="w-6 h-6 text-[#F43F5E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-800 truncate">UX Researcher</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">Innovate UX • New York</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); alert("Job bookmarked."); }}
                  className="text-slate-400 hover:text-indigo-600"
                >
                  <Bookmark className="w-4 h-4 pointer-events-auto" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
