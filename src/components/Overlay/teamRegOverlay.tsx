import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Participant {
    id: string;
    name: string;
    email: string;
    city: string;
    school: string;
}

export const RegistrationHeader = ({ onBack }: { onBack: () => void }) => (
    <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-6 rounded-[16px] bg-[#FFFFFF26] backdrop-blur-[25px] border border-white/40 shadow-sm flex items-center px-4 py-3 h-[68px]"
    >
        <div className="flex-1 flex justify-start">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="bg-[#5c75ff] text-white font-bold py-2 px-6 rounded-[12px] shadow-lg hover:brightness-110 transition-all text-[13px]"
            >
                Повернутися
            </motion.button>
        </div>
        <div className="flex-shrink-0">
            <img src="/logo.png" alt="QTour Logo" className="h-[22px] md:h-[24px]" />
        </div>
        <div className="flex-1" />
    </motion.header>
);

export default function TeamRegOverlay() {
    const [participants, setParticipants] = useState<Participant[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("participants");
            return saved ? JSON.parse(saved) : [
                { id: "1", name: "", email: "", city: "", school: "" },
                { id: "2", name: "", email: "", city: "", school: "" },
                { id: "3", name: "", email: "", city: "", school: "" },
            ];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("participants", JSON.stringify(participants));
    }, [participants]);

    const addParticipant = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setParticipants((prev) => [...prev, { id: newId, name: "", email: "", city: "", school: "" }]);
    };

    const removeParticipant = (id: string) => setParticipants((prev) => prev.filter((p) => p.id !== id));

    const updateParticipant = (id: string, field: keyof Participant, value: string) => {
        setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    return (
        <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-[1000px] mx-auto mt-8 space-y-8">
            <section className="bg-white/40 backdrop-blur-[35px] border border-white/50 rounded-[30px] p-8 md:p-12 text-center">
                <h1 className="text-[28px] md:text-[36px] font-bold text-[#0f172a] mb-8">Назва турніру</h1>
                <div className="text-left">
                    <h2 className="text-[20px] font-bold text-[#0f172a] mb-2">Реєстрація команди</h2>
                    <p className="text-[14px] font-medium text-[#1e293b]/70 leading-relaxed">Заповніть форму для реєстрації команди в турнірі.</p>
                </div>
            </section>

            <section className="bg-white/40 backdrop-blur-[35px] border border-white/50 rounded-[30px] p-8 md:p-12 shadow-sm">
                <h2 className="text-[24px] font-bold text-[#0f172a] text-center mb-10">Інформація про команду</h2>
                <div className="max-w-[600px] mx-auto space-y-6">
                    {["Назва команди *", "ПІБ капітана *", "Email капітана *"].map((label) => (
                        <div key={label}>
                            <label className="block text-[13px] font-bold text-[#1e293b] mb-2 ml-1">{label}</label>
                            <input
                                type="text"
                                placeholder={label}
                                className="w-full h-[48px] rounded-[16px] bg-white/70 border border-white shadow-sm px-5 focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/40 transition-all"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white/40 backdrop-blur-[35px] border border-white/50 rounded-[30px] p-8 md:p-12 shadow-sm">
                <h2 className="text-[24px] font-bold text-[#0f172a] text-center mb-10">Інформація про учасників</h2>
                <div className="max-w-[600px] mx-auto space-y-12">
                    <AnimatePresence initial={false}>
                        {participants.map((p, i) => (
                            <motion.div key={p.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-6 relative overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[15px] font-bold">Учасник {i + 1}</h3>
                                    {participants.length > 1 && (
                                        <button
                                            onClick={() => removeParticipant(p.id)}
                                            aria-label={`Видалити учасника ${i + 1}`}
                                            className="text-[#1e293b]/40 hover:text-red-500 transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                        </button>
                                    )}
                                </div>
                                <input value={p.name} onChange={(e) => updateParticipant(p.id, "name", e.target.value)} placeholder="ПІБ учасника *" className="w-full h-[48px] rounded-[16px] bg-white/70 border border-white px-5 focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/40 transition-all placeholder:text-[#1e293b]/40" />
                                <input value={p.email} onChange={(e) => updateParticipant(p.id, "email", e.target.value)} placeholder="Email учасника *" className="w-full h-[48px] rounded-[16px] bg-white/70 border border-white px-5 focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/40 transition-all placeholder:text-[#1e293b]/40" />
                                <input value={p.city} onChange={(e) => updateParticipant(p.id, "city", e.target.value)} placeholder="Місто проживання *" className="w-full h-[48px] rounded-[16px] bg-white/70 border border-white px-5 focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/40 transition-all placeholder:text-[#1e293b]/40" />
                                <input value={p.school} onChange={(e) => updateParticipant(p.id, "school", e.target.value)} placeholder="Школа/організація *" className="w-full h-[48px] rounded-[16px] bg-white/70 border border-white px-5 focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/40 transition-all placeholder:text-[#1e293b]/40" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={addParticipant} className="bg-[#5c75ff] text-white font-bold py-2.5 px-6 rounded-[12px] shadow-md hover:brightness-110 active:scale-95 transition-all text-[13px]">
                        Додати учасника
                    </motion.button>
                </div>
            </section>

            <div className="flex justify-center mt-12 mb-10">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#5c75ff] text-white font-bold py-4 px-16 rounded-[16px] shadow-xl hover:brightness-110 transition-all text-[16px]">
                    Зареєструватися
                </motion.button>
            </div>
        </motion.main>
    );
}