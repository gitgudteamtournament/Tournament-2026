import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

interface TournamentCardProps {
    title: string;
    hasSubmit?: boolean;
    isTeamView?: boolean;
    onDetailClick: () => void;
}

const TournamentCard = ({ title, hasSubmit = false, isTeamView = false, onDetailClick }: TournamentCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.35 }}
        className="bg-white/50 backdrop-blur-[25px] rounded-[22px] p-6 border border-white/60 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col h-full"
    >
        <h3 className="text-[18px] font-bold text-[#0f172a] mb-3">{title}</h3>

        <div className="space-y-1 text-[13px] text-[#1e293b]/70 mb-6 leading-tight">
            <p>Статус: <span className="text-[#1e293b] font-semibold">Active</span></p>
            <p>Раунд: <span className="text-[#1e293b] font-semibold">1</span></p>
            <p>Дедлайн: <span className="text-[#1e293b] font-semibold">24.05.2024</span></p>
            {hasSubmit && <p>Статус сабміту: <span className="text-[#1e293b] font-semibold">Надіслано</span></p>}
        </div>

        <div className="mt-auto flex justify-end">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDetailClick}
                className="bg-[#5c75ff] text-white text-[12px] font-bold px-5 py-2 rounded-[10px] shadow-[0_6px_14px_rgba(92,117,255,0.35)] hover:brightness-110"
            >
                {isTeamView ? "Дивитися" : "Детальніше"}
            </motion.button>
        </div>
    </motion.div>
);

interface UserOverlayProps {
    onDetailClick: () => void;
    onTeamDetailClick: () => void;
}

export default function DashboardUserOverlay({ onDetailClick, onTeamDetailClick }: UserOverlayProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement | null>(null);

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-12">
            
            <section className="rounded-[28px] bg-white/30 backdrop-blur-[30px] border border-white/50 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <h2 className="text-[26px] font-bold mb-8 text-[#0f172a]">Ваші турніри</h2>

                <div className="max-w-[320px]">
                    <TournamentCard 
                        title="Назва" 
                        hasSubmit 
                        isTeamView 
                        onDetailClick={onTeamDetailClick} 
                    />
                </div>
            </section>

            <section className="rounded-[28px] bg-white/30 backdrop-blur-[30px] border border-white/50 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-[26px] font-bold text-[#0f172a]">Турніри</h2>

                    <div className="relative" ref={filterRef}>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-[52px] h-[34px] rounded-[10px] bg-[#5c75ff] flex items-center justify-center gap-1 shadow-md hover:brightness-110"
                        >
                            <ChevronIcon />
                            <FilterIcon />
                        </motion.button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-[200px] bg-white/90 backdrop-blur-[20px] border border-white/60 rounded-[16px] shadow-xl overflow-hidden z-50"
                                >
                                    {["Registration open", "Running", "Finished"].map((item) => (
                                        <button
                                            key={item}
                                            className="w-full text-left px-4 py-3 text-[14px] font-semibold text-[#1e293b] hover:bg-[#5c75ff]/10 transition"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <TournamentCard key={i} title="Назва" onDetailClick={onDetailClick} />
                    ))}
                </div>

            </section>
        </motion.main>
    );
}