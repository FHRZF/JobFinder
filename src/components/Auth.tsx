import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, ShieldCheck, Sparkles, LogIn, KeyRound } from "lucide-react";
import { Screen, UserProfile } from "../types";

interface AuthProps {
  onLoginSuccess: (userRole: string, fullName: string) => void;
  onTransition: (screen: Screen) => void;
  initialView?: "login" | "register";
}

export default function Auth({ onLoginSuccess, onTransition, initialView = "login" }: AuthProps) {
  const [view, setView] = useState<"login" | "register">(initialView);
  const [role, setRole] = useState<string>("Student");
  
  // Login input states
  const [email, setEmail] = useState("alex.mercer@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Register input states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please fill in email details.");
      return;
    }
    // Simulate successful login
    onLoginSuccess(role, "Alex Mercer");
    onTransition(Screen.HOME);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setErrorMsg("Kindly complete all requested form inputs.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Password entries do not match.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role, regName);
      onTransition(Screen.HOME);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#faf8ff] font-sans antialiased text-[#131b2e]">
      
      {/* Left Panel: Brand Imagery (Hidden on Mobile, perfect for desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center bg-slate-100">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFTscivbrllFfnhu755sMLKmZtqRku9XK5nNNqhV6QVdEzbukYz_Gt28TCw5hokiOlaUx4bVQ1IiaP4p9iJOw7rZHztEThmrVUbQuKOLFda4wgQddxe_G7OjhGbbwy1qtE-tIgYW-2vMDKEbKd7gRuyc1BddkMb36Od0A57sx6q8h-RvGJJHj01sO3flsoPIe96wWJa3axIlgtIDB9aFMyIWfTnD0XNhP4GsyOnr6e-LCu-5lv2FH5BoIBvH8uAvwHMkBWZKhJf0A')" 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-850/90 via-indigo-600/40 to-transparent mix-blend-multiply"></div>
        </div>
        
        {/* Floating Elements for Depth */}
        <div className="relative z-10 p-12 text-[#ffffff] max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white fill-white animate-pulse" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">JobFinder</span>
          </div>
          
          <h1 className="text-4xl font-extrabold mb-4 text-[#ffffff] leading-tight flex flex-col gap-1">
            <span>Accelerate Your</span>
            <span>Career Trajectory.</span>
          </h1>
          <p className="text-lg text-indigo-50 opacity-95 leading-relaxed">
            Join our AI-first career platform designed to match you with opportunities that align perfectly with your skills and ambitions.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI-Powered Matching</h3>
                <p className="text-xs text-indigo-100 font-medium">Smart recommendations tailored to your profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Content Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative bg-[#F8FAFC]">
        
        {/* Mobile Logo Header */}
        <div className="lg:hidden absolute top-8 left-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg vibrant-gradient-1 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-lg font-bold text-indigo-600">JobFinder</span>
        </div>

        <div className="w-full max-w-[420px] mt-12 lg:mt-0">
          
          {view === "login" ? (
            /* Login view */
            <div className="animate-fade-in-up">
              <div className="mb-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-3 border border-indigo-100 neo-shadow">
                  <LogIn className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Welcome Back</h2>
                <p className="text-sm text-slate-400 font-medium">Log in to your JobFinder account</p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                  <div className="relative flex items-center">
                    <Mail className="w-5 h-5 absolute left-4 text-slate-400" />
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.mercer@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="w-5 h-5 absolute left-4 text-slate-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-12 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="w-4 h-4 rounded text-indigo-600 border-slate-200 focus:ring-indigo-500/20 transition-all cursor-pointer"
                    />
                    <span className="text-slate-400">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => alert("Simulated password reset instructions emailed.")}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Trigger Submit */}
                <button 
                  type="submit"
                  className="w-full vibrant-gradient-1 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Grid Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-slate-200/60 flex-1"></div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Or</span>
                <div className="h-[1px] bg-slate-200/60 flex-1"></div>
              </div>

              {/* Social login integration */}
              <div className="flex flex-col gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    onLoginSuccess("Professional", "Google Alex");
                    onTransition(Screen.HOME);
                  }}
                  className="w-full border border-slate-200 bg-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-250 cursor-pointer shadow-sm"
                >
                  <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  <span className="text-slate-700">Continue with Google</span>
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    onLoginSuccess("Professional", "LinkedIn Alex");
                    onTransition(Screen.HOME);
                  }}
                  className="w-full border border-slate-200 bg-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-250 cursor-pointer shadow-sm"
                >
                  <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" fill="#0077B5"></path>
                    <path d="M7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.56c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29z" fill="#fff"></path>
                  </svg>
                  <span className="text-slate-700">Continue with LinkedIn</span>
                </button>
              </div>

              {/* Navigation toggle link */}
              <div className="text-center mt-8">
                <p className="text-sm text-slate-400 font-semibold">
                  New here?{" "}
                  <button 
                    onClick={() => { setView("register"); setErrorMsg(""); }}
                    className="font-bold text-indigo-600 hover:underline hover:text-indigo-700 ml-1 cursor-pointer"
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Register view */
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Create Your Account</h2>
                <p className="text-sm text-slate-400 font-medium">Enter your details to get started on your professional journey.</p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Segmented control for role selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">I am a</label>
                  <div className="flex p-1 bg-slate-100/60 rounded-xl border border-slate-200/50" role="group">
                    {["Student", "Fresh Graduate", "Professional"].map((roleOption) => (
                      <button
                        key={roleOption}
                        type="button"
                        onClick={() => setRole(roleOption)}
                        className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          role === roleOption 
                            ? "bg-white text-indigo-600 shadow-sm font-extrabold" 
                            : "text-slate-500 hover:bg-slate-200/50"
                        }`}
                      >
                        {roleOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="regName" className="text-xs font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="w-5 h-5 absolute left-3.5 text-slate-400" />
                    <input 
                      type="text"
                      id="regName"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="regEmail" className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="w-5 h-5 absolute left-3.5 text-slate-400" />
                    <input 
                      type="email"
                      id="regEmail"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="regPassword" className="text-xs font-bold text-slate-400 uppercase tracking-wide">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="w-5 h-5 absolute left-3.5 text-slate-400" />
                    <input 
                      type="password"
                      id="regPassword"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="regConfirmPassword" className="text-xs font-bold text-slate-400 uppercase tracking-wide">Confirm Password</label>
                  <div className="relative flex items-center">
                    <KeyRound className="w-5 h-5 absolute left-3.5 text-slate-400" />
                    <input 
                      type="password"
                      id="regConfirmPassword"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full vibrant-gradient-1 text-white font-extrabold py-3.5 rounded-xl shadow-md hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-85 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderSpin />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Navigation toggle link */}
              <div className="text-center mt-6">
                <p className="text-sm text-slate-400 font-semibold">
                  Already have an account?{" "}
                  <button 
                    onClick={() => { setView("login"); setErrorMsg(""); }}
                    className="font-bold text-indigo-600 hover:underline ml-1 cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Agree Footer terms */}
          <p className="mt-8 text-center text-[11px] text-slate-400 font-medium">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-indigo-600">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  );
}

// Inline Spinner loader
function LoaderSpin() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
