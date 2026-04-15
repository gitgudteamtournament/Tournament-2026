import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubmitOverlay from "../Admin/SubmitOverlay";

interface Tournament {
    id: number;
    name: string;
    date: string;
    teamsCount: string;
    submitsCount: string;
    status: "Running" | "Registration";
}

const mockTournaments: Tournament[] = [
    { id: 1, name: "Назва", date: "01.01.26 - 01.01.27", teamsCount: "N", submitsCount: "N", status: "Running" },
    { id: 2, name: "Назва", date: "01.01.26 - 01.01.27", teamsCount: "N", submitsCount: "N", status: "Registration" },
    { id: 3, name: "Назва", date: "01.01.26 - 01.01.27", teamsCount: "N", submitsCount: "N", status: "Registration" },
    { id: 4, name: "Назва", date: "01.01.26 - 01.01.27", teamsCount: "N", submitsCount: "N", status: "Running" },
];

export default function DashboardJuriOverlay({ onTeamDetailClick }: { onTeamDetailClick: () => void }) {
    const [selectedView, setSelectedView] = useState<"list" | "submit">("list");
    const mockTeam = { rank: 1, name: "Назва команди", total: 100 };

    return (
        <main className="mt-8">
            <AnimatePresence mode="wait">
                {selectedView === "submit" ? (
                    <SubmitOverlay
                        key="submit"
                        team={mockTeam}
                        onClose={() => setSelectedView("list")}
                    />
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-10"
                    >
                        <div className="flex gap-6">
                            <div className="rounded-[20px] border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl min-w-[180px]">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-5 w-5 bg-blue-100 rounded-md flex items-center justify-center">
                                        <img src="/License Draft.png" className="w-3.5 h-3.5 object-contain" alt="" />
                                    </div>
                                    <p className="text-[12px] font-bold text-[#0f172a]">Призначено робіт</p>
                                </div>
                                <p className="text-[24px] font-bold text-[#0f172a] ml-8">M</p>
                            </div>

                            <div className="rounded-[20px] border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl min-w-[180px]">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-5 w-5 bg-green-100 rounded-md flex items-center justify-center">
                                        <img src="/File Done.png" className="w-3.5 h-3.5 object-contain" alt="" />
                                    </div>
                                    <p className="text-[12px] font-bold text-[#0f172a]">Оцінено</p>
                                </div>
                                <p className="text-[24px] font-bold text-[#0f172a] ml-8">N</p>
                            </div>
                        </div>

                        <section className="rounded-[40px] border border-white/70 bg-white/30 p-10 shadow-2xl backdrop-blur-3xl md:p-16">
                            <h1 className="text-[32px] font-bold text-[#0f172a] mb-12">Призначені турніри</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {mockTournaments.map((t) => (
                                    <div key={t.id} className="group relative rounded-[32px] border border-white/60 bg-white/60 p-8 shadow-sm transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-[22px] font-bold text-[#0f172a] mb-2">{t.name}</h3>
                                                <p className="text-[13px] font-medium text-[#0f172a]/40">{t.date}</p>
                                                <p className="text-[13px] font-medium text-[#0f172a]/40">{t.teamsCount} команд</p>
                                                <p className="text-[13px] font-medium text-[#0f172a]/40">Сабмітів: {t.submitsCount}</p>
                                            </div>
                                            <span className={`px-4 py-1 rounded-full text-[11px] font-bold text-white ${t.status === 'Running' ? 'bg-[#4ade80]' : 'bg-[#5c75ff]'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={onTeamDetailClick}
                                                className="rounded-full bg-[#5c75ff] px-10 py-3 text-[14px] font-bold text-white shadow-lg shadow-blue-500/25 transition-all active:scale-95 hover:bg-[#4a61e6]"
                                            >
                                                Перейти
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}