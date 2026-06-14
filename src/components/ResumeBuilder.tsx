import React, { useState } from "react";
import { FileText, Plus, User, HelpCircle, Briefcase, PlusCircle, Trash2, Eye, ExternalLink, X, ArrowLeft } from "lucide-react";
import { Screen, UserProfile, WorkExperience, Project } from "../types";
import { initialUserProfile, initialWorkExperiences, initialProjects } from "../data";

interface ResumeBuilderProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onTransition: (screen: Screen) => void;
  onBack: () => void;
}

export default function ResumeBuilder({ userProfile, setUserProfile, onTransition, onBack }: ResumeBuilderProps) {
  // Local state managers
  const [experiences, setExperiences] = useState<WorkExperience[]>(initialWorkExperiences);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentSkillInput, setCurrentSkillInput] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Experience handlers
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: "New Position Title",
      company: "Company Name",
      duration: "2024 - Present"
    };
    setExperiences(prev => [...prev, newExp]);
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperience, val: string) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: val } : exp));
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  // Skill handler
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkillInput.trim()) return;
    if (userProfile.skills.includes(currentSkillInput.trim())) {
      setCurrentSkillInput("");
      return;
    }
    setUserProfile(prev => ({
      ...prev,
      skills: [...prev.skills, currentSkillInput.trim()]
    }));
    setCurrentSkillInput("");
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToDelete)
    }));
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800 pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 neo-shadow">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition-all mr-1 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <FileText className="w-5 h-5 text-indigo-600" />
          <h1 onClick={() => onTransition(Screen.HOME)} className="font-extrabold text-base text-slate-800 cursor-pointer">
            Resume / CV Builder
          </h1>
        </div>
        <button 
          onClick={() => setShowPreviewModal(true)}
          className="vibrant-gradient-1 text-white hover:opacity-95 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Preview CV</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[800px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Helper Banner */}
        <section className="bg-indigo-50/70 border border-indigo-100/60 rounded-2xl p-4 flex gap-3 select-none">
          <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-indigo-700">CV Optimizer Guideline</h4>
            <p className="text-[11px] leading-relaxed text-slate-600 mt-0.5">
              Fill out your experiences details below. Changes here will immediately sync across your job application matching scores.
            </p>
          </div>
        </section>

        {/* Section 1: Personal Details */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xs font-extrabold text-slate-800">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={userProfile.name}
                onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3-5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all text-slate-800"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headline / Role</label>
              <input 
                type="text" 
                value={userProfile.headline}
                onChange={(e) => setUserProfile(prev => ({ ...prev, headline: e.target.value }))}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3-5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3-5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <input 
                type="text" 
                value={userProfile.phone}
                onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3-5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all text-slate-800"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Work Experience */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xs font-extrabold text-slate-800">Work Experience</h3>
            </div>
            <button 
              onClick={handleAddExperience}
              className="text-indigo-600 text-xs font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Add Item
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative p-5 bg-slate-50/70 border border-slate-100 rounded-2xl group">
                <button 
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                  aria-label="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">Role Title</label>
                    <input 
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(exp.id, "role", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">Company</label>
                    <input 
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">Duration</label>
                    <input 
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleUpdateExperience(exp.id, "duration", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Technical Skills */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow flex flex-col gap-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold text-slate-800">Core Technical Skills</h3>
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input 
              type="text" 
              value={currentSkillInput}
              onChange={(e) => setCurrentSkillInput(e.target.value)}
              placeholder="E.g. React Native, Docker, GraphQL"
              className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white text-slate-800 font-medium"
            />
            <button 
              type="submit"
              className="vibrant-gradient-1 text-white hover:opacity-95 text-xs font-extrabold px-5 rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Interactive display chips */}
          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {userProfile.skills.map((skill) => (
              <span 
                key={skill}
                className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-100/50 shadow-sm transition-all"
              >
                <span>{skill}</span>
                <button 
                  onClick={() => handleDeleteSkill(skill)}
                  className="hover:text-rose-500 cursor-pointer"
                  aria-label={`Remove skill ${skill}`}
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            ))}
          </div>
        </section>

      </main>

      {/* Premium Minimal Swiss PDF Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 text-indigo-600">
                <FileText className="w-5 h-5" />
                <h3 className="text-xs font-extrabold text-slate-800">Minimalist Swiss CV Preview</h3>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Layout Content Pane */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50 align-middle">
              
              {/* Simulated Sheet of Paper */}
              <div className="bg-white w-full shadow-lg border border-slate-200/50 p-10 max-w-xl mx-auto flex flex-col font-sans text-left text-slate-800 leading-normal gap-8">
                
                {/* Visual Letterhead */}
                <header className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-850 tracking-tight">{userProfile.name}</h2>
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mt-1">{userProfile.headline}</p>
                  </div>
                  <div className="text-right text-[10px] font-semibold text-slate-500 space-y-0.5">
                    <p>{userProfile.email}</p>
                    <p>{userProfile.phone}</p>
                    <p>San Francisco, CA</p>
                  </div>
                </header>

                {/* Profile Summary statement */}
                <section>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2">Professional Summary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                    {userProfile.summary}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Experiences list on Left (7 cols) */}
                  <div className="md:col-span-8 flex flex-col gap-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
                      Professional Experience
                    </h3>
                    
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between text-xs font-bold text-slate-900">
                            <span>{exp.role}</span>
                            <span className="text-[10px] text-slate-500">{exp.duration}</span>
                          </div>
                          <p className="text-[10px] text-indigo-600 font-bold mt-0.5">{exp.company}</p>
                          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                            Contributed to full client product lifecycles, wireframing dashboards, and integrating user-focused interactive layouts.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills lists on Right (4 cols) */}
                  <div className="md:col-span-4 flex flex-col gap-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
                      Core Expertise
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {userProfile.skills.map((skill) => (
                        <span key={skill} className="bg-slate-105 text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Controls footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Simulated PDF Document downloaded successfully.");
                  setShowPreviewModal(false);
                }}
                className="vibrant-gradient-1 shadow-md hover:opacity-95 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
