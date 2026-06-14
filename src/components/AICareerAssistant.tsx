import React, { useState } from "react";
import { Bot, Send, Sparkles, AlertCircle, PlusCircle, CheckCircle, BrainCircuit, RotateCcw, Lightbulb, Compass, ArrowRight, MessagesSquare, Check, ArrowLeft } from "lucide-react";
import { Screen, ChatMessage, UserProfile } from "../types";

interface AICareerAssistantProps {
  userProfile: UserProfile;
  onTransition: (screen: Screen) => void;
  onBack: () => void;
}

export default function AICareerAssistant({ userProfile, onTransition, onBack }: AICareerAssistantProps) {
  // Flip card active state
  const [isFlipped, setIsFlipped] = useState(false);

  // Live Chat Simulator state
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: `Based on your recent profile analysis, I noticed your portfolio highlights solid Frontend design skills but lacks specific charting or data visualization libraries like D3.js or Recharts.`
    },
    {
      id: "msg-2",
      sender: "bot",
      text: "Recommendation: Consider adding a quick charting project highlighting D3.js/Recharts to showcase your dynamic analytical dashboard capabilities before next week.",
      isRecommendation: true,
      recommendationTitle: "D3.js / Recharts Project integration"
    },
    {
      id: "msg-3",
      sender: "user",
      text: "Can you generate a quick practice question for React performance optimization?"
    },
    {
      id: "msg-4",
      sender: "bot",
      text: "Sure! Explain standard React rendering memoization triggers. When would you opt for React.useMemo() or useCallback() over Standard Component state dividers? Provide key code samples."
    }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userInput
    };

    setChatLog(prev => [...prev, userMsg]);
    setUserInput("");

    // Simulate smart bot response
    setTimeout(() => {
      const botsReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `Excelent inquiry! To optimize your skill matching, I recommend integrating this experience directly under your Resume builder. Would you like me to map out a structural pathway timeline?`
      };
      setChatLog(prev => [...prev, botsReply]);
    }, 1000);
  };

  const handleNewChat = () => {
    setChatLog([
      {
        id: `bot-new-${Date.now()}`,
        sender: "bot",
        text: `Hi ${userProfile.name.split(" ")[0]}! I've loaded your career diagnostics. Ask me anything about Resume optimization, technical prep, or regional job matching.`
      }
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8ff] text-[#131b2e] pb-[100px] md:pb-12 flex flex-col font-sans select-none">
      
      {/* Header element */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3c6d7]/15 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="text-[#434655] hover:text-[#004ac6] p-2 hover:bg-slate-50 rounded-full transition-all mr-1 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Bot className="w-6 h-6 text-[#004ac6] stroke-[2]" />
          <h1 onClick={() => onTransition(Screen.HOME)} className="font-extrabold text-base text-[#131b2e] cursor-pointer">
            JobFinder AI Link
          </h1>
        </div>
        <button 
          onClick={() => onTransition(Screen.ACTIVITY)}
          className="text-[#004ac6] p-2 hover:bg-[#eaedff]/30 rounded-full transition-all relative"
        >
          <svg className="w-6 h-6 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 11-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 bg-[#ba1a1a] h-2 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Main Container Stage */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Title / Diagnostic Header Section */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#004ac6]">
            <Sparkles className="w-5 h-5 text-[#004ac6] fill-[#004ac6]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">AI Career Assistant</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#131b2e] leading-snug tracking-tight">
            Your professional trajectory,<br/>optimized.
          </h2>
          <p className="text-xs text-[#434655] leading-relaxed max-w-xl">
            I&apos;ve analyzed your profile and current market trends. Here are personalized insights to accelerate your job search.
          </p>
        </section>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Main Co-Pilot Chat simulation (Spans 8 cols on desktop) */}
          <div className="col-span-1 md:col-span-8 flex flex-col bg-white border border-[#c3c6d7]/35 rounded-2xl shadow-sm overflow-hidden min-h-[460px] relative">
            
            {/* Soft decorative background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#dbe1ff]/15 via-white to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col h-full p-5 flex-grow">
              
              {/* Box header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 text-[#004ac6] rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
                    <Bot className="w-4 h-4 text-[#004ac6]" />
                  </div>
                  <h3 className="text-xs font-extrabold text-[#131b2e]">Career Co-Pilot</h3>
                </div>
                <button 
                  onClick={handleNewChat}
                  className="bg-blue-50 hover:bg-[#dbe1ff] text-[#004ac6] rounded-full px-3.5 py-1.5 text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
                >
                  <MessagesSquare className="w-3.5 h-3.5" />
                  <span>New Chat</span>
                </button>
              </div>

              {/* Chat Log simulated messages scroll track */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 mb-4 max-h-[300px] hscroll-container">
                {chatLog.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 items-start max-w-[85%] ${
                      msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 bg-[#eaedff] text-[#004ac6] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {msg.isRecommendation ? (
                      /* Highlight design recommendation block */
                      <div className="bg-[#d4e3ff] text-[#001c39] rounded-2xl rounded-tl-none p-4 border border-[#a4c9ff] shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-bold flex items-center gap-1 text-[#004ac6]">
                          <Lightbulb className="w-4 h-4 fill-[#004ac6] text-white" />
                          <span>AI Recommendation</span>
                        </p>
                        <p className="text-xs leading-relaxed opacity-95">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      /* Standard bubble text formatting */
                      <div className={`p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#004ac6] text-white rounded-tr-none"
                          : "bg-[#faf8ff] text-[#131b2e] rounded-tl-none border border-slate-100"
                      }`}>
                        <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive footer chat typing panel */}
              <form onSubmit={handleSendChatMessage} className="mt-auto relative z-10 flex gap-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask about jobs, skills, or interview prep..."
                  className="flex-grow bg-[#faf8ff] border border-[#c3c6d7] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#004ac6] focus:ring-4 focus:ring-[#004ac6]/10 transition-all font-semibold outline-none"
                />
                <button 
                  type="submit"
                  className="w-12 h-12 flex items-center justify-center bg-[#004ac6] hover:bg-[#2170e4] text-white rounded-xl shadow-sm transition-transform active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

          {/* Market Fit Diagnostic indicator dial (4 cols on desktop) */}
          <div className="col-span-1 md:col-span-4 bg-white border border-[#c3c6d7]/35 rounded-2xl shadow-sm p-5 flex flex-col items-center justify-between min-h-[300px]">
            <div className="w-full flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Compass className="w-5 h-5 text-[#2170e4]" />
              <h3 className="text-xs font-extrabold text-[#131b2e]">Market Fit Diagnostic</h3>
            </div>

            {/* Circular matchmaking rate dial screen */}
            <div className="flex-grow flex flex-col items-center justify-center py-4 relative">
              <div className="w-28 h-28 rounded-full border-8 border-[#eaedff] flex items-center justify-center relative">
                
                {/* Simulated dynamic matching percentage dial layout border arc */}
                <div className="absolute inset-[-8px] rounded-full border-8 border-[#004ac6] border-t-transparent border-l-transparent transform rotate-45"></div>
                
                <div className="text-center">
                  <span className="text-2xl font-extrabold text-[#004ac6] block">82%</span>
                  <span className="text-[10px] font-bold text-[#737686] tracking-tight uppercase">Strength Rate</span>
                </div>
              </div>
              <p className="text-[11px] text-[#434655] font-semibold text-center mt-4 max-w-[200px] leading-relaxed">
                Your credentials strongly align with <strong className="text-[#004ac6]">Senior UX/UI</strong> roles listed this week.
              </p>
            </div>

            <button 
              onClick={() => onTransition(Screen.SEARCH)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#004ac6] text-xs font-bold rounded-lg transition-colors border border-[#c3c6d7]/20"
            >
              View Matching Jobs
            </button>
          </div>

          {/* Resume Suggestion List Actions (4 cols on desktop) */}
          <div className="col-span-1 md:col-span-4 bg-white border border-[#c3c6d7]/35 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#196fc0]" />
                <h3 className="text-xs font-extrabold text-[#131b2e]">Resume Optimization</h3>
              </div>
              <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200/50">
                2 Actions
              </span>
            </div>

            <ul className="flex flex-col gap-3 flex-grow justify-start">
              <li className="bg-slate-50 border border-slate-100 rounded-lg p-3 hover:border-blue-100 transition-all flex gap-3 items-start select-none">
                <PlusCircle className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-extrabold text-[#131b2e]">Add &apos;React Native&apos;</p>
                  <p className="text-[10px] leading-relaxed text-[#737686] mt-0.5">
                    Found in 60% of matching design developer templates.
                  </p>
                </div>
              </li>
              <li className="bg-slate-50 border border-slate-100 rounded-lg p-3 hover:border-blue-100 transition-all flex gap-3 items-start select-none">
                <CheckCircle className="w-4 h-4 text-[#196fc0] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-extrabold text-[#131b2e]">Quantify Metrics</p>
                  <p className="text-[10px] leading-relaxed text-[#737686] mt-0.5">
                    Rewrite &ldquo;Optimized loading speeds&rdquo; with detailed percentage metrics.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Interview Flip Deck Flashcard (8 cols on desktop) */}
          <div className="col-span-1 md:col-span-8 bg-white border border-[#c3c6d7]/35 rounded-2xl shadow-sm p-5 flex flex-col relative overflow-hidden min-h-[220px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#dbe1ff]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4 relative z-10 select-none">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#004ac6]" />
                <h3 className="text-xs font-extrabold text-[#131b2e]">Interview Prep Deck</h3>
              </div>
              <span className="text-[10px] font-bold text-[#737686] bg-slate-100 px-3 py-1 rounded-full uppercase">
                {isFlipped ? "Answer Card Active" : "Click to Reveal Key Talking Points"}
              </span>
            </div>

            {/* Premium Flipping Flashcard Wrapper */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-grow flex items-center justify-center cursor-pointer select-none group min-h-[140px] relative z-10"
            >
              <div className="w-full max-w-lg h-full relative perspective-[1000px]">
                
                {/* 3D transformation dynamic card body */}
                <div 
                  className={`w-full h-full min-h-[120px] rounded-xl border border-slate-150 p-4 transition-all duration-300 shadow-sm flex flex-col items-center justify-center text-center ${
                    isFlipped 
                      ? "bg-[#dbe1ff] text-[#00174b] border-[#a4c9ff]" 
                      : "bg-slate-50 text-[#131b2e] hover:bg-slate-100/75"
                  }`}
                >
                  {!isFlipped ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-extrabold text-[#004ac6] uppercase tracking-widest mb-1">
                        System Design Case
                      </span>
                      <p className="text-sm font-extrabold max-w-sm leading-snug">
                        &quot;How would you design a rate limiter for a public API?&quot;
                      </p>
                    </div>
                  ) : (
                    <div className="text-left w-full h-full flex flex-col justify-center animate-fade-in px-4">
                      <p className="text-[10px] font-extrabold text-[#004ac6] uppercase mb-1">
                        Essential Talking Points:
                      </p>
                      <ul className="text-xs space-y-1 font-semibold text-[#001a42]">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#004ac6] stroke-[3]" />
                          <span>Token Bucket vs Leaky Bucket algorithm trade-offs.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#004ac6] stroke-[3]" />
                          <span>Distributed backend storage cache check using Redis.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#004ac6] stroke-[3]" />
                          <span>Setting descriptive Header limits (X-RateLimit-Remaining).</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Career Pathways (Full 12 cols width) */}
          <div className="col-span-1 md:col-span-12 bg-white border border-[#c3c6d7]/35 rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Compass className="w-5 h-5 text-[#004ac6]" />
              <h3 className="text-xs font-extrabold text-[#131b2e]">AI Career Pathways</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
              
              {/* Path 1 */}
              <div 
                onClick={() => alert("Pathway Details: High-level architectural roadmap compiled in Co-Pilot.")}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2.5 hover:bg-slate-100/75 transition-all text-left cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-extrabold text-[#111827] group-hover:text-[#004ac6] transition-all">
                    Frontend Lead
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#737686] group-hover:translate-x-1 group-hover:text-[#004ac6] transition-transform" />
                </div>
                <p className="text-xs text-[#737686] leading-relaxed">
                  Leverage your Figma skills and dynamic React components knowledge into visual core design leadership.
                </p>
                <div className="flex gap-2 mt-auto pt-2">
                  <span className="bg-[#eaedff] text-[#004ac6] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    High Match
                  </span>
                  <span className="text-[10px] font-bold text-[#737686] px-2 py-0.5">
                    Est. 1-2 Years
                  </span>
                </div>
              </div>

              {/* Path 2 */}
              <div 
                onClick={() => alert("Pathway Details: Full-system full stack roadmap opened.")}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2.5 hover:bg-slate-100/75 transition-all text-left cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-extrabold text-[#111827] group-hover:text-[#004ac6] transition-all">
                    Full Stack Engineer
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#737686] group-hover:translate-x-1 group-hover:text-[#004ac6] transition-transform" />
                </div>
                <p className="text-xs text-[#737686] leading-relaxed">
                  Combine backend SQL and RESTful routing tools to deliver structural end-to-end user widgets.
                </p>
                <div className="flex gap-2 mt-auto pt-2">
                  <span className="bg-[#ebf1ff] text-[#196fc0] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Skill Gap Identified
                  </span>
                </div>
              </div>

              {/* Path 3 */}
              <div 
                onClick={() => alert("Pathway Details: Alternative UX design mapping.")}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2.5 hover:bg-slate-100/75 transition-all text-left cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-extrabold text-[#111827] group-hover:text-[#004ac6] transition-all">
                    UX Engineer
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#737686] group-hover:translate-x-1 group-hover:text-[#004ac6] transition-transform" />
                </div>
                <p className="text-xs text-[#737686] leading-relaxed">
                  Maximize your visual design and mockup prototyping skills alongside frontend micro-interactions.
                </p>
                <div className="flex gap-2 mt-auto pt-2">
                  <span className="bg-slate-100 text-[#737686] text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                    Alternative Path
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
