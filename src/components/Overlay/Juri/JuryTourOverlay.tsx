import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoJuryOverlay from "./InfoJuryOverlay";

interface RoundCardProps {
    number: number;
    title: string;
    dates: string;
    days: number;
    status: 'Evaluated' | 'SubmissionClosed' | 'Active';
    onSelect: () => void;
}

const RoundCard = ({ number, title, dates, days, status, onSelect }: RoundCardProps) => {
    const statusConfig = {
        Evaluated: { bg: "bg-[#5c75ff]", text: "Evaluated" },
        SubmissionClosed: { bg: "bg-[#C1E130]", text: "SubmissionClosed" },
        Active: { bg: "bg-[#4ade80]", text: "Active" }
    };

    return (
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white/20 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-[680px] gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-[20px] font-bold text-[#1e293b]">Раунд {number} : {title}</h3>
                    <span className={`${statusConfig[status].bg} text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                        {statusConfig[status].text}
                    </span>
                </div>
                <div className="text-[13px] text-[#1e293b]/50 font-medium">
                    Тривалість :
                    <div className="flex items-center gap-1 font-bold">
                        {dates} ({days} діб)
                    </div>
                </div>
            </div>
            <button
                onClick={onSelect}
                className="bg-[#5c75ff] text-white px-10 h-12 rounded-[16px] font-bold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-[#5c75ff]/30 active:scale-95 w-full sm:w-auto"
            >
                Перейти
            </button>
        </div>
    );
};

export default function JuryTourOverlay({ onBack }: { onBack: () => void }) {
    const [view, setView] = useState<"rounds" | "roundDetail">("rounds");

    const teamsCount = "N";
    const daysPlaceholder = 5;

    return (
        <AnimatePresence mode="wait">
            {view === "rounds" ? (
                <motion.div
                    key="rounds-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full mt-10 font-roboto"
                >
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[#1e293b]/60 hover:text-[#5c75ff] transition-colors mb-4 group"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        <span className="text-[14px] font-bold">На головну</span>
                    </button>

                    <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-[44px] font-bold text-[#1e293b] leading-tight mb-2">Назва турніру</h1>
                                <span className="bg-[#4ade80] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    Running
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[17px] font-bold text-[#1e293b]">Раундів:</span>
                                    <span className="text-[17px] font-medium text-[#1e293b]/70">3</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[17px] font-bold text-[#1e293b]">Зареєстровано:</span>
                                    <span className="text-[17px] font-medium text-[#1e293b]/70">{teamsCount} команд</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[17px] font-bold text-[#1e293b]">Тривалість турніру:</span>
                                    <span className="text-[17px] font-medium text-[#1e293b]/70">01.01.2026 - 01.02.2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[400px]">
                            <h2 className="text-[28px] font-bold text-[#1e293b]">Опис</h2>
                            <p className="text-[17px] text-[#1e293b]/70 font-medium leading-relaxed">
                                Короткий опис турніру та його основних цілей для учасників.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-[28px] font-bold text-[#1e293b] mb-8">Раунди</h2>
                        <div className="flex flex-col gap-5">
                            <RoundCard
                                number={1}
                                title="Відбірковий етап"
                                dates="01.01.2026 - 05.01.2026"
                                days={daysPlaceholder}
                                status="Evaluated"
                                onSelect={() => setView("roundDetail")}
                            />
                            <RoundCard
                                number={2}
                                title="Півфінал"
                                dates="06.01.2026 - 10.01.2026"
                                days={daysPlaceholder}
                                status="SubmissionClosed"
                                onSelect={() => setView("roundDetail")}
                            />
                            <RoundCard
                                number={3}
                                title="Фінал"
                                dates="11.01.2026 - 15.01.2026"
                                days={daysPlaceholder}
                                status="Active"
                                onSelect={() => setView("roundDetail")}
                            />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <InfoJuryOverlay
                    key="round-detail"
                    onBack={() => setView("rounds")}
                />
            )}
        </AnimatePresence>
    );
}