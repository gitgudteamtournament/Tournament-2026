import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getTournaments } from "../../../api/tournaments";
import type { TournamentCard } from "../../../api/tournaments";

const EditIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

const UserAvatarIcon = () => (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

interface TournamentCardProps {
    title: string;
    date: string;
    status: "Finished" | "Registration" | "Running";
}

const TournamentAdminCard = ({ title, date, status }: TournamentCardProps) => {
    const statusStyles = {
        Finished: { bg: "bg-[#05004E]", text: "Finished" },
        Registration: { bg: "bg-[#5c75ff]", text: "Registration" },
        Running: { bg: "bg-[#4ade80]", text: "Running" }
    };

    return (
        <div className="bg-white/70 rounded-[20px] p-6 border border-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-white/90">
            <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#1e293b] mb-1">{title}</h3>
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-[12px] font-medium text-[#1e293b]/60">{date}</span>
                    <span className={`${statusStyles[status].bg} text-white text-[10px] font-bold px-3 py-0.5 rounded-full`}>
                        {statusStyles[status].text}
                    </span>
                </div>
                <div className="text-[12px] font-medium text-[#1e293b]/50 flex flex-col leading-tight">
                    <span>N команд</span>
                    <span>Сабмітів:N</span>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                {status === "Finished" && (
                    <button className="flex-1 md:flex-none bg-[#5c75ff] text-white px-6 py-2.5 rounded-[12px] font-bold text-[13px] shadow-lg shadow-[#5c75ff]/20 hover:brightness-110 transition-all">
                        Leaderboard
                    </button>
                )}
                <button className="flex-1 md:flex-none bg-white border border-[#f1f5f9] text-[#5c75ff] px-6 py-2.5 rounded-[12px] font-bold text-[13px] shadow-sm hover:bg-[#f8fafc] transition-all">
                    Детальніше
                </button>
            </div>
        </div>
    );
};

export default function ProfileAdminOverlay() {
    const { user } = useAuth();
    const [tournaments, setTournaments] = useState<TournamentCard[]>([]);

    useEffect(() => {
        getTournaments().then(setTournaments).catch(() => {});
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start relative z-20"
        >
            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-10 shadow-sm flex flex-col items-center min-h-[600px]">
                <div className="w-[150px] h-[150px] rounded-full bg-[#5c75ff] border-[4px] border-white flex items-center justify-center mb-6 shadow-xl shadow-[#5c75ff]/20 shrink-0">
                    <UserAvatarIcon />
                </div>

                <div className="text-center space-y-1 mb-6">
                    <div className="flex items-center justify-center gap-2 text-[#1e293b]">
                        <h2 className="text-[26px] font-bold tracking-tight">{user?.name || "Ім'я"}</h2>
                    </div>
                    <p className="text-[14px] font-medium text-[#1e293b]/70">{user?.login || "example@gmail.com"}</p>
                </div>

                <div className="w-[140px] h-[40px] rounded-[12px] bg-[#5c75ff] text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-[#5c75ff]/20">
                    {user?.roles?.[0] || "Адмін"}
                </div>
            </section>

            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 md:p-10 shadow-sm min-h-[600px] space-y-6">
                <h2 className="text-[26px] font-bold text-[#1e293b] mb-2">Створені турніри</h2>

                <div className="space-y-4">
                    {tournaments.length === 0 ? (
                        <p className="text-slate-400 font-medium">Немає створених турнірів</p>
                    ) : (
                        tournaments.map((t) => (
                            <TournamentAdminCard
                                key={t.id}
                                title={t.title}
                                date={t.format || "N/A"}
                                status={t.status === "FINISHED" ? "Finished" : t.status === "REGISTRATION" ? "Registration" : "Running"}
                            />
                        ))
                    )}
                </div>
            </section>
        </motion.div>
    );
}