import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddJuryOverlay from "../modals/AddJuryOverlay";
import ConfirmDeleteTeamOverlay from "../modals/ConfirmDeleteTeamOverlay";
import CreateRoundOverlay from "./CreateRoundOverlay";
import TourProperty from "./TourProperty";
import { getTournament } from "../../../api/tournaments";
import { getRoundsByTournament } from "../../../api/rounds";
import type { Tournament } from "../../../api/tournaments";
import type { Round } from "../../../api/rounds";

interface RunningTourProps {
    onClose: () => void;
    tournamentId: number;
}

const Theme = {
    overlay: "fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-md",
    card: "bg-white/70 backdrop-blur-2xl rounded-[40px] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white/80 w-full max-w-[1300px] max-h-[94vh] overflow-y-auto custom-scrollbar relative",
    sectionTitle: "text-[22px] font-black text-[#1e293b] mb-8",
    btnPrimary: "px-10 py-3.5 bg-[#5c75ff] text-white font-black rounded-[20px] shadow-[0_10px_25px_rgba(92,117,255,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all border-none cursor-pointer text-[13px] uppercase tracking-wider",
    btnSecondary: "px-10 py-3.5 bg-white text-slate-500 font-black rounded-[20px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer text-[13px] uppercase tracking-wider",
    floatingPlus: "w-12 h-12 bg-[#5c75ff] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(92,117,255,0.4)] hover:scale-110 active:scale-95 transition-all border-none cursor-pointer absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
};

export default function TourPageRunningOverlay({ onClose, tournamentId }: RunningTourProps) {
    const [isAddJuryOpen, setIsAddJuryOpen] = useState(false);
    const [isCreateRoundOpen, setIsCreateRoundOpen] = useState(false);
    const [isPropertyOpen, setIsPropertyOpen] = useState(false);
    const [selectedRound, setSelectedRound] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ id: any; name: string; type: 'jury' | 'team' } | null>(null);
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        if (!tournamentId) return;
        setLoading(true);
        Promise.all([
            getTournament(tournamentId),
            getRoundsByTournament(tournamentId),
        ])
            .then(([t, r]) => {
                setTournament(t);
                setRounds(r);
            })
            .catch((err) => setError(err.message || "Failed to load"))
            .finally(() => setLoading(false));
    }, [tournamentId]);

    const handleOpenDetails = (roundName: string) => {
        setSelectedRound(roundName);
        setIsPropertyOpen(true);
    };

    return (
        <div className={Theme.overlay}>
            <motion.div className="fixed inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />

            <motion.div
                className={Theme.card}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-12 transition-colors font-black text-[10px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M15 18l-6-6 6-6" /></svg>
                    На головну
                </button>

                <div className="flex flex-col lg:flex-row gap-16 mb-20">
                    {error && <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-[14px] font-medium">{error}</div>}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-[48px] font-black text-[#1e293b] tracking-tight">{loading ? "Loading..." : tournament?.title || "Назва турніру"}</h1>
                        </div>
                        <span className="bg-[#4aff6c] text-[#0f3d18] px-6 py-1.5 rounded-full font-black text-[11px] uppercase tracking-[1.5px] inline-block mb-8 shadow-sm shadow-[#4aff6c]/20">{loading ? "..." : tournament?.status || "Running"}</span>

                        <div className="space-y-4">
                            <p className="text-[#64748b] font-bold text-[16px]">Раундів: <span className="text-[#1e293b]">{rounds.length}</span></p>
                            <p className="text-[#64748b] font-bold text-[16px]">Формат: <span className="text-[#1e293b]">{tournament?.format || "N/A"}</span></p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[450px] space-y-6">
                        <DateCard title="Тривалість турніру" start="дд.мм.рррр 00:00" end="дд.мм.рррр 00:00" />
                        <DateCard title="Термін реєстрації команд" start="дд.мм.рррр 00:00" end="дд.мм.рррр 00:00" badge="Запущено" />
                    </div>
                </div>

                <div className="mb-24 relative pb-10">
                    <h2 className={Theme.sectionTitle}>Раунди</h2>
                    <div className="grid gap-6">
                        {rounds.length === 0 ? (
                            <p className="text-slate-400 font-medium">Раунди ще не створено</p>
                        ) : (
                            rounds.map((r, idx) => (
                                <RoundCard
                                    key={r.id}
                                    number={r.roundOrder || idx + 1}
                                    title={r.title}
                                    dates={`${r.startTime ? new Date(r.startTime).toLocaleDateString() : "?"} - ${r.endTime ? new Date(r.endTime).toLocaleDateString() : "?"}`}
                                    isActive={r.status === "ACTIVE"}
                                    onDetails={() => handleOpenDetails(r.title)}
                                />
                            ))
                        )}
                    </div>
                    <button onClick={() => setIsCreateRoundOpen(true)} className={Theme.floatingPlus}>
                        <PlusIcon />
                    </button>
                </div>

                <div className="mb-24 relative pb-10">
                    <h2 className={Theme.sectionTitle}>Зареєстровані команди</h2>
                    <div className="bg-white rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-[#94a3b8] text-[11px] font-black uppercase tracking-[2px] border-b border-slate-50">
                                    <th className="px-10 py-8 text-left w-20">#</th>
                                    <th className="px-6 py-8 text-left">Назва команди</th>
                                    <th className="px-6 py-8 text-left">Капітан</th>
                                    <th className="px-6 py-8 text-left">Учасники</th>
                                    <th className="px-10 py-8 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] font-bold text-[#1e293b]">
                                <tr className="border-b border-slate-50">
                                    <td colSpan={5} className="px-10 py-7 text-slate-400 text-center">Дані команд будуть доступні після підключення API</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-[600px] relative pb-10">
                    <h2 className={Theme.sectionTitle}>Журі</h2>
                    <div className="bg-white rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100 p-8 space-y-6">
                        <p className="text-slate-400 text-center font-medium">Журі ще не призначено</p>
                    </div>
                    <button onClick={() => setIsAddJuryOpen(true)} className={Theme.floatingPlus}>
                        <PlusIcon />
                    </button>
                </div>

                <div className="flex justify-center gap-6 mt-32">
                    <button className={Theme.btnPrimary}>Опублікувати</button>
                    <button className={Theme.btnSecondary}>Зберегти</button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isPropertyOpen && (
                    <TourProperty
                        roundTitle={selectedRound || ""}
                        onClose={() => setIsPropertyOpen(false)}
                    />
                )}

                {isCreateRoundOpen && <CreateRoundOverlay onClose={() => setIsCreateRoundOpen(false)} tournamentId={tournamentId} />}
                {isAddJuryOpen && <AddJuryOverlay onClose={() => setIsAddJuryOpen(false)} />}
                {deleteTarget && (
                    <ConfirmDeleteTeamOverlay
                        title={deleteTarget.type === 'team' ? "Видалити команду?" : "Видалити арбітра?"}
                        onClose={() => setDeleteTarget(null)}
                        onConfirm={() => setDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function RoundCard({ number, title, dates, isActive, onDetails }: { number: number, title: string, dates: string, isActive: boolean, onDetails: () => void }) {
    return (
        <div className={`p-8 rounded-[35px] border transition-all ${isActive ? 'bg-[#e2ff4a]/20 border-[#e2ff4a] shadow-[0_15px_40px_rgba(226,255,74,0.15)]' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h4 className="text-[20px] font-black text-[#1e293b] mb-1">Раунд {number} : {title}</h4>
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[1.5px]">Тривалість: {dates}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onDetails}
                        className="bg-white text-slate-500 px-7 py-2.5 rounded-[15px] font-black text-[11px] uppercase border border-slate-100 cursor-pointer shadow-sm"
                    >
                        Детальніше
                    </button>
                </div>
            </div>
        </div>
    );
}

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

function DateCard({ title, start, end, badge }: any) {
    return (
        <div className="bg-white/60 p-8 rounded-[32px] border border-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <label className="text-[13px] font-black text-[#1e293b] uppercase tracking-wider">{title}</label>
                {badge && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge}</span>}
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-[18px] border border-slate-100 shadow-sm text-slate-300 font-bold text-[13px]">
                    {start} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-[18px] border border-slate-100 shadow-sm text-slate-300 font-bold text-[13px]">
                    {end} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
            </div>
        </div>
    );
}