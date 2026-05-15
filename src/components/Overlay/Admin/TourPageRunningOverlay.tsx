import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddJuryOverlay from "../modals/AddJuryOverlay";
import ConfirmDeleteTeamOverlay from "../modals/ConfirmDeleteTeamOverlay";
import CreateRoundOverlay from "./CreateRoundOverlay";
import RateOverlay from "./RateOverlay";
import TourProperty from "./TourProperty";

interface RunningTourProps {
    onClose: () => void;
    tournamentData?: any;
}

const Theme = {
    overlay: "fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-md",
    card: "bg-white/70 backdrop-blur-2xl rounded-[40px] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white/80 w-full max-w-[1300px] max-h-[94vh] overflow-y-auto custom-scrollbar relative",
    sectionTitle: "text-[22px] font-black text-[#1e293b] mb-8",
    btnPrimary: "px-10 py-3.5 bg-[#5c75ff] text-white font-black rounded-[20px] shadow-[0_10px_25px_rgba(92,117,255,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all border-none cursor-pointer text-[13px] uppercase tracking-wider",
    btnSecondary: "px-10 py-3.5 bg-white text-slate-500 font-black rounded-[20px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer text-[13px] uppercase tracking-wider",
    floatingPlus: "w-12 h-12 bg-[#5c75ff] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(92,117,255,0.4)] hover:scale-110 active:scale-95 transition-all border-none cursor-pointer absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
};

export default function TourPageRunningOverlay({ onClose }: RunningTourProps) {
    const [isAddJuryOpen, setIsAddJuryOpen] = useState(false);
    const [isCreateRoundOpen, setIsCreateRoundOpen] = useState(false);
    const [isPropertyOpen, setIsPropertyOpen] = useState(false);
    const [selectedRound, setSelectedRound] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ id: any; name: string; type: 'jury' | 'team' } | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

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
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-[48px] font-black text-[#1e293b] tracking-tight">Назва турніру</h1>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" className="opacity-20 cursor-pointer hover:opacity-100 transition-opacity"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </div>
                        <span className="bg-[#4aff6c] text-[#0f3d18] px-6 py-1.5 rounded-full font-black text-[11px] uppercase tracking-[1.5px] inline-block mb-8 shadow-sm shadow-[#4aff6c]/20">Running</span>

                        <div className="space-y-4">
                            <p className="text-[#64748b] font-bold text-[16px]">Раундів: <span className="text-[#1e293b]">3</span></p>
                            <div className="flex items-center gap-4">
                                <p className="text-[#64748b] font-bold text-[16px]">До завершення раунда 2: <span className="text-[#1e293b]">N діб N год.</span></p>
                                <button className="bg-[#5c75ff] text-white px-4 py-1.5 rounded-xl font-black text-[10px] uppercase border-none cursor-pointer">Завершити</button>
                            </div>
                            <p className="text-[#64748b] font-bold text-[16px]">Зареєстровано: <span className="text-[#1e293b]">N команд</span></p>
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
                        {[1, 2, 3].map((r) => (
                            <RoundCard
                                key={r}
                                number={r}
                                isActive={r === 1}
                                onDetails={() => handleOpenDetails(`Раунд ${r}: Назва`)}
                            />
                        ))}
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
                                {[1, 2, 3].map((t) => (
                                    <tr key={t} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-7 text-slate-300 font-black">{t}</td>
                                        <td className="px-6 py-7">Команда {t}</td>
                                        <td className="px-6 py-7">
                                            <div className="flex flex-col">
                                                <span>Ім'я Прізвище</span>
                                                <span className="text-[11px] text-slate-400 font-medium">example@gmail.com</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-7">
                                            <div className="space-y-1 text-[13px]">
                                                <div className="flex gap-2">Учасник 1 <span className="text-slate-400 font-medium">...</span></div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <button onClick={() => setDeleteTarget({ id: t, name: 'Team', type: 'team' })} className="bg-[#5c75ff] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase border-none cursor-pointer">Видалити</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-[600px] relative pb-10">
                    <h2 className={Theme.sectionTitle}>Журі</h2>
                    <div className="bg-white rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100 p-8 space-y-6">
                        {[1, 2, 3].map((j) => (
                            <div key={j} className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                <div>
                                    <div className="font-black text-[#1e293b] text-[16px]">Суддя {j}</div>
                                    <div className="text-[12px] text-slate-400 font-bold">jury@gmail.com</div>
                                </div>
                                <button onClick={() => setDeleteTarget({ id: j, name: 'Jury', type: 'jury' })} className="bg-[#5c75ff] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase border-none cursor-pointer">Видалити</button>
                            </div>
                        ))}
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

                {isCreateRoundOpen && <CreateRoundOverlay onClose={() => setIsCreateRoundOpen(false)} />}
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

function RoundCard({ number, isActive, onDetails }: { number: number, isActive: boolean, onDetails: () => void }) {
    return (
        <div className={`p-8 rounded-[35px] border transition-all ${isActive ? 'bg-[#e2ff4a]/20 border-[#e2ff4a] shadow-[0_15px_40px_rgba(226,255,74,0.15)]' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h4 className="text-[20px] font-black text-[#1e293b] mb-1">Раунд {number} : Назва</h4>
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[1.5px]">Тривалість: дд.мм.рррр - дд.мм.рррр</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onDetails}
                        className="bg-white text-slate-500 px-7 py-2.5 rounded-[15px] font-black text-[11px] uppercase border border-slate-100 cursor-pointer shadow-sm"
                    >
                        Детальніше
                    </button>
                    <button className="bg-[#5c75ff] text-white px-7 py-2.5 rounded-[15px] font-black text-[11px] uppercase border-none cursor-pointer shadow-lg shadow-[#5c75ff]/30">
                        {isActive ? "Завершити" : "Запустити"}
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