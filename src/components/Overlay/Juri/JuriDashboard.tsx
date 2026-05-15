import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JuryTourOverlay from "./JuryTourOverlay";
import { getTournaments } from "../../../api/tournaments";
import type { TournamentCard } from "../../../api/tournaments";

export default function DashboardJuriOverlay() {
    const [selectedView, setSelectedView] = useState<"list" | "tourDetail">("list");
    const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
    const [tournaments, setTournaments] = useState<TournamentCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getTournaments("EVALUATION")
            .then(setTournaments)
            .catch((err) => setError(err.message || "Failed"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="mt-8 font-roboto">
            <AnimatePresence mode="wait">
                {selectedView === "tourDetail" && selectedTournamentId ? (
                    <JuryTourOverlay
                        key="tourDetail"
                        tournamentId={selectedTournamentId}
                        onBack={() => setSelectedView("list")}
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
                            <div className="rounded-[24px] border border-white/60 bg-white/50 p-6 shadow-sm backdrop-blur-xl min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-8 w-8 bg-white rounded-[10px] shadow-sm flex items-center justify-center">
                                        <img src="/License Draft.png" className="w-4 h-4 object-contain" alt="" />
                                    </div>
                                    <p className="text-[13px] font-bold text-[#1e293b]">Призначено робіт</p>
                                </div>
                                <p className="text-[28px] font-bold text-[#1e293b] ml-11">M</p>
                            </div>

                            <div className="rounded-[24px] border border-white/60 bg-white/50 p-6 shadow-sm backdrop-blur-xl min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-8 w-8 bg-white rounded-[10px] shadow-sm flex items-center justify-center">
                                        <img src="/File Done.png" className="w-4 h-4 object-contain" alt="" />
                                    </div>
                                    <p className="text-[13px] font-bold text-[#1e293b]">Оцінено</p>
                                </div>
                                <p className="text-[28px] font-bold text-[#1e293b] ml-11">N</p>
                            </div>
                        </div>

                        {error && <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-[14px] font-medium">{error}</div>}
                    <section className="rounded-[48px] border border-white/70 bg-white/20 p-10 shadow-2xl backdrop-blur-3xl md:p-16 relative overflow-hidden">
                            <h1 className="text-[36px] font-bold text-[#1e293b] mb-12">Призначені турніри</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {loading ? (
                                    <p className="text-[#1e293b]/50 font-medium">Loading...</p>
                                ) : tournaments.length === 0 ? (
                                    <p className="text-[#1e293b]/50 font-medium">Немає призначених турнірів</p>
                                ) : (
                                tournaments.map((t) => (
                                    <div
                                        key={t.id}
                                        className="group relative rounded-[32px] border border-white/80 bg-white/60 p-8 shadow-sm transition-all hover:shadow-md hover:bg-white/70 backdrop-blur-md"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="space-y-1">
                                                <h3 className="text-[24px] font-bold text-[#1e293b]">{t.title}</h3>
                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-[13px] font-medium text-[#1e293b]/50">{t.format || "N/A"}</p>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider bg-[#8b5cf6]`}>
                                                {t.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => { setSelectedTournamentId(t.id); setSelectedView("tourDetail"); }}
                                                className="rounded-[16px] bg-[#5c75ff] px-12 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[#5c75ff]/25 transition-all active:scale-95 hover:brightness-110"
                                            >
                                                Перейти
                                            </button>
                                        </div>
                                    </div>
                                ))
                                )}
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}