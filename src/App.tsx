import React, { useState } from "react";
import { Briefcase, Search, Sparkles, FileText, User } from "lucide-react";
import { Screen, UserProfile, Job } from "./types";
import { initialUserProfile, initialJobs } from "./data";

// Components Imports
import Splash from "./components/Splash";
import Onboarding from "./components/Onboarding";
import Auth from "./components/Auth";
import HomeDashboard from "./components/HomeDashboard";
import JobSearch from "./components/JobSearch";
import AICareerAssistant from "./components/AICareerAssistant";
import ResumeBuilder from "./components/ResumeBuilder";
import ProfilePage from "./components/ProfilePage";
import JobDetail from "./components/JobDetail";
import CompanyProfile from "./components/CompanyProfile";
import ApplicationForm from "./components/ApplicationForm";
import PortfolioBuilder from "./components/PortfolioBuilder";
import ActivityPage from "./components/ActivityPage";

export default function App() {
  // Navigation Router State
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [screenHistory, setScreenHistory] = useState<Screen[]>([Screen.SPLASH]);

  // Dynamic Navigation Handlers
  const navigateTo = (screen: Screen) => {
    // If transitioning to a main tab, reset history to that tab to prevent infinite history loops
    const mainTabs = [Screen.HOME, Screen.SEARCH, Screen.APPS, Screen.RESUME, Screen.PROFILE];
    if (mainTabs.includes(screen)) {
      setScreenHistory([screen]);
    } else {
      setScreenHistory((prev) => [...prev, screen]);
    }
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remove current screen
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen(Screen.HOME);
    }
  };

  
  // App Global State Managers
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [jobsList, setJobsList] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("UI/UX Design");

  // Application pipeline submission integration
  const handleAddNewPipelineItem = (jobTitle: string, companyName: string, location: string) => {
    // Increase count stats or append custom notification metrics
    setUserProfile((prev) => ({
      ...prev,
      applicationsCount: prev.applicationsCount + 1
    }));
  };

  // Login handler
  const handleLoginSuccess = (userRole: string, fullName: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name: fullName || prev.name,
      role: userRole || prev.role
    }));
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentScreen(Screen.LOGIN);
    alert("Logged out of career dashboard.");
  };

  // Helper: check if bottom navigation should be visible on mobile
  const canShowBottomNav = [
    Screen.HOME,
    Screen.SEARCH,
    Screen.APPS,
    Screen.RESUME,
    Screen.PROFILE
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] selection:bg-[#6366F1]/15 font-sans relative antialiased flex flex-col justify-between">
      
      {/* Content Canvas Area */}
      <div className="flex-grow w-full">
        {currentScreen === Screen.SPLASH && (
          <Splash onTransition={navigateTo} />
        )}

        {currentScreen === Screen.ONBOARDING && (
          <Onboarding onTransition={navigateTo} />
        )}

        {currentScreen === Screen.LOGIN && (
          <Auth 
            initialView="login"
            onLoginSuccess={handleLoginSuccess}
            onTransition={navigateTo}
          />
        )}

        {currentScreen === Screen.REGISTER && (
          <Auth 
            initialView="register"
            onLoginSuccess={handleLoginSuccess}
            onTransition={navigateTo}
          />
        )}

        {currentScreen === Screen.HOME && (
          <HomeDashboard 
            userProfile={userProfile}
            jobs={jobsList}
            onTransition={navigateTo}
            onSelectJob={(job) => {
              setSelectedJob(job);
              navigateTo(Screen.JOB_DETAIL);
            }}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentScreen === Screen.SEARCH && (
          <JobSearch 
            userProfile={userProfile}
            jobs={jobsList}
            onTransition={navigateTo}
            onBack={navigateBack}
            onSelectJob={(job) => {
              setSelectedJob(job);
              navigateTo(Screen.JOB_DETAIL);
            }}
          />
        )}

        {currentScreen === Screen.APPS && (
          <AICareerAssistant 
            userProfile={userProfile}
            onTransition={navigateTo}
            onBack={navigateBack}
          />
        )}

        {currentScreen === Screen.RESUME && (
          <ResumeBuilder 
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onTransition={navigateTo}
            onBack={navigateBack}
          />
        )}

        {currentScreen === Screen.PROFILE && (
          <ProfilePage 
            userProfile={userProfile}
            onTransition={navigateTo}
            onBack={navigateBack}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === Screen.JOB_DETAIL && (
          <JobDetail 
            job={selectedJob}
            onTransition={navigateTo}
            onBack={navigateBack}
            onCompanySelect={() => navigateTo(Screen.COMPANY_PROFILE)}
          />
        )}

        {currentScreen === Screen.COMPANY_PROFILE && (
          <CompanyProfile 
            companyName={selectedJob?.companyName || "TechNova Solutions"}
            companyLogo={selectedJob?.companyLogo || ""}
            jobs={jobsList}
            onTransition={navigateTo}
            onBack={navigateBack}
            onSelectJob={(job) => {
              setSelectedJob(job);
              navigateTo(Screen.JOB_DETAIL);
            }}
          />
        )}

        {currentScreen === Screen.APPLICATION_FORM && (
          <ApplicationForm 
            job={selectedJob}
            onTransition={navigateTo}
            onBack={navigateBack}
            onAddPipeline={handleAddNewPipelineItem}
          />
        )}

        {currentScreen === Screen.PORTFOLIO_BUILDER && (
          <PortfolioBuilder onTransition={navigateTo} onBack={navigateBack} />
        )}

        {currentScreen === Screen.ACTIVITY && (
          <ActivityPage onTransition={navigateTo} onBack={navigateBack} />
        )}
      </div>

      {/* Persistent Bottom Mobile Navigation TabBar (Visible only post-authentication) */}
      {canShowBottomNav && (
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] h-16 bg-white/90 backdrop-blur-md border border-slate-100/80 neo-shadow rounded-2xl flex items-center justify-around px-4 z-50 select-none animate-fade-in">
          
          {/* Tab 1: Home */}
          <button 
            onClick={() => navigateTo(Screen.HOME)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all ${
              currentScreen === Screen.HOME ? "text-[#6366F1] scale-110" : "text-slate-400 hover:text-[#6366F1]"
            }`}
            aria-label="Home Dashboard tab"
          >
            <Briefcase className="w-5.5 h-5.5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">Home</span>
          </button>

          {/* Tab 2: Search */}
          <button 
            onClick={() => navigateTo(Screen.SEARCH)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all ${
              currentScreen === Screen.SEARCH ? "text-[#6366F1] scale-110" : "text-slate-400 hover:text-[#6366F1]"
            }`}
            aria-label="Search Jobs tab"
          >
            <Search className="w-5.5 h-5.5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">Search</span>
          </button>

          {/* Tab 3: Co-Pilot */}
          <button 
            onClick={() => navigateTo(Screen.APPS)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all ${
              currentScreen === Screen.APPS ? "text-[#6366F1] scale-110" : "text-slate-400 hover:text-[#6366F1]"
            }`}
            aria-label="AI Link Co-Pilot tab"
          >
            <Sparkles className="w-5.5 h-5.5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">Co-Pilot</span>
          </button>

          {/* Tab 4: Resume */}
          <button 
            onClick={() => navigateTo(Screen.RESUME)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all ${
              currentScreen === Screen.RESUME ? "text-[#6366F1] scale-110" : "text-slate-400 hover:text-[#6366F1]"
            }`}
            aria-label="Resume Builder tab"
          >
            <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">CV</span>
          </button>

          {/* Tab 5: Profile */}
          <button 
            onClick={() => navigateTo(Screen.PROFILE)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all ${
              currentScreen === Screen.PROFILE ? "text-[#6366F1] scale-110" : "text-slate-400 hover:text-[#6366F1]"
            }`}
            aria-label="Profile Settings tab"
          >
            <User className="w-5.5 h-5.5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">Profile</span>
          </button>

        </nav>
      )}

    </div>
  );
}
