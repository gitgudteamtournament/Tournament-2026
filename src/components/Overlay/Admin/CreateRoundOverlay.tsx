import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CreateRoundProps {
    onClose: () => void;
    onSave?: (data: any) => void;
}

const Theme = {
    overlay: "fixed inset-0 z-[1200] flex items-center justify-center p-4 md:p-8 bg-slate-900/10 backdrop-blur-md",
    card: "bg-white/70 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-full max-w-[1000px] max-h-[92vh] overflow-y-auto custom-scrollbar relative",
    sectionCard: "bg-white/50 p-8 rounded-[32px] border border-white/60 shadow-sm mb-6",
    label: "text-[14px] font-bold mb-3 block text-[#1e293b]",
    input: "w-full bg-white px-5 py-4 rounded-[18px] border border-slate-100 shadow-sm focus:outline-none focus:border-[#5c75ff] transition-all text-[15px] font-medium text-slate-700 placeholder:text-slate-300",
    textarea: "w-full bg-white px-5 py-4 rounded-[22px] border border-slate-100 shadow-sm focus:outline-none focus:border-[#5c75ff] transition-all text-[15px] font-medium text-slate-700 placeholder:text-slate-300 min-h-[120px] resize-none",
    btnPrimary: "px-10 py-4 bg-[#5c75ff] text-white font-bold rounded-[20px] shadow-lg shadow-[#5c75ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50",
    btnSecondary: "px-10 py-4 bg-white text-slate-600 font-bold rounded-[20px] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all",
    plusBtn: "w-10 h-10 bg-[#5c75ff] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-white border-none cursor-pointer",
};

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 pointer-events-none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 pointer-events-none"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

export default function CreateRoundOverlay({ onClose, onSave }: CreateRoundProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [mustHaves, setMustHaves] = useState([{ id: Date.now(), value: "" }]);
    const [files, setFiles] = useState<{ id: number; name: string; type: string; url?: string }[]>([]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const addMustHave = () => setMustHaves([...mustHaves, { id: Date.now(), value: "" }]);
    const updateMustHave = (id: number, val: string) => {
        setMustHaves(mustHaves.map(item => item.id === id ? { ...item, value: val } : item));
    };
    const removeMustHave = (id: number) => {
        if (mustHaves.length > 1) setMustHaves(mustHaves.filter(item => item.id !== id));
    };

    const addLink = () => {
        const url = prompt("Введіть посилання:");
        if (url) setFiles([...files, { id: Date.now(), name: url, type: "Посилання", url }]);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles([...files, { id: Date.now(), name: file.name, type: file.type.split('/')[1].toUpperCase() || "Файл" }]);
        }
    };

    const handleCreate = () => {
        const data = { title, description, techStack, startDate, endDate, mustHaves, files };
        console.log("Saving round:", data);
        onSave?.(data);
    };

    return (
        <div className={Theme.overlay}>
            <motion.div className="fixed inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />

            <motion.div
                className={Theme.card}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={onClose} className="text-slate-400 hover:text-[#5c75ff] transition-colors flex items-center gap-2 font-bold text-[12px] uppercase tracking-wider border-none bg-transparent cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
                        До турніру
                    </button>
                    <span className="text-slate-900 font-black text-[18px]">Назва турніру</span>
                </div>

                <h1 className="text-[32px] font-black text-[#1e293b] mb-10">Створення раунду</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className={Theme.sectionCard}>
                            <h2 className="text-[22px] font-black text-[#1e293b] mb-8">Основна інформація</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className={Theme.label}>Назва<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Введіть назву"
                                        className={Theme.input}
                                    />
                                </div>

                                <div>
                                    <label className={Theme.label}>Опис завдання<span className="text-red-500">*</span></label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Опишіть завдання"
                                        className={Theme.textarea}
                                    />
                                </div>

                                <div>
                                    <label className={Theme.label}>Критерії "must have"<span className="text-red-500">*</span></label>
                                    <div className="space-y-3">
                                        {mustHaves.map((item, index) => (
                                            <div key={item.id} className="flex gap-3 items-center">
                                                <span className="text-slate-400 font-bold min-w-[20px]">{index + 1}</span>
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    onChange={(e) => updateMustHave(item.id, e.target.value)}
                                                    placeholder="Вимога"
                                                    className={Theme.input}
                                                />
                                                <button onClick={() => removeMustHave(item.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer">
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={addMustHave} className={Theme.plusBtn}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={Theme.label}>Додаткові матеріали</label>
                                    <div className="flex gap-3 mb-6">
                                        <button onClick={addLink} className="w-12 h-12 bg-[#5c75ff] rounded-full flex items-center justify-center text-white shadow-lg border-none cursor-pointer hover:scale-105 transition-transform">
                                            <img src="/LinkWhite.png" alt="" />
                                        </button>
                                        <label className="w-12 h-12 bg-[#5c75ff] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                            <input type="file" className="hidden" onChange={handleFileUpload} />
                                            <img src="/Cloud.png" alt="" />
                                        </label>
                                    </div>
                                    <div className="space-y-3">
                                        {files.map(file => (
                                            <div key={file.id} className="flex items-center gap-4 bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#5c75ff]">
                                                    <img src="/File.svg" alt="" />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="font-bold text-[#1e293b] text-[14px] truncate">{file.name}</div>
                                                    <div className="text-[11px] text-slate-400 uppercase font-bold">{file.type}</div>
                                                </div>
                                                <button
                                                    onClick={() => setFiles(files.filter(f => f.id !== file.id))}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[320px] space-y-6">
                        <div className="bg-white/50 p-6 rounded-[32px] border border-white/60 shadow-sm">
                            <label className={Theme.label}>Дата та час старту</label>
                            <div className="relative flex items-center bg-white px-4 py-3 rounded-[18px] border border-slate-50 shadow-sm">
                                <CalendarIcon />
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-[13px] font-bold text-[#1e293b] ml-2"
                                />
                            </div>
                        </div>

                        <div className="bg-white/50 p-6 rounded-[32px] border border-white/60 shadow-sm">
                            <label className={Theme.label}>Дата та час завершення</label>
                            <div className="relative flex items-center bg-white px-4 py-3 rounded-[18px] border border-slate-50 shadow-sm">
                                <CalendarIcon />
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-[13px] font-bold text-[#1e293b] ml-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pt-10 border-t border-white/30">
                    <button onClick={handleCreate} className={Theme.btnPrimary}>Створити</button>
                    <button onClick={onClose} className={Theme.btnSecondary}>Скасувати</button>
                </div>
            </motion.div>
        </div>
    );
}