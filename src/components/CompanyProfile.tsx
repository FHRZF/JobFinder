import React from "react";
import { ArrowLeft, MapPin, Globe, Users, DollarSign, ExternalLink, Briefcase } from "lucide-react";
import { Screen, Job } from "../types";

interface CompanyProfileProps {
  companyName: string;
  companyLogo: string;
  jobs: Job[];
  onTransition: (screen: Screen) => void;
  onBack: () => void;
  onSelectJob: (job: Job) => void;
}

export default function CompanyProfile({
  companyName,
  companyLogo,
  jobs,
  onTransition,
  onBack,
  onSelectJob
}: CompanyProfileProps) {
  
  // Filter jobs by the active company
  const companyJobs = jobs.filter(
    (j) => j.companyName.toLowerCase() === companyName.toLowerCase()
  );

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800 pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 neo-shadow">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all mr-2 cursor-pointer"
          aria-label="Back to Job Detail"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-extrabold text-base text-slate-800">Company Profile</h1>
      </header>

      {/* Main visual Hero Banner background section */}
      <section className="relative w-full h-44 bg-slate-200 shrink-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFTscivbrllFfnhu755sMLKmZtqRku9XK5nNNqhV6QVdEzbukYz_Gt28TCw5hokiOlaUx4bVQ1IiaP4p9iJOw7rZHztEThmrVUbQuKOLFda4wgQddxe_G7OjhGbbwy1qtE-tIgYW-2vMDKEbKd7gRuyc1BddkMb36Od0A57sx6q8h-RvGJJHj01sO3flsoPIe96wWJa3axIlgtIDB9aFMyIWfTnD0XNhP4GsyOnr6e-LCu-5lv2FH5BoIBvH8uAvwHMkBWZKhJf0A" 
          alt="Office architectural banner background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Float Company Logo badge */}
        <div className="absolute -bottom-8 left-6 w-20 h-20 bg-white border-4 border-slate-100 rounded-2xl neo-shadow overflow-hidden p-2 flex items-center justify-center">
          <img src={companyLogo} alt={companyName} className="w-full h-full object-contain" />
        </div>
      </section>

      {/* Corporate Metadata Name Block */}
      <main className="w-full max-w-[700px] mx-auto px-6 pt-12 pb-6 flex flex-col gap-6">
        
        <section className="select-none text-left">
          <h2 className="text-2xl font-extrabold text-slate-800">{companyName}</h2>
          <p className="text-xs text-indigo-600 font-extrabold mt-1">Empowering digital transformations with artificial intelligence.</p>
          
          <div className="flex flex-wrap gap-4 text-[11px] font-semibold text-slate-400 mt-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>San Francisco, CA</span>
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-slate-400" />
              <a href="#" className="hover:underline flex items-center gap-0.5">
                <span>{companyName.toLowerCase().replace(/[^a-z]/g, "") || "technova"}.inc</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-slate-400" />
              <span>500 - 1,000 Employees</span>
            </span>
          </div>
        </section>

        {/* Section 1: About Corporate */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow text-left">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-50 pb-2 mb-3">
            About the Company
          </h3>
          <p className="text-xs leading-relaxed text-slate-500 font-semibold">
            {companyName} is at the forefront of crafting modern responsive SaaS widgets and dynamic digital dashboards. We believe in high-fidelity user experiences, solid engineering workflows, and beautiful user interactions. Founded by visionary product designers, we empower teams globally to optimize transactional performance pipelines seamlessly.
          </p>
        </section>

        {/* Section 2: Open Positions */}
        <section className="text-left">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 ml-1 select-none">
            Current Vacant Positions ({companyJobs.length})
          </h3>

          <div className="flex flex-col gap-3">
            {companyJobs.length === 0 ? (
              <div className="bg-white rounded-3xl border p-8 text-center text-xs text-slate-400 font-extrabold neo-shadow">
                No extra openings listed currently.
              </div>
            ) : (
              companyJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => {
                    onSelectJob(job);
                    onTransition(Screen.JOB_DETAIL);
                  }}
                  className="bg-white hover:bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm flex justify-between items-center cursor-pointer transition-colors select-none group"
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors leading-normal">{job.title}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      {job.type} • {job.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100/50">
                      View Job
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </main>

    </div>
  );
}
