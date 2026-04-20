import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchiveSubmissionOverlay from "./JuryInfoOverlays/ArchiveSubmissionOverlay";
import LeaderboardOverlay from "../User/LeaderboardOverlay";
import RateJuryOverlay from "./RateJuryOverlay";

type TabId = "round" | "criteria" | "submissions" | "leaderboard";

interface InfoJuryProps {
    onBack: () => void;
}

const InnerSidebar = ({ activeTab, onTabChange }: { activeTab: TabId, onTabChange: (id: TabId) => void }) => {
    const tabs: { id: TabId; label: string; hasArrow?: boolean }[] = [
        { id: "round", label: "Раунд N", hasArrow: true },
        { id: "criteria", label: "Критерії" },
        { id: "submissions", label: "Призначені роботи" },
        { id: "leaderboard", label: "Таблиця лідерів" },
    ];

    return (
        <aside className="w-full lg:w-[320px] shrink-0 bg-white/40 backdrop-blur-xl rounded-[32px] p-6 md:p-8 border border-white/50 shadow-sm flex flex-col gap-6">
            <h2 className="text-[22px] font-bold text-[#1e293b]">Раунд N: Назва</h2>
            <div className="flex flex-col gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full transition-all duration-200 rounded-[16px] p-4 flex items-center justify-between text-left border ${activeTab === tab.id
                            ? "bg-white border-white shadow-sm scale-[1.02]"
                            : "bg-white/30 hover:bg-white/50 border-transparent"
                            }`}
                    >
                        <span className={`text-[15px] font-bold ${activeTab === tab.id ? "text-[#5c75ff]" : "text-[#1e293b]"}`}>
                            {tab.label}
                        </span>
                        {tab.hasArrow && (
                            <svg
                                className={`transition-transform duration-200 ${activeTab === tab.id ? 'rotate-180' : ''}`}
                                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default function InfoJuryOverlay({ onBack }: InfoJuryProps) {
    const [activeTab, setActiveTab] = useState<TabId>("submissions");
    const [view, setView] = useState<"list" | "rate">("list");
    const [selectedTeam, setSelectedTeam] = useState<string>("");

    const handleEvaluate = (teamName: string) => {
        setSelectedTeam(teamName);
        setView("rate");
    };

    if (view === "rate") {
        return (
            <RateJuryOverlay
                teamName={selectedTeam}
                onBack={() => setView("list")}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-roboto flex flex-col items-center overflow-x-hidden">
            <div className="w-full max-w-[1400px]">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-[#5c75ff] hover:text-[#4056cc] transition-colors font-bold text-[14px]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        До турніру
                    </button>
                    <h1 className="text-[20px] md:text-[22px] font-bold text-[#1e293b]">Назва турніру</h1>
                    <span className="bg-[#C1E130] text-[#1e293b] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        SubmissionClosed
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
                    <InnerSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                    <main className="flex-1 w-full min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                {activeTab === "submissions" && (
                                    <ArchiveSubmissionOverlay onEvaluate={handleEvaluate} />
                                )}
                                {activeTab === "leaderboard" && <LeaderboardOverlay />}
                                {(activeTab === "round" || activeTab === "criteria") && (
                                    <div className="bg-white/40 rounded-[32px] p-12 text-center text-[#1e293b]/30 font-bold border border-dashed border-white/60">
                                        Контент {activeTab} у розробці
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>

                    <div className="w-full lg:w-[260px] shrink-0 flex flex-col sm:flex-row lg:flex-col gap-4">
                        <div className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-white flex items-center gap-4">
                            <div className="text-[#5c75ff] bg-[#5c75ff]/10 p-2 rounded-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-[#1e293b]/50">Призначено робіт</p>
                                <p className="text-[20px] font-black text-[#1e293b]">4</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-white flex items-center gap-4">
                            <div className="text-[#5c75ff] bg-[#5c75ff]/10 p-2 rounded-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-[#1e293b]/50">Оцінено</p>
                                <p className="text-[20px] font-black text-[#1e293b]">2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}