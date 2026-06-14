import React, { useState } from "react";
import { Search as SearchIcon, MapPin, SlidersHorizontal, ChevronDown, X, History, Sparkles, RefreshCw, Bookmark, PlusCircle, ArrowLeft } from "lucide-react";
import { Screen, Job, UserProfile } from "../types";

interface JobSearchProps {
  userProfile: UserProfile;
  jobs: Job[];
  onTransition: (screen: Screen) => void;
  onBack: () => void;
  onSelectJob: (job: Job) => void;
}

export default function JobSearch({
  userProfile,
  jobs,
  onTransition,
  onBack,
  onSelectJob
}: JobSearchProps) {
  const [searchTitle, setSearchTitle] = useState("Software Engineer");
  const [searchLocation, setSearchLocation] = useState("");
  const [isRemoteFiltered, setIsRemoteFiltered] = useState(true); // matching active 'Remote' chip from image
  const [isFullTimeOnly, setIsFullTimeTimeOnly] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Toggle bookmark helper
  const handleBookmarkToggle = (id: string) => {
    if (bookmarkedList.includes(id)) {
      setBookmarkedList(prev => prev.filter(item => item !== id));
    } else {
      setBookmarkedList(prev => [...prev, id]);
      alert("Job bookmarked successfully!");
    }
  };

  // Filter jobs based on states
  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase()) || 
                         job.tags.some(t => t.toLowerCase().includes(searchTitle.toLowerCase())) ||
                         job.companyName.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesLocation = searchLocation === "" || job.location.toLowerCase().includes(searchLocation.toLowerCase());
    
    // Remote match checking
    const matchesRemote = !isRemoteFiltered || 
                          job.location.toLowerCase().includes("remote") || 
                          job.tags.some(t => t.toLowerCase().includes("remote"));

    const matchesFullTime = !isFullTimeOnly || job.type.toLowerCase().includes("full time");

    return matchesTitle && matchesLocation && matchesRemote && matchesFullTime;
  });

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#1E293B] pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Dynamic Header */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 neo-shadow">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img 
            src={userProfile.avatarUrl} 
            alt="User profile photo" 
            onClick={() => onTransition(Screen.PROFILE)}
            className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
          />
          <h1 
            onClick={() => onTransition(Screen.HOME)}
            className="font-extrabold text-lg text-indigo-600 cursor-pointer"
          >
            JobFinder
          </h1>
        </div>
        <button 
          onClick={() => onTransition(Screen.ACTIVITY)}
          className="text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all relative"
        >
          <BellIcon />
          <span className="absolute top-1.5 right-1.5 w-2 bg-rose-500 h-2 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Main Container Stage */}
      <main className="w-full max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Search & Filter Area */}
        <section className="flex flex-col gap-4 relative z-25">
          
          {/* Active Search Inputs Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col sm:flex-row items-center gap-2 neo-shadow focus-within:border-indigo-400 focus-within:shadow-md transition-all">
            <div className="flex items-center flex-1 w-full pl-2">
              <SearchIcon className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="flex-1 bg-transparent border-none text-xs text-slate-800 px-3 focus:outline-none focus:ring-0 placeholder-slate-400 w-full"
              />
            </div>
            
            <div className="hidden sm:block h-6 w-[1px] bg-slate-200/65 mx-1"></div>
            
            <div className="hidden sm:flex items-center flex-1 w-full pl-2">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="City, state, or remote"
                className="flex-1 bg-transparent border-none text-xs text-slate-800 px-3 focus:outline-none focus:ring-0 placeholder-slate-400 w-full"
              />
            </div>

            {/* Submit Control */}
            <button 
              onClick={() => alert("Search queries filtered successfully below.")}
              className="vibrant-gradient-1 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all w-full sm:w-auto text-nowrap cursor-pointer"
            >
              Find Jobs
            </button>
          </div>

          {/* Advanced Horizontal Slide Filters */}
          <div className="flex overflow-x-auto gap-2 pb-1 pt-1 hide-scrollbar items-center select-none">
            <div className="pr-2 border-r border-slate-200 hidden md:block">
              <button 
                onClick={() => alert("Comprehensive filters panel opened.")}
                className="flex items-center gap-1.5 text-slate-600 text-xs font-bold hover:text-indigo-600 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" /> Filters
              </button>
            </div>

            <button className="bg-slate-100 hover:bg-slate-200/80 border border-transparent rounded-full px-4 py-2.5 text-xs font-semibold text-slate-700 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>Location</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button className="bg-slate-100 hover:bg-slate-200/80 border border-transparent rounded-full px-4 py-2.5 text-xs font-semibold text-slate-700 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>Salary Range</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Remote Active filter chip styling */}
            {isRemoteFiltered && (
              <button 
                onClick={() => setIsRemoteFiltered(false)}
                className="vibrant-gradient-1 text-white rounded-full px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow"
              >
                <span>Remote</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Toggle Full Time only */}
            <button 
              onClick={() => setIsFullTimeTimeOnly(!isFullTimeOnly)}
              className={`border rounded-full px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isFullTimeOnly 
                  ? "vibrant-gradient-1 border-transparent text-white font-bold shadow"
                  : "bg-slate-100 hover:bg-slate-200/80 border-transparent text-slate-700"
              }`}
            >
              Full Time
            </button>

            <button className="bg-slate-100 hover:bg-slate-200/80 border border-transparent rounded-full px-4 py-2.5 text-xs font-semibold text-slate-700 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>Experience Level</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </section>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Recent Searches left panel (3 cols on desktop) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            
            {/* Recent list container */}
            <div className="bg-white rounded-2xl border border-slate-100/95 p-5 neo-shadow">
              <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Recent Searches</h3>
              <ul className="flex flex-col gap-1">
                {[
                  "Frontend Developer, Remote",
                  "React Native Engineer, NY",
                  "UI/UX Designer, Tech"
                ].map((term) => (
                  <li key={term}>
                    <button 
                      onClick={() => setSearchTitle(term.split(",")[0])}
                      className="w-full flex items-center gap-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2 text-left group cursor-pointer"
                    >
                      <History className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                      <span className="truncate flex-1">{term}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular tags container */}
            <div className="bg-white rounded-2xl border border-slate-100/95 p-5 neo-shadow">
              <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Popular Searches</h3>
              <div className="flex flex-wrap gap-1.5">
                {["AI Engineer", "Product Manager", "Data Scientist", "Python Developer"].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setSearchTitle(tag)}
                    className="bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-600 px-3/5 py-1.5 rounded-full border border-slate-100 transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume optimization promotional matching banner */}
            <div className="rounded-2xl overflow-hidden relative p-6 vibrant-gradient-1 text-white neo-shadow-dark">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "16px 16px" }}></div>
              <div className="relative z-10 flex flex-col items-start gap-2.5">
                <Sparkles className="w-7 h-7 text-white fill-white/25 animate-spin-slow" />
                <h4 className="text-base font-extrabold leading-tight">Let AI match your skills</h4>
                <p className="text-xs text-white/90 leading-relaxed">
                  Upload your resume and we&apos;ll find hidden opportunities that fit your profile perfectly.
                </p>
                <button 
                  onClick={() => onTransition(Screen.RESUME)}
                  className="mt-2 text-xs font-bold text-indigo-600 bg-white px-5 py-2.5 rounded-xl active:scale-95 transition-all shadow hover:bg-slate-50 cursor-pointer"
                >
                  Try AI Match
                </button>
              </div>
            </div>

          </aside>

          {/* Results pane (8 cols on desktop) */}
          <section className="lg:col-span-8 flex flex-col gap-4 order-1 lg:order-2">
            
            {/* Metric headers */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <h2 className="text-sm font-extrabold text-slate-800 flex items-baseline gap-2">
                <span>Software Engineer Jobs</span>
                <span className="text-xs font-medium text-slate-400">({filteredJobs.length} results)</span>
              </h2>
              <div className="flex items-center gap-2 self-start sm:self-auto font-bold text-xs select-none">
                <span className="text-slate-400">Sort by:</span>
                <button className="flex items-center gap-1 text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm cursor-pointer">
                  <span>Relevance</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List Job cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-xs font-semibold text-slate-400">
                No jobs matching your exact search parameters. Try clearing your filters or changing search keywords.
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-fade-in">
                {filteredJobs.map((job) => {
                  const isBookmarked = bookmarkedList.includes(job.id);
                  return (
                    <article 
                      key={job.id}
                      className="bg-white rounded-2xl p-5 border border-slate-100/90 flex flex-col sm:flex-row gap-5 hover:border-indigo-100 neo-shadow transition-all duration-300 relative group"
                    >
                      {/* Gradient Border for Top/AI Highlight layout */}
                      {job.isTopMatch && (
                        <div className="absolute top-4 right-4 vibrant-gradient-1 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                          <span>Top Match</span>
                        </div>
                      )}

                      {/* Logo and company detail */}
                      <div 
                        className="w-12 h-12 rounded-xl border border-slate-100 flex-shrink-0 bg-white overflow-hidden p-1.5 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          onSelectJob(job);
                          onTransition(Screen.JOB_DETAIL);
                        }}
                      >
                        <img src={job.companyLogo} alt="Company Logo" className="w-full h-full object-contain rounded-lg" />
                      </div>

                      {/* Summary contents */}
                      <div className="flex-1 flex flex-col">
                        <h3 
                          onClick={() => {
                            onSelectJob(job);
                            onTransition(Screen.JOB_DETAIL);
                          }}
                          className="font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight cursor-pointer pr-16 text-sm"
                        >
                          {job.title}
                        </h3>
                        <p 
                          onClick={() => onTransition(Screen.COMPANY_PROFILE)}
                          className="text-xs text-slate-500 font-semibold mt-1 mb-2 hover:underline cursor-pointer"
                        >
                          {job.companyName} • {job.location}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 opacity-90 line-clamp-2">
                          {job.description}
                        </p>
                        
                        {/* Interactive Attribute Pill Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          <span className="bg-indigo-50/75 text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {job.salaryRange}
                          </span>
                          {job.tags.map((tag) => (
                            <span 
                              key={tag}
                              onClick={() => setSearchTitle(tag)}
                              className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Post time and action commands */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-4 border-t border-slate-100 sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0 flex-shrink-0">
                        <span className="text-[11px] font-bold text-slate-400 sm:mb-auto">{job.postedTime}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleBookmarkToggle(job.id)}
                            className={`p-2 rounded-full border transition-all focus:outline-none cursor-pointer ${
                              isBookmarked 
                                ? "bg-indigo-50 border-transparent text-indigo-600" 
                                : "bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100"
                            }`}
                            aria-label="Toggle Save Job"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`} />
                          </button>
                          
                          <button 
                            onClick={() => {
                              onSelectJob(job);
                              onTransition(Screen.APPLICATION_FORM);
                            }}
                            className="vibrant-gradient-1 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                    </article>
                  );
                })}
              </div>
            )}

            {/* Load more controller pagination */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => {
                  setIsLoadingMore(true);
                  setTimeout(() => {
                    setIsLoadingMore(false);
                    alert("All jobs successfully loaded.");
                  }, 1500);
                }}
                disabled={isLoadingMore}
                className="text-xs font-bold text-indigo-600 border border-indigo-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/10 px-8 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                <span>Load more jobs</span>
                <RefreshCw className={`w-4 h-4 ${isLoadingMore ? "animate-spin" : ""}`} />
              </button>
            </div>

          </section>

        </div>
      </main>

    </div>
  );
}

// Inline bell SVG
function BellIcon() {
  return (
    <svg className="w-6 h-6 fill-none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 11-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
    </svg>
  );
}
