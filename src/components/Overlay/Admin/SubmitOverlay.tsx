import { motion } from "framer-motion";

interface ArchiveTeamData {
    rank: number;
    name: string;
    total: number;
}

interface SubmitOverlayProps {
    team: ArchiveTeamData;
    onClose: () => void;
}

export default function SubmitOverlay({ team, onClose }: SubmitOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full space-y-12"
        >
            <button
                onClick={onClose}
                className="flex items-center gap-4 rounded-[20px] border border-white/60 bg-white/40 p-4 shadow-sm transition-all hover:bg-white/80 active:scale-95"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5c75ff]/10">
                    <img src="/Back.png" alt="Back" className="w-2 h-3" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-medium text-[#0f172a]/50 uppercase tracking-wider">До турніру</p>
                    <p className="text-[13px] font-bold text-[#0f172a]">Архів турніру:</p>
                    <p className="text-[13px] font-medium text-[#0f172a]">Назва турніру</p>
                </div>
            </button>

            <div className="rounded-[40px] border border-white/70 bg-white/30 p-10 shadow-2xl backdrop-blur-3xl md:p-16">
                <div className="mb-12">
                    <h2 className="text-[28px] md:text-[32px] font-bold text-[#0f172a]">
                        Сабміт команди: {team.name}
                    </h2>
                    <div className="mt-2 flex gap-6 text-[16px] font-medium text-[#0f172a]/60">
                        <span>Сума балів: <span className="text-[#0f172a] font-bold">{team.total}</span></span>
                        <span>Місце: <span className="text-[#0f172a] font-bold">{team.rank}</span></span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-[24px] bg-white/40 p-6 border border-white/60">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                                <img src="/Github.png" alt="GitHub" className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-[#0f172a]">Посилання на GitHub репозиторій</p>
                                <p className="text-[13px] font-medium text-[#0f172a]/40">Посилання</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto rounded-full bg-[#5c75ff] px-8 py-3 text-[14px] font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#4a61e6]">
                            Відкрити
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-[24px] bg-white/40 p-6 border border-white/60">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                                <img src="/Play.png" alt="Play" className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-[#0f172a]">Відео-демо</p>
                                <p className="text-[13px] font-medium text-[#0f172a]/40">Посилання/файл</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto rounded-full bg-[#5c75ff] px-8 py-3 text-[14px] font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#4a61e6]">
                            Відкрити
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-[24px] bg-white/40 p-6 border border-white/60">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                                <img src="/Link.svg" alt="Link" className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-[#0f172a]">Live Demo</p>
                                <p className="text-[13px] font-medium text-[#0f172a]/40">Посилання</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto rounded-full bg-[#5c75ff] px-8 py-3 text-[14px] font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#4a61e6]">
                            Відкрити
                        </button>
                    </div>
                </div>

                <div className="mt-10 space-y-4">
                    <h3 className="text-[16px] font-bold text-[#0f172a]">Короткий опис</h3>
                    <div className="min-h-[160px] w-full rounded-[24px] border border-[#0f172a]/5 bg-white/40 p-8">
                        <p className="text-[15px] leading-relaxed text-[#0f172a]/60">Текст...</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}