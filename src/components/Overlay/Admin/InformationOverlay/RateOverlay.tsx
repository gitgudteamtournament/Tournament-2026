import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Theme = {
    title: "text-[28px] md:text-[32px] font-black text-[#1e293b] mb-6 md:mb-10",
    sectionLabel: "text-[20px] md:text-[22px] font-black text-[#1e293b]",
    dateBox: "bg-white/80 p-5 md:p-6 rounded-[24px] md:rounded-[28px] border border-white shadow-sm w-full",
    dateInput: "flex items-center justify-between bg-white px-4 py-3 rounded-[16px] border border-slate-100 shadow-sm text-slate-300 font-bold text-[13px] mt-2",
    tableCard: "bg-white/60 backdrop-blur-md rounded-[24px] md:rounded-[32px] border border-white shadow-sm overflow-hidden",
    th: "text-left py-4 px-4 md:px-8 text-[13px] md:text-[14px] font-black text-[#1e293b] border-b border-slate-100 whitespace-nowrap",
    td: "py-4 px-4 md:px-8 text-[13px] md:text-[14px] font-bold text-[#1e293b] border-b border-slate-50 last:border-0",
    btnBlue: "px-5 py-2.5 bg-[#5c75ff] text-white font-black rounded-[16px] shadow-lg shadow-[#5c75ff]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-[11px] md:text-[12px] uppercase",
    btnDelete: "px-4 py-2 bg-white text-[#5c75ff] font-black rounded-[14px] border border-[#5c75ff]/20 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all text-[11px] uppercase",
    fabAdd: "fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#5c75ff] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#5c75ff]/40 hover:scale-110 active:scale-95 transition-all z-20"
};

export default function RateOverlay() {
    const [isDistributed, setIsDistributed] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative min-h-full pb-20 lg:pb-0">
            <div className="flex-1 min-w-0">
                <h1 className={Theme.title}>Оцінювання</h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className={Theme.sectionLabel}>Журі</h2>
                    {!isDistributed && (
                        <button
                            onClick={() => setIsDistributed(true)}
                            className={Theme.btnBlue + " self-start sm:self-auto"}
                        >
                            Розподілити роботи
                        </button>
                    )}
                </div>

                <div className={Theme.tableCard}>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[600px] lg:min-w-full">
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
                                                        Назва команди<br />
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
                </div>

                {!isDistributed && (
                    <button className={Theme.fabAdd}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="w-full lg:w-[320px] flex flex-col gap-4 md:gap-6 shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                    <div className={Theme.dateBox}>
                        <label className="text-[10px] md:text-[11px] font-black text-[#1e293b] uppercase tracking-widest">Дата та час старту</label>
                        <div className={Theme.dateInput}>
                            дд.мм.рррр <span className="text-slate-200">00:00</span>
                            <ClockIcon />
                        </div>
                    </div>

                    <div className={Theme.dateBox}>
                        <label className="text-[10px] md:text-[11px] font-black text-[#1e293b] uppercase tracking-widest">Дата та час завершення</label>
                        <div className={Theme.dateInput}>
                            дд.мм.рррр <span className="text-slate-200">00:00</span>
                            <ClockIcon />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-full py-4 bg-[#5c75ff] text-white font-black rounded-[20px] md:rounded-[22px] shadow-lg shadow-[#5c75ff]/30 hover:brightness-110 active:scale-[0.98] transition-all text-[13px] uppercase tracking-wider">
                        Завершити
                    </button>

                    {isDistributed && (
                        <button
                            onClick={() => setIsDistributed(false)}
                            className="w-full py-2 text-slate-400 font-bold text-[11px] md:text-[12px] uppercase hover:text-[#5c75ff] transition-colors"
                        >
                            Повернутись до списку жюри
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);