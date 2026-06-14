import React, { useState } from "react";
import { ArrowLeft, Plus, FolderKanban, Trash2, Camera, HelpCircle } from "lucide-react";
import { Screen, Project } from "../types";
import { initialProjects } from "../data";

interface PortfolioBuilderProps {
  onTransition: (screen: Screen) => void;
  onBack: () => void;
}

export default function PortfolioBuilder({ onTransition, onBack }: PortfolioBuilderProps) {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);

  // New form states
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTags, setNewTags] = useState("");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const sampleImages = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYlq80gXonlqy1GHLCu9t8vrg0BxPZSYvZBdDnEUBAiiIXFCvrntteLTsgd9c-ukXm7cxK87O1liPQ-E_53d9SjjzYc57sYitQXzmlfIc72hNK2P8UeNTUJfWOJXuTu5fIB6A_wFcayF50x0qmUhR2VVc4eWtUYGTeuMVyTooXlILJAISu2Ap1p8vjgBErR6IwyJ3Rcy1KTUF55oCC_VF4griDecoNI2hsvXRPecrGqdxEK0_BO32VzFTb4oRjmkEjDcA4zcJAIo8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXMbs9VvJkL1iRsbUHesvw38SsRcZ7QJeLfLgVKOHpegetR8jIQxArvqDdaWd21dIq0eNGIwf9PGHY7-VDR9ThE4pWI-4LGNsNsWeOykojNMVQDEzudLlkiYfwglZQHnX3M234RyNXjxG22skWhSdeZuTjNLthuL3ZB4AnetRMNlKfGWAj6MLL5WvEpFwEUh8uQEf3IysMez0OzJ9pEBUk5dyhIpVf_qW4QQVYSSE4nqc-zc_cTtLVeZlnkRvjOyJx0hFfyZhhgBg"
    ];

    const modelProj: Project = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || "Dynamic interactive feature module.",
      imageUrl: sampleImages[projectsList.length % sampleImages.length],
      tags: newTags.split(",").map(t => t.trim()).filter(Boolean)
    };

    setProjectsList(prev => [...prev, modelProj]);

    // reset fields
    setNewTitle("");
    setNewDesc("");
    setNewTags("");
    setShowAddForm(false);
    alert("New custom portfolio project added successfully!");
  };

  const handleDeleteProject = (id: string) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8ff] text-[#131b2e] pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3c6d7]/15 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="text-[#434655] hover:text-[#004ac6] p-2 hover:bg-slate-50 rounded-full transition-all"
            aria-label="Back to profile settings"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-base text-[#131b2e]">Portfolio Builder</h1>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#004ac6] hover:bg-[#2170e4] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[700px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Helper Banner */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 select-none">
          <HelpCircle className="w-5 h-5 text-[#004ac6] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-[#004ac6]">Portfolio Matching Rules</h4>
            <p className="text-[11px] leading-relaxed text-[#434655] mt-0.5">
              Highlight projects with precise tool references. These tags are automatically re-indexed by recruiters searching candidate listings.
            </p>
          </div>
        </section>

        {/* Dynamic add form popup box card */}
        {showAddForm && (
          <form onSubmit={handleCreateProject} className="bg-white rounded-2xl border border-blue-200 p-5 shadow-md flex flex-col gap-4 text-left animate-fade-in-up">
            <h3 className="text-xs font-extrabold text-[#004ac6] uppercase tracking-wider">New Portfolio Item</h3>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#434655] uppercase">Project Title</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="E.g. FinTech Overhaul"
                className="bg-[#faf8ff] border border-[#c3c6d7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#004ac6]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#434655] uppercase">Description Brief</label>
              <textarea 
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Briefly state outcomes and user achievements..."
                className="bg-[#faf8ff] border border-[#c3c6d7] rounded-lg p-3 text-xs focus:outline-none focus:border-[#004ac6] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#434655] uppercase">Tags (comma separated)</label>
              <input 
                type="text" 
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="TypeScript, UX Design, Recharts"
                className="bg-[#faf8ff] border border-[#c3c6d7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#004ac6]"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-slate-500 font-bold hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#004ac6] text-white font-bold text-xs px-5 py-2 rounded-lg hover:shadow-sm"
              >
                Save Project
              </button>
            </div>
          </form>
        )}

        {/* List of projects cards details */}
        <section className="flex flex-col gap-5">
          {projectsList.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#c3c6d7]/20 shadow-sm relative group flex flex-col sm:flex-row text-left"
            >
              
              {/* Thumbnail representation */}
              <div className="sm:w-44 h-40 bg-slate-100 relative overflow-hidden shrink-0">
                <img 
                  src={proj.imageUrl} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contents block panel */}
              <div className="flex-grow p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-sm font-extrabold text-[#111827] group-hover:text-[#004ac6] transition-colors">
                      {proj.title}
                    </h3>
                    <button 
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-[#737686]/65 hover:text-[#ba1a1a] p-1 rounded-md transition-colors"
                      aria-label="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Subtag displays */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="bg-slate-50 text-[#737686] text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-150">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </section>

      </main>

    </div>
  );
}
