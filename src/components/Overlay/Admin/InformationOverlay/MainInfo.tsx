import { useState } from "react";

const Theme = {
    title: "text-[28px] md:text-[32px] font-black text-[#1e293b] flex items-center gap-3 mb-6 md:mb-10",
    sectionLabel: "text-[18px] md:text-[22px] font-black text-[#1e293b] flex items-center gap-3 mb-4",
    textMuted: "text-[#64748b] text-[14px] md:text-[15px] font-medium leading-relaxed mb-8",
    editIcon: "w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity cursor-pointer",
    dateBox: "bg-white/80 p-5 md:p-6 rounded-[24px] md:rounded-[28px] border border-white shadow-sm w-full",
    dateInput: "flex items-center justify-between bg-white px-4 py-3 rounded-[15px] border border-slate-100 shadow-sm text-slate-400 font-bold text-[12px] md:text-[13px] mt-2",
    fileRow: "flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/50 backdrop-blur-md p-4 md:px-6 md:py-4 rounded-[22px] border border-white shadow-sm mt-4 gap-4",
    btnBlue: "w-full sm:w-auto px-8 py-2.5 bg-[#5c75ff] text-white font-black rounded-[18px] shadow-lg shadow-[#5c75ff]/25 text-[12px] uppercase",
    btnSave: "w-full sm:w-auto px-12 py-3.5 bg-white text-[#1e293b] font-black rounded-[20px] shadow-xl shadow-black/5 text-[13px] uppercase tracking-wider border border-white"
};

export default function MainInfo() {
    return (
        <div className="flex flex-col xl:flex-row gap-8 md:gap-12">
            <div className="flex-1 order-2 xl:order-1">
                <div className="group cursor-pointer">
                    <h1 className={Theme.title}>Назва раунду <EditIcon /></h1>
                </div>

                <div className="mb-10 group cursor-pointer">
                    <h2 className={Theme.sectionLabel}>Опис завдання: <EditIcon /></h2>
                    <p className={Theme.textMuted}>Текст опису завдання...</p>
                </div>

                <div className="mb-10 group cursor-pointer">
                    <h2 className={Theme.sectionLabel}>Вимоги до технологій: <EditIcon /></h2>
                    <p className={Theme.textMuted}>Текст вимог...</p>
                </div>

                <div className="mt-12">
                    <h2 className={Theme.sectionLabel}>Додаткові матеріали</h2>
                    <div className="flex gap-4 mb-6">
                        <ActionButton icon="link" />
                        <ActionButton icon="upload" />
                    </div>

                    <div className={Theme.fileRow}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#5c75ff]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                            </div>
                            <div className="overflow-hidden">
                                <div className="text-[#1e293b] font-black text-[14px] truncate">Назва_файлу.pdf</div>
                                <div className="text-slate-400 text-[11px] font-bold uppercase">Файл • 2.4 MB</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <button className={Theme.btnBlue}>Відкрити</button>
                            <button className="text-slate-300 hover:text-red-400 transition-colors"><TrashIcon /></button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center sm:justify-start">
                    <button className={Theme.btnSave}>Зберегти зміни</button>
                </div>
            </div>

            <div className="w-full xl:w-[320px] space-y-4 md:space-y-6 order-1 xl:order-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                    <div className={Theme.dateBox}>
                        <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-wider">Дата старту</label>
                        <div className={Theme.dateInput}>дд.мм.рррр 00:00 <ClockIcon /></div>
                    </div>
                    <div className={Theme.dateBox}>
                        <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-wider">Дата завершення</label>
                        <div className={Theme.dateInput}>дд.мм.рррр 00:00 <ClockIcon /></div>
                    </div>
                </div>

                <button className="w-full py-4 bg-[#5c75ff] text-white font-black rounded-[22px] shadow-lg shadow-[#5c75ff]/30 hover:brightness-110 active:scale-[0.98] transition-all text-[13px] uppercase tracking-wider mt-4">
                    Завершити раунд
                </button>
            </div>
        </div>
    );
}

const EditIcon = () => <svg className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
const ActionButton = ({ icon }: { icon: 'link' | 'upload' }) => (
    <button className="w-10 h-10 rounded-full bg-[#5c75ff] text-white flex items-center justify-center shadow-lg shadow-[#5c75ff]/20 hover:scale-110 active:scale-95 transition-all">
        {icon === 'link' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>}
    </button>
);