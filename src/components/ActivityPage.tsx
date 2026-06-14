import React, { useState } from "react";
import { ArrowLeft, Bell, Check, Trash2, CalendarCheck, HelpCircle, AlertCircle, Sparkles, UserCheck } from "lucide-react";
import { Screen, NotificationItem } from "../types";
import { initialNotifications } from "../data";

interface ActivityPageProps {
  onTransition: (screen: Screen) => void;
  onBack: () => void;
}

export default function ActivityPage({ onTransition, onBack }: ActivityPageProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "interviews" | "unread">("all");

  const filterList = notifications.filter((notif) => {
    if (activeTab === "unread") return notif.isNew;
    if (activeTab === "interviews") return notif.type === "invitation";
    return true;
  });

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
    alert("All notifications marked as read.");
  };

  const handleItemClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isNew: false } : n));
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8ff] text-[#131b2e] pb-[100px] md:pb-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 w-full h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3c6d7]/15 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="text-[#434655] hover:text-[#004ac6] p-2 hover:bg-slate-50 rounded-full transition-all"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-base text-[#131b2e]">Activity Log</h1>
        </div>
        
        <button 
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-[#004ac6] hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
        >
          <Check className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[650px] mx-auto px-6 py-6 flex flex-col gap-5">
        
        {/* Dynamic Category Toggle horizontal chips */}
        <section className="flex gap-2 select-none">
          {(["all", "interviews", "unread"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all capitalized ${
                activeTab === tab
                  ? "bg-[#dbeaff] text-[#1e40af] border-transparent shadow-sm ring-1 ring-[#1e40af]/20"
                  : "bg-white text-[#434655] border-[#c3c6d7]/35 hover:bg-slate-50"
              }`}
            >
              {tab === "all" ? "All Activity" : tab === "interviews" ? "Interviews" : "Unread Alerts"}
            </button>
          ))}
        </section>

        {/* List of activity cards */}
        <section className="flex flex-col gap-3">
          {filterList.length === 0 ? (
            <div className="bg-white rounded-2xl border p-12 text-center text-xs font-semibold text-[#737686]">
              No activity logs listed under this category.
            </div>
          ) : (
            filterList.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => handleItemClick(notif.id)}
                className={`bg-white rounded-xl p-4 border transition-all flex gap-4 items-start relative select-none cursor-pointer ${
                  notif.isNew 
                    ? "border-[#004ac6]/40 shadow-sm ring-1 ring-[#004ac6]/10" 
                    : "border-[#c3c6d7]/20 hover:border-blue-100"
                }`}
              >
                {/* Visual Unread dot */}
                {notif.isNew && (
                  <span className="absolute top-4 right-4 w-2 h-2 bg-[#004ac6] rounded-full"></span>
                )}

                {/* Specific Event Type visual icons */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  notif.type === "invitation" ? "bg-amber-50 text-amber-600" :
                  notif.type === "match" ? "bg-blue-50 text-blue-600" :
                  notif.type === "viewed" ? "bg-purple-50 text-purple-600" :
                  "bg-slate-50 text-emerald-600"
                }`}>
                  {notif.type === "invitation" ? <CalendarCheck className="w-5 h-5" /> :
                   notif.type === "match" ? <Sparkles className="w-5 h-5" /> :
                   notif.type === "viewed" ? <UserCheck className="w-5 h-5" /> :
                   <AlertCircle className="w-5 h-5" />}
                </div>

                {/* Detail summary text */}
                <div className="flex-1 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xs font-extrabold text-[#111827]">{notif.title}</h3>
                    <span className="text-[10px] text-slate-400 font-semibold">{notif.time}</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-[#004ac6] mt-0.5">{notif.company}</h4>
                  <p className="text-xs text-[#434655] mt-1.5 leading-relaxed opacity-90">
                    {notif.details}
                  </p>
                  
                  {/* Action row commands inside card */}
                  <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-50">
                    <button 
                      onClick={(e) => handleDeleteItem(notif.id, e)}
                      className="text-slate-400 hover:text-[#ba1a1a] p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      aria-label="Remove Notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {notif.type === "invitation" && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Technical interview details and invitation email re-sent!");
                        }}
                        className="bg-[#004ac6] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg hover:bg-[#2170e4]"
                      >
                        Accept Invitation
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </section>

      </main>

    </div>
  );
}
