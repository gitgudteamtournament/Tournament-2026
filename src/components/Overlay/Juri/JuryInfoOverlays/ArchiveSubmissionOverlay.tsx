import React from "react";
import { motion } from "framer-motion";

interface TeamCardProps {
    teamName: string;
    status: "edit" | "evaluate";
    onClick: () => void;
}

const TeamCard = ({ teamName, status, onClick }: TeamCardProps) => {
    return (
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-md rounded-[24px] p-6 mb-4 border border-white shadow-sm transition-all hover:bg-white/80">
            <span className="text-[18px] font-bold text-[#1e293b] ml-4">
                {teamName}
            </span>

            <button
                onClick={onClick}
                className="px-10 py-3 rounded-[16px] font-bold text-[14px] transition-all active:scale-95 shadow-lg bg-[#5c75ff] text-white shadow-[#5c75ff]/20 hover:brightness-110"
            >
                {status === "edit" ? "Редагувати" : "Оцінити"}
            </button>
        </div>
    );
};

export default function ArchiveSubmissionOverlay({ onEvaluate }: { onEvaluate: (name: string) => void }) {
    const teams = [
        { id: 1, name: "Команда Альфа", status: "edit" },
        { id: 2, name: "Команда Бета", status: "edit" },
        { id: 3, name: "Команда Гамма", status: "evaluate" },
        { id: 4, name: "Команда Дельта", status: "evaluate" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full font-roboto"
        >
            <div className="mb-6">
                <span className="text-[13px] font-medium text-[#1e293b]/50">
                    Тривалість оцінювання:
                </span>
                <div className="text-[13px] font-bold text-[#1e293b]">
                    01.01.2026 - 01.02.2026
                </div>
            </div>

            <h1 className="text-[32px] font-black text-[#1e293b] mb-8">
                Призначені роботи
            </h1>

            <div className="flex flex-col w-full max-w-[800px]">
                {teams.map((team) => (
                    <TeamCard
                        key={team.id}
                        teamName={team.name}
                        status={team.status as "edit" | "evaluate"}
                        onClick={() => onEvaluate(team.name)}
                    />
                ))}
            </div>
        </motion.div>
    );
}