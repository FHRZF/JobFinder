import React, { useState } from "react";
import { ArrowLeft, User, UploadCloud, CheckCircle, FileText, Sparkles, Building2, Terminal } from "lucide-react";
import { Screen, Job } from "../types";

interface ApplicationFormProps {
  job: Job | null;
  onTransition: (screen: Screen) => void;
  onBack: () => void;
  onAddPipeline: (jobTitle: string, companyName: string, location: string) => void;
}

export default function ApplicationForm({ job, onTransition, onBack, onAddPipeline }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("Alex Mercer");
  const [emailAddress, setEmailAddress] = useState("alex.mercer@example.com");
  const [coverLetterText, setCoverLetterText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDoneSubmit, setIsDoneSubmit] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-[#737686] font-semibold">
        No job selection loaded. Returning to Home.
      </div>
    );
  }

  // Handle drag-and-drop file upload simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  // Submit trigger
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Create a new pipeline tracking record
    onAddPipeline(job.title, job.companyName, job.location);
    setIsDoneSubmit(true);
  };

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
        <h1 className="font-extrabold text-base text-slate-800">Submit Application</h1>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[650px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Step progress breadcrumb indicator chips */}
        <section className="flex p-1 bg-indigo-50/70 rounded-xl border border-indigo-100/30 select-none">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`flex-1 py-2 text-center rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                step === currentStep 
                  ? "bg-white text-indigo-600 shadow-sm font-extrabold" 
                  : step < currentStep 
                    ? "text-emerald-600" 
                    : "text-slate-400"
              }`}
            >
              {step === 1 ? "1. Contact" : step === 2 ? "2. Uploads" : "3. Summary"}
            </div>
          ))}
        </section>

        {/* Dynamic step form bodies */}
        <form onSubmit={handleFormSubmission} className="bg-white rounded-3xl border border-slate-100 p-6 neo-shadow flex flex-col gap-5 text-left animate-fade-in">
          
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-2 select-none">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Applying for {job.title}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">{job.companyName} • {job.location}</p>
            </div>
          </div>

          {currentStep === 1 && (
            /* Step 1: Contact details details */
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Legal Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100/50 transition-all font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100/50 transition-all font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Covering Note (Optional)</label>
                <textarea 
                  rows={4}
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  placeholder="Tell the hiring team why you're a great fit..."
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100/50 transition-all font-semibold outline-none resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            /* Step 2: Upload Files/Resume */
            <div className="space-y-4 animate-fade-in-up">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Upload Resume Document</label>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragOver ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 hover:border-indigo-600 bg-slate-50"
                }`}
              >
                <input 
                  type="file" 
                  id="resume-file"
                  onChange={handleFileChange}
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="resume-file" className="block cursor-pointer">
                  <UploadCloud className="w-10 h-10 text-indigo-500 mx-auto mb-3 animate-pulse" />
                  <p className="text-xs font-extrabold text-slate-800">Drag & drop resume files here</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">PDF, DOCX up to 10MB</p>
                  <span className="inline-block mt-3 bg-white border border-slate-200/80 shadow-sm text-[10px] font-extrabold text-indigo-600 px-4 py-2 rounded-xl hover:bg-slate-50">
                    Browse Files
                  </span>
                </label>
              </div>

              {uploadedFileName && (
                <div className="flex items-center gap-3 p-3 bg-indigo-50/50 border border-indigo-100/40 rounded-2xl select-none animate-fade-in">
                  <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-slate-800 truncate">{uploadedFileName}</p>
                    <p className="text-[10px] text-emerald-600 font-extrabold mt-0.5">Resume file linked properly.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            /* Step 3: Summary reviews and confirmations checklist */
            <div className="space-y-4 animate-fade-in-up select-none">
              <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                Verify details before finalizing submission.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2.5 text-xs font-semibold border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Name:</span>
                  <span className="font-extrabold text-slate-800">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Email:</span>
                  <span className="font-extrabold text-slate-800">{emailAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Resume:</span>
                  <span className="font-extrabold text-indigo-600 truncate max-w-[200px]">{uploadedFileName || "alex_mercer_resume.pdf"}</span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                <input type="checkbox" required className="w-4 h-4 rounded text-indigo-600 border-slate-300 mt-0.5 cursor-pointer focus:ring-indigo-500" />
                <span className="text-[11px] text-slate-500 font-bold leading-relaxed">
                  I confirm that all provided credential information is true, accurate, and authorized for hiring checks.
                </span>
              </label>
            </div>
          )}

          {/* Footer form button bar */}
          <div className="flex justify-between items-center gap-4 mt-6 pt-4 border-t border-slate-100">
            {currentStep > 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-5 py-3 border border-slate-200 text-xs font-extrabold text-slate-500 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button 
              type="submit"
              className="vibrant-gradient-1 text-[#ffffff] font-extrabold px-6 py-3.5 rounded-2xl shadow-sm hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer"
            >
              {currentStep < 3 ? "Continue" : "Submit Application"}
            </button>
          </div>

        </form>

      </main>

      {/* Dynamic Success post-submit state overlay modal popup */}
      {isDoneSubmit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 flex flex-col items-center text-center gap-4">
            
            {/* Bounce animation check circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-800">Application Submitted!</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Your credentials have been safely forwarded to {job.companyName}&apos;s talent acquisition system. You can track this progress under your profile anytime.
              </p>
            </div>

            <button 
              onClick={() => {
                setIsDoneSubmit(false);
                onTransition(Screen.HOME);
              }}
              className="w-full vibrant-gradient-1 text-[#ffffff] font-extrabold py-3.5 rounded-2xl text-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              Back to Home Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
