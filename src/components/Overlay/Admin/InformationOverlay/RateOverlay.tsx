import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Theme = {
    title: "text-[32px] font-black text-[#1e293b] mb-10",
    sectionLabel: "text-[22px] font-black text-[#1e293b] mb-6",
    dateBox: "bg-white/80 p-6 rounded-[28px] border border-white shadow-sm w-full",
    dateInput: "flex items-center justify-between bg-white px-5 py-3.5 rounded-[18px] border border-slate-100 shadow-sm text-slate-300 font-bold text-[13px] mt-2",
    tableCard: "bg-white/60 backdrop-blur-md rounded-[32px] border border-white shadow-sm overflow-hidden",
    th: "text-left py-5 px-8 text-[14px] font-black text-[#1e293b] border-b border-slate-100",
    td: "py-5 px-8 text-[14px] font-bold text-[#1e293b] border-b border-slate-50 last:border-0",
    btnBlue: "px-6 py-2.5 bg-[#5c75ff] text-white font-black rounded-[18px] shadow-lg shadow-[#5c75ff]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-[12px] uppercase",
    btnDelete: "px-6 py-2.5 bg-white text-[#5c75ff] font-black rounded-[18px] border border-[#5c75ff]/20 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all text-[12px] uppercase",
    fabAdd: "fixed bottom-10 right-10 w-14 h-14 bg-[#5c75ff] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#5c75ff]/40 hover:scale-110 active:scale-95 transition-all z-20"
};

export default function RateOverlay() {
    const [isDistributed, setIsDistributed] = useState(false);

    return (
        <div className="flex flex-col xl:flex-row gap-12 relative min-h-full">
            <div className="flex-1">
                <h1 className={Theme.title}>Оцінювання</h1>

                <div className="flex items-center justify-between mb-6">
                    <h2 className={Theme.sectionLabel}>Журі</h2>
                    {!isDistributed && (
                        <button
                            onClick={() => setIsDistributed(true)}
                            className={Theme.btnBlue}
                        >
                            Розподілити роботи
                        </button>
                    )}
                </div>

                <div className={Theme.tableCard}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className={Theme.th}>Ім'я Прізвище</th>
                                <th className={Theme.th}>Email</th>
                                {isDistributed && (
                                    <>
                                        <th className={Theme.th}>Команди</th>
                                        <th className={Theme.th}>Оцінено</th>
                                    </>
                                )}
                                {!isDistributed && <th className={Theme.th}></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((_, idx) => (
                                <tr key={idx} className="hover:bg-white/40 transition-colors">
                                    <td className={Theme.td}>Ім'я Прізвище</td>
                                    <td className={Theme.td + " text-slate-400 font-medium"}>example@gmail.com</td>

                                    {isDistributed ? (
                                        <>
                                            <td className={Theme.td}>
                                                <div className="text-[12px] leading-tight text-slate-500">
                                                    Назва команди<br />
                                                    Назва команды<br />
                                                    Назва команди
                                                </div>
                                            </td>
                                            <td className={Theme.td + " text-slate-300"}>N/M</td>
                                        </>
                                    ) : (
                                        <td className={Theme.td + " text-right"}>
                                            <button className={Theme.btnDelete}>Видалити</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!isDistributed && (
                    <button className={Theme.fabAdd}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="w-full xl:w-[320px] space-y-6">
                <div className={Theme.dateBox}>
                    <label className="text-[11px] font-black text-[#1e293b] uppercase tracking-widest">Дата та час старту</label>
                    <div className={Theme.dateInput}>
                        дд.мм.рррр <span className="text-slate-200">00:00</span>
                        <ClockIcon />
                    </div>
                </div>

                <div className={Theme.dateBox}>
                    <label className="text-[11px] font-black text-[#1e293b] uppercase tracking-widest">Дата та час завершення</label>
                    <div className={Theme.dateInput}>
                        дд.мм.рррр <span className="text-slate-200">00:00</span>
                        <ClockIcon />
                    </div>
                </div>

                <button className="w-full py-4 bg-[#5c75ff] text-white font-black rounded-[22px] shadow-lg shadow-[#5c75ff]/30 hover:brightness-110 active:scale-[0.98] transition-all text-[13px] uppercase tracking-wider mt-4">
                    Завершити
                </button>

                {isDistributed && (
                    <button
                        onClick={() => setIsDistributed(false)}
                        className="w-full py-3 text-slate-400 font-bold text-[12px] uppercase hover:text-slate-600 transition-colors"
                    >
                        Повернутись до списку жюри
                    </button>
                )}
            </div>
        </div>
    );
}

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);