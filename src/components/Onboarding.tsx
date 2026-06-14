import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Screen } from "../types";

interface OnboardingProps {
  onTransition: (screen: Screen) => void;
}

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    title: "Discover jobs that match your skills.",
    subtitle: "AI-powered recommendations customized to your unique developer capabilities, experience, and timeline.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQfN4_fG60EX_Oa4a8rS5YoGS1qsae_igjRrykyME909PWTEoQXw_nZTr2WGlvfU2Qy-s6ASQOfyMaeSZKVxO1L_cdslEmbuuyDXe_kaqtUnz5gxsIFY5Kkz3F37E_VAlMDz6Siyi8W8pcvvN5zZxdC6VsZ2hxFrXFS4MDABQcdknfjyfwTE8k3WfpRTpnKDSgjfboVPrrBxIT-RByoTbljr6S14-DiF4w2aaTM1YA6FVrz2GwaHAawOvaoaRChHWwZcwpcd10nww",
    alt: "Job search illustration"
  },
  {
    title: "Create a professional resume in minutes.",
    subtitle: "Step-by-step assistant helps build clean documents, showing your structural projects and skills dynamically.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC58n7OVSfaa9fnS-WWwBfXgb3Utl443I_Sx0U4cUxq_TGVAVVIEP0ldDv6GgsC0osjawpaampzg3ThXPwE8K5gbfZPJv4h57MJGPOivml_pVhWrtsObllUwskJwbfZzVfNHYrlt_BAEFbcFk7Yz3061txWGo1d4kg5h0anPiMMpcUUCdCLt4Adr6WnEF_njDthV8LVedPVHd7pqmpOkjER6RRYEf4tSL7glWiu-fGTgXHLpRlJuFdGyMiwbdhU2xy3vyKkdbXn_VQ",
    alt: "Resume creation illustration"
  },
  {
    title: "Track all your applications in one place.",
    subtitle: "Complete control of your pipeline with real-time status notifications, interview preparations, and direct company links.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa5m7AzQfEWXxYel05NpfSLq7g_EPjx6R9cTAc5U9oihP22qBUhkTS-paja-B-rQId14lBYAXXGcrGaRBQIJvb4oi7_31xDIAxk6UXeGLITLkSOGWJC49mfO29ciOAanmO_jr5ExJRf4xdEbjFIiVgKHoQdBTXXb60RLyXv4KyQynU2oLCiC3zLBxnAhLkCOj1nOG-VWcfQCFZBvDiPSwZBcoXHv4RQ8Am6e45FoJ-LbkbA-EAWE0qikJalX82ImUFN9DegIXXuRw",
    alt: "Application tracking illustration"
  }
];

export default function Onboarding({ onTransition }: OnboardingProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    if (activeIdx < slides.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      onTransition(Screen.LOGIN);
    }
  };

  const handleSkip = () => {
    onTransition(Screen.LOGIN);
  };

  const currentSlide = slides[activeIdx];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100/50 p-4">
      {/* Mobile Device Frame Container */}
      <main className="w-full max-w-md h-[812px] bg-white rounded-[2.5rem] relative overflow-hidden flex flex-col neo-shadow border-[8px] border-slate-100">
        
        {/* Top Header: Skip Button */}
        <header className="absolute top-0 w-full z-20 flex justify-end px-6 pt-6 pb-2">
          {activeIdx < slides.length - 1 ? (
            <button 
              onClick={handleSkip}
              className="text-sm font-extrabold text-slate-400 hover:text-indigo-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              Skip
            </button>
          ) : (
            <div className="h-9 w-10"></div>
          )}
        </header>

        {/* Slide Content Dynamic Area */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-6 pt-12 pb-32">
          
          {/* Card Wrapper with Image */}
          <div className="w-full aspect-square max-w-[280px] rounded-[2rem] overflow-hidden mb-8 relative neo-shadow bg-slate-50/50 flex items-center justify-center p-5 border border-slate-100">
            <img 
              src={currentSlide.image} 
              alt={currentSlide.alt} 
              className="w-full h-full object-contain relative z-10 transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Typography Details */}
          <div className="text-center max-w-[320px] px-2">
            <h2 className="text-xl font-extrabold text-slate-800 leading-snug mb-3 tracking-tight">
              {currentSlide.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom Static Action Dock */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8 px-6 z-20 flex flex-col items-center gap-6">
          
          {/* Progress Dots Carousel Track */}
          <div className="flex gap-2 items-center justify-center">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                  idx === activeIdx ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Primary Action Trigger */}
          <button 
            onClick={handleNext}
            className="w-full h-12 rounded-2xl vibrant-gradient-1 text-[#ffffff] text-sm font-extrabold shadow-md hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{activeIdx === slides.length - 1 ? "Get Started" : "Next"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>
    </div>
  );
}
