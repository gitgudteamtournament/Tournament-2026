import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubmitOverlay from "./SubmitOverlay";

interface ArchiveTeamData {
    rank: number;
    name: string;
    total: number;
}

const archiveLeaderboardData: ArchiveTeamData[] = [
    { rank: 1, name: "Назва команди", total: 100 },
    { rank: 2, name: "Назва команди", total: 99 },
    { rank: 3, name: "Назва команди", total: 98 },
    { rank: 4, name: "Назва команди", total: 97 },
    { rank: 5, name: "Назва команди", total: 96 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
};

interface ArchiveTournamentPageProps {
    onBack?: () => void;
    onViewSubmit?: (team: ArchiveTeamData) => void;
}

export default function ArchiveTournamentPage({ onBack, onViewSubmit }: ArchiveTournamentPageProps) {
    const [selectedTeam, setSelectedTeam] = useState<ArchiveTeamData | null>(null);

    const getRankColor = (rank: number) => {
        if (rank === 1) return "#F6D84A";
        if (rank === 2) return "#A9B8C4";
        if (rank === 3) return "#C3A85B";
        return "#8C8B86";
    };

    const handleOpenSubmits = (team: ArchiveTeamData) => {
        setSelectedTeam(team);
        onViewSubmit?.(team);
    };

    return (
        <div className="relative mx-auto max-w-6xl px-4 md:px-0 py-6">
            <AnimatePresence mode="wait">
                {selectedTeam ? (
                    <SubmitOverlay
                        key="submit-view"
                        team={selectedTeam}
                        onClose={() => setSelectedTeam(null)}
                    />
                ) : (
                    <motion.div
                        key="archive-view"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-10"
                    >
                        <button
                            onClick={onBack}
                            className="flex items-center gap-1 text-[13px] font-bold text-[#0f172a] hover:opacity-70 transition-opacity"
                        >
                            <span className="text-lg leading-none">‹</span> На головну
                        </button>

                        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#0f172a] leading-tight">
                                        Назва турніру
                                    </h1>
                                    <span className="inline-block rounded-full bg-[#1e293b] px-3 py-1 text-[11px] font-bold tracking-wide text-white">
                                        Finished
                                    </span>
                                </div>

                                <div className="space-y-1.5 text-[14px] font-medium text-[#0f172a]">
                                    <p>Раундів: 3</p>
                                    <p>Зареєстровано: N команд</p>
                                    <p>Сабмітів: N</p>
                                </div>

                                <div className="max-w-md space-y-2">
                                    <h3 className="text-[16px] font-bold text-[#0f172a]">Опис</h3>
                                    <p className="text-[14px] leading-relaxed text-[#0f172a]/80">
                                        Тут знаходиться детальний опис турніру, його цілей та результатів.
                                    </p>
                                </div>
                            </div>

                            <div className="h-fit w-full md:w-[320px] rounded-[24px] border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-2xl">
                                <div className="space-y-5">
                                    <div>
                                        <p className="mb-2 text-[13px] font-bold text-[#0f172a]">Дата та час старту</p>
                                        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm">
                                            <div className="flex items-center gap-2 text-[#0f172a]/60">
                                                <span className="text-[13px] font-medium">дд.мм.рррр</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#0f172a]/60">
                                                <span className="text-[13px] font-medium">00:00</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-[13px] font-bold text-[#0f172a]">Дата та час завершення</p>
                                        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm">
                                            <div className="flex items-center gap-2 text-[#0f172a]/60">
                                                <span className="text-[13px] font-medium">дд.мм.рррр</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#0f172a]/60">
                                                <span className="text-[13px] font-medium">00:00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-[20px] md:text-[24px] font-bold text-[#0f172a]">Таблиця лідерів</h2>

                            <div className="rounded-[24px] md:rounded-[32px] border border-white/70 bg-white/40 p-2 md:p-6 shadow-xl backdrop-blur-2xl">
                                <div className="overflow-x-auto">
                                    <div className="min-w-[600px]">
                                        <div
                                            className="grid items-center border-b border-black/5 px-6 pb-4 text-[14px] font-bold text-[#0f172a]"
                                            style={{ gridTemplateColumns: "50px 1fr 120px 120px", gap: "16px" }}
                                        >
                                            <span className="text-center">#</span>
                                            <span>Команда</span>
                                            <span className="text-center">Сума балів</span>
                                            <span className="text-right"></span>
                                        </div>

                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="mt-2"
                                        >
                                            {archiveLeaderboardData.map((team, index) => (
                                                <motion.div
                                                    key={team.rank}
                                                    variants={itemVariants}
                                                    className={`grid items-center px-6 py-4 transition-all hover:bg-white/60 ${index !== archiveLeaderboardData.length - 1 ? "border-b border-black/5" : ""}`}
                                                    style={{ gridTemplateColumns: "50px 1fr 120px 120px", gap: "16px" }}
                                                >
                                                    <span
                                                        className="text-center text-[18px] md:text-[20px] font-bold"
                                                        style={{ color: getRankColor(team.rank) }}
                                                    >
                                                        {team.rank}
                                                    </span>
                                                    <span className="font-bold text-[#0f172a] text-[14px] md:text-[15px] truncate">
                                                        {team.name}
                                                    </span>
                                                    <span className="text-center font-bold text-[#5c75ff] text-[14px] md:text-[15px]">
                                                        {team.total}
                                                    </span>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => handleOpenSubmits(team)}
                                                            className="rounded-full bg-[#5c75ff] px-6 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-blue-500/25 transition-transform active:scale-95 hover:bg-[#4a61e6]"
                                                        >
                                                            Сабміт
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}