import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Theme = {
    title: "text-[32px] font-black text-[#1e293b] mb-6",
    sectionLabel: "text-[22px] font-black text-[#1e293b] mb-4",
    textMuted: "text-[#64748b] text-[15px] font-medium leading-relaxed max-w-[600px] mb-8",
    fileRow: "flex items-center justify-between bg-white/50 backdrop-blur-md px-8 py-5 rounded-[28px] border border-white shadow-sm mb-8 w-full max-w-[800px]",
    btnBlue: "px-10 py-3.5 bg-[#5c75ff] text-white font-black rounded-[20px] shadow-lg shadow-[#5c75ff]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-[14px] uppercase tracking-wider",
    btnAction: "px-8 py-3 bg-[#5c75ff] text-white font-black rounded-[18px] hover:brightness-110 transition-all text-[13px] uppercase",
    btnSecondary: "px-8 py-3 bg-white/80 text-[#1e293b] font-black rounded-[18px] border border-white hover:bg-white transition-all text-[13px] uppercase shadow-sm"
};

export default function CertificateOverlay() {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-full flex flex-col">
            <h1 className={Theme.title}>Сертифікат</h1>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.png"
            />

            <AnimatePresence mode="wait">
                {!file ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <p className={Theme.textMuted}>
                            Додайте шаблон сертифіката для цього раунду. <br /><br />
                            Завантажте файл, який буде використано для автоматичного створення сертифікатів учасників після завершення оцінювання.
                        </p>

                        <button
                            onClick={triggerUpload}
                            className={Theme.btnBlue}
                        >
                            Додати шаблон
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loaded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                    >
                        <div className={Theme.fileRow}>
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5c75ff] shadow-sm">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#1e293b] font-black text-[16px]">{file.name}</div>
                                    <div className="text-slate-400 text-[12px] font-bold uppercase tracking-tight">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </div>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-[#5c75ff]/10 text-[#5c75ff] font-black rounded-xl hover:bg-[#5c75ff] hover:text-white transition-all text-[12px] uppercase">
                                Відкрити
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button className={Theme.btnAction}>Видати</button>
                            <button
                                onClick={triggerUpload}
                                className={Theme.btnSecondary}
                            >
                                Замінити
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}