import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainInfo from "./InformationOverlay/MainInfo";
import RateOverlay from "./InformationOverlay/RateOverlay";
import CertificateOverlay from "./InformationOverlay/CertificateOverlay";
import Leaderboard from "../User/LeaderboardOverlay";

interface TourPropertyProps {
    onClose: () => void;
    roundTitle?: string;
}

const Theme = {
    overlay: "fixed inset-0 z-[1100] flex items-center justify-center md:p-4 bg-slate-900/10 backdrop-blur-md",
    card: "bg-white/70 backdrop-blur-2xl md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white/80 w-full max-w-[1400px] h-full md:h-[90vh] flex flex-col md:flex-row overflow-hidden relative",
    sidebar: "w-full md:w-[320px] bg-white/40 border-b md:border-b-0 md:border-r border-white/60 p-4 md:p-8 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible hide-scrollbar",
    navItem: (isActive: boolean) => `
    whitespace-nowrap px-6 py-3 md:py-4 rounded-[15px] md:rounded-[20px] transition-all duration-300 font-bold text-[13px] md:text-[14px]
    ${isActive
            ? "bg-white shadow-sm text-[#1e293b] scale-[1.02]"
            : "text-slate-400 hover:text-slate-600 hover:bg-white/30"}
  `,
    contentArea: "flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar",
};

type TabType = "main" | "scoring" | "leaderboard" | "certificate";

export default function TourProperty({ onClose, roundTitle }: TourPropertyProps) {
    const [activeTab, setActiveTab] = useState<TabType>("main");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const menuItems = [
        { id: "main", label: "Основна інформація" },
        { id: "scoring", label: "Оцінювання" },
        { id: "leaderboard", label: "Таблиця лідерів" },
        { id: "certificate", label: "Сертифікат" },
    ];

    return (
        <div className={Theme.overlay}>
            <motion.div className="fixed inset-0 hidden md:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />

            <motion.div
                className={Theme.card}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >
                <aside className={Theme.sidebar}>
                    <button onClick={onClose} className="hidden md:flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-8 transition-colors font-black text-[10px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M15 18l-6-6 6-6" /></svg>
                        До турніру
                    </button>

                    <div className="hidden md:block mb-6 px-4">
                        <h2 className="text-[20px] font-black text-[#1e293b]">{roundTitle || "Раунд N: Назва"}</h2>
                    </div>

                    <div className="flex md:flex-col gap-2 w-full">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as TabType)}
                                className={Theme.navItem(activeTab === item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </aside>

                <main className={Theme.contentArea}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "main" && <MainInfo />}
                            {activeTab === "scoring" && <RateOverlay />}
                            {activeTab === "certificate" && <CertificateOverlay />}
                            {activeTab === "leaderboard" && <Leaderboard onBack={onClose} />}
                        </motion.div>
                    </AnimatePresence>
                </main>

                <button
                    onClick={onClose}
                    className="md:hidden absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md z-[10]"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </motion.div>
        </div>
    );
}