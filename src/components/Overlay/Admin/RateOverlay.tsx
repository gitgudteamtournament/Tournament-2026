import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddJuryOverlay from "../modals/AddJuryOverlay";
import ConfirmDeleteTeamOverlay from "../modals/ConfirmDeleteTeamOverlay";
import CreateRoundOverlay from "./CreateRoundOverlay";

interface RunningTourProps {
    onClose: () => void;
    tournamentData?: any;
}

const Theme = {
    overlay: "fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-slate-900/10 backdrop-blur-md",
    card: "bg-white/70 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-full max-w-[1300px] max-h-[92vh] overflow-y-auto custom-scrollbar relative",
    sectionTitle: "text-[22px] font-black text-[#1e293b] mb-8",
    btnPrimary: "px-10 py-3 bg-[#5c75ff] text-white font-bold rounded-2xl shadow-lg shadow-[#5c75ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all border-none cursor-pointer text-[13px] uppercase tracking-wider",
    btnSecondary: "px-10 py-3 bg-white text-slate-500 font-bold rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer text-[13px] uppercase tracking-wider",
    btnAction: "px-6 py-2 bg-[#5c75ff] text-white font-bold rounded-xl text-[11px] uppercase tracking-tight border-none cursor-pointer",
    floatingPlus: "w-12 h-12 bg-[#5c75ff] rounded-full flex items-center justify-center shadow-xl shadow-[#5c75ff]/40 hover:scale-110 active:scale-95 transition-all border-none cursor-pointer absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
};

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

export default function TourPageRunningOverlay({ onClose }: RunningTourProps) {
    const [isAddJuryOpen, setIsAddJuryOpen] = useState(false);
    const [isCreateRoundOpen, setIsCreateRoundOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: any; name: string; type: 'jury' | 'team' } | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className={Theme.overlay}>
            <motion.div className="fixed inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />

            <motion.div
                className={Theme.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-12 transition-colors font-bold text-[10px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M15 18l-6-6 6-6" /></svg>
                    На головну
                </button>

                <div className="flex flex-col lg:flex-row gap-16 mb-20">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-[42px] font-black text-[#1e293b] leading-tight">Назва турніру</h1>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" className="opacity-20 cursor-pointer hover:opacity-100 transition-opacity"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </div>
                        <span className="bg-[#4aff6c] text-[#0f3d18] px-6 py-1.5 rounded-full font-black text-[11px] uppercase tracking-[1.5px] inline-block mb-8 shadow-sm">Running</span>

                        <div className="space-y-3 pt-4 border-l-4 border-[#5c75ff]/20 pl-6">
                            <p className="text-[#64748b] font-bold text-[16px]">Раундів: <span className="text-[#1e293b]">3</span></p>
                            <div className="flex items-center gap-4">
                                <p className="text-[#64748b] font-bold text-[16px]">До завершення раунда 2: <span className="text-[#1e293b]">2 дні 4 год.</span></p>
                                <button className="px-4 py-1.5 bg-[#5c75ff] text-white font-bold rounded-xl text-[10px] uppercase border-none cursor-pointer">Завершити</button>
                            </div>
                            <p className="text-[#64748b] font-bold text-[16px]">Зареєстровано: <span className="text-[#1e293b]">12 команд</span></p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white/60 p-8 rounded-[32px] border border-white shadow-sm">
                            <label className="text-[14px] font-bold text-[#1e293b] block mb-3">Тривалість турніру</label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-50 shadow-sm text-slate-300 font-bold text-[13px]">
                                    01.03.2024 10:00
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                </div>
                                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-50 shadow-sm text-slate-300 font-bold text-[13px]">
                                    15.03.2024 20:00
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-24 relative pb-10">
                    <h2 className={Theme.sectionTitle}>Раунди</h2>
                    <div className="grid gap-6">
                        {[1, 2, 3].map((r) => (
                            <div key={r} className={`p-8 rounded-[32px] border transition-all ${r === 1 ? 'bg-[#e2ff4a]/20 border-[#e2ff4a] shadow-[0_15px_40px_rgba(226,255,74,0.1)]' : 'bg-white border-slate-100 shadow-sm'}`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h4 className="text-[19px] font-bold text-[#1e293b] mb-1">Раунд {r}: Дизайн інтерфейсу</h4>
                                        <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Термін: 01.03 - 05.03 (4 доби)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className={Theme.btnSecondary + " py-2.5 px-6 rounded-2xl text-[12px] border-none"}>Детальніше</button>
                                        <button className={Theme.btnPrimary + " py-2.5 px-6 rounded-2xl text-[12px]"}>
                                            {r === 1 ? "Завершити" : "Запустити"}
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                                    <th className="px-6 py-8 text-left">Команда</th>
                                    <th className="px-6 py-8 text-left">Капітан</th>
                                    <th className="px-6 py-8 text-left">Учасники</th>
                                    <th className="px-10 py-8 text-right">Управління</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] font-bold text-[#1e293b]">
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-7 text-slate-300 font-black">0{i}</td>
                                        <td className="px-6 py-7">CyberSquad</td>
                                        <td className="px-6 py-7">
                                            <div className="flex flex-col">
                                                <span>Олексій Коваль</span>
                                                <span className="text-[11px] text-slate-400 font-medium">koval@team.com</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-7 text-[13px] text-slate-500 font-medium">3 учасники</td>
                                        <td className="px-10 py-7 text-right">
                                            <button onClick={() => setDeleteTarget({ id: i, name: 'Team', type: 'team' })} className={Theme.btnAction}>Видалити</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className={Theme.floatingPlus}>
                        <PlusIcon />
                    </button>
                </div>

                <div className="max-w-[550px] mb-10 relative pb-10">
                    <h2 className={Theme.sectionTitle}>Журі</h2>
                    <div className="bg-white rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100 p-8 space-y-6">
                        {[1, 2].map((j) => (
                            <div key={j} className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#5c75ff]/10 rounded-full flex items-center justify-center text-[#5c75ff]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-black text-[#1e293b]">Ім'я Прізвище</div>
                                        <div className="text-[12px] text-slate-400 font-medium">expert.jury@test.com</div>
                                    </div>
                                </div>
                                <button onClick={() => setDeleteTarget({ id: j, name: 'Jury', type: 'jury' })} className={Theme.btnAction}>Видалити</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setIsAddJuryOpen(true)} className={Theme.floatingPlus}>
                        <PlusIcon />
                    </button>
                </div>

                <div className="flex justify-center gap-6 mt-20 pt-10 border-t border-slate-100">
                    <button className={Theme.btnPrimary}>Опублікувати</button>
                    <button className={Theme.btnSecondary}>Зберегти</button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isCreateRoundOpen && <CreateRoundOverlay onClose={() => setIsCreateRoundOpen(false)} />}
                {isAddJuryOpen && <AddJuryOverlay onClose={() => setIsAddJuryOpen(false)} />}
                {deleteTarget && (
                    <ConfirmDeleteTeamOverlay
                        title={deleteTarget.type === 'team' ? "Видалити команду?" : "Видалити арбітра?"}
                        description="Цю дію неможливо буде скасувати."
                        onClose={() => setDeleteTarget(null)}
                        onConfirm={() => setDeleteTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}