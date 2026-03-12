import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RobotoFont = () => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
.font-roboto { font-family: 'Roboto', sans-serif; }
`,
        }}
    />
);

const BellIcon = () => (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const FilterIcon = () => (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const ChevronIcon = () => (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const MenuIcon = () => (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

interface Participant {
    id: string;
    name: string;
    email: string;
    city: string;
    school: string;
}

interface TournamentCardProps {
    title: string;
    hasSubmit?: boolean;
    onDetailClick: () => void;
}

const TournamentCard = ({ title, hasSubmit = false, onDetailClick }: TournamentCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="bg-white/40 backdrop-blur-[20px] rounded-[24px] p-6 md:p-7 border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.03)] flex flex-col h-full transition-all duration-300"
    >
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#0f172a] mb-4">{title}</h3>
        <div className="space-y-1.5 text-[13px] md:text-[14px] font-medium text-[#1e293b]/80 mb-8 leading-tight">
            <p>Статус:</p>
            <p>Раунд:</p>
            <p>Дедлайн:</p>
            {hasSubmit && <p>Статус сабміту:</p>}
        </div>
        <div className="mt-auto flex justify-end">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDetailClick}
                className="bg-[#5c75ff] text-white font-bold py-2 px-5 md:px-6 rounded-[10px] shadow-[0_8px_16px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all text-[12px]"
            >
                Детальніше
            </motion.button>
        </div>
    </motion.div>
);

const StandardHeader = ({ onHome }: { onHome: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 rounded-[16px] bg-[#FFFFFF26] backdrop-blur-[25px] border border-white/40 shadow-sm flex items-center justify-between px-4 md:px-10 h-[68px] relative z-[60]"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
                        className="lg:hidden p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <button onClick={onHome} className="hover:opacity-80 transition-opacity" aria-label="На головну">
                        <img src="/logo.png" alt="QTour Logo" className="h-[20px] md:h-[24px]" />
                    </button>
                </div>

                <nav className="hidden lg:flex gap-8 uppercase text-[13px] font-bold">
                    <button onClick={onHome} className="hover:text-[#5c75ff] transition-colors">Мої турніри</button>
                    <button onClick={onHome} className="hover:text-[#5c75ff] transition-colors">Турніри</button>
                </nav>

                <div className="flex items-center gap-3 md:gap-5">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        aria-label="Сповіщення"
                        className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center shadow-lg shadow-[#5c75ff]/30"
                    >
                        <BellIcon />
                    </motion.button>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-[14px] font-bold text-[#1e293b]">Ім'я</span>
                        <div className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center text-white font-bold text-[14px] shadow-lg">
                            І
                        </div>
                    </div>

                    <button className="bg-[#5c75ff] text-white px-5 h-9 rounded-[10px] font-bold text-[13px] hover:brightness-110 transition-all">
                        Вихід
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white/90 backdrop-blur-[30px] z-[58] lg:hidden p-8 pt-24 shadow-2xl"
                        >
                            <nav className="flex flex-col gap-6 uppercase text-[16px] font-bold">
                                <button onClick={() => { onHome(); setIsMenuOpen(false); }} className="text-left hover:text-[#5c75ff] transition-colors">Мої турніри</button>
                                <button onClick={() => { onHome(); setIsMenuOpen(false); }} className="text-left hover:text-[#5c75ff] transition-colors">Турніри</button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const RegistrationHeader = ({ onBack }: { onBack: () => void }) => (
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

export default function Dashboard() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("showDetails") === "true" : false));
    const [isRegistering, setIsRegistering] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("isRegistering") === "true" : false));
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

    const filterRef = useRef<HTMLDivElement | null>(null);
    const filterBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        localStorage.setItem("showDetails", String(showDetails));
        localStorage.setItem("isRegistering", String(isRegistering));
        localStorage.setItem("participants", JSON.stringify(participants));
    }, [showDetails, isRegistering, participants]);

    const resetView = () => { setShowDetails(false); setIsRegistering(false); };

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (isFilterOpen && filterRef.current && !filterRef.current.contains(e.target as Node) && filterBtnRef.current && !filterBtnRef.current.contains(e.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [isFilterOpen]);

    const addParticipant = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setParticipants((prev) => [...prev, { id: newId, name: "", email: "", city: "", school: "" }]);
    };

    const removeParticipant = (id: string) => setParticipants((prev) => prev.filter((p) => p.id !== id));

    const updateParticipant = (id: string, field: keyof Participant, value: string) => {
        setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden bg-[#f4f7fa] font-roboto antialiased text-[#1e293b]">
            <RobotoFont />

            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div animate={{ x: [0, 40, 0], y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#C1E130] blur-[120px] opacity-[0.18]" />
                <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[#0C13D4] blur-[140px] opacity-[0.12]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                {isRegistering ? <RegistrationHeader onBack={() => setIsRegistering(false)} /> : <StandardHeader onHome={resetView} />}

                <AnimatePresence mode="wait">
                    {isRegistering ? (
                        <motion.main key="register" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-[1000px] mx-auto mt-8 space-y-8">
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
                    ) : !showDetails ? (
                        <motion.main key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 space-y-10">
                            <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10 shadow-sm">
                                <h2 className="text-[22px] md:text-[28px] font-bold mb-8">Ваші турніри</h2>
                                <div className="w-full max-w-[340px]">
                                    <TournamentCard title="Назва" hasSubmit onDetailClick={() => setShowDetails(true)} />
                                </div>
                            </section>

                            <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10 relative">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-[22px] md:text-[28px] font-bold">Турніри</h2>
                                    <div className="relative">
                                        <motion.button
                                            ref={filterBtnRef}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                            aria-label="Фільтрувати турніри"
                                            className="w-[54px] h-[36px] rounded-[10px] bg-[#5c75ff] flex items-center justify-center gap-1 shadow-md hover:brightness-110 transition-all"
                                        >
                                            <ChevronIcon /><FilterIcon />
                                        </motion.button>
                                        <AnimatePresence>
                                            {isFilterOpen && (
                                                <motion.div ref={filterRef} initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} className="absolute right-0 mt-3 w-[220px] bg-white/80 backdrop-blur-[20px] border border-white/60 rounded-[20px] shadow-xl z-50 overflow-hidden py-2">
                                                    {["Registration open", "Running", "Finished"].map((item) => (
                                                        <button key={item} onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-3 hover:bg-[#5c75ff]/10 text-[15px] font-bold text-[#1e293b] transition-colors">{item}</button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {[...Array(6)].map((_, i) => <TournamentCard key={i} title="Назва" onDetailClick={() => setShowDetails(true)} />)}
                                </div>
                            </section>
                        </motion.main>
                    ) : (
                        <motion.main key="details" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-8 space-y-6">
                            <div className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-8 md:p-12 shadow-sm">
                                <div className="flex flex-col lg:flex-row justify-between gap-8">
                                    <div className="flex-1">
                                        <h2 className="text-[32px] md:text-[48px] font-bold mb-4">Назва</h2>
                                        <p className="text-[16px] md:text-[18px] text-[#1e293b]/70 font-medium mb-10">Опис турніру</p>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsRegistering(true)} className="bg-[#5c75ff] text-white font-bold py-3 px-12 rounded-[12px] shadow-lg hover:brightness-110 transition-all">Продовжити</motion.button>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full lg:w-[280px]">
                                        <div className="bg-white/40 border border-white/60 rounded-[20px] p-5 shadow-sm min-h-[80px]">
                                            <p className="text-[10px] font-bold text-[#1e293b]/50 uppercase tracking-widest">Статус</p>
                                        </div>
                                        <div className="bg-white/40 border border-white/60 rounded-[20px] p-5 shadow-sm min-h-[80px]">
                                            <p className="text-[10px] font-bold text-[#1e293b]/50 uppercase tracking-widest">Тривалість</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-8 md:p-12 space-y-12 shadow-sm">
                                <section><h3 className="text-[24px] md:text-[30px] font-bold mb-4">Про турнір</h3><p className="text-[#1e293b]/80 font-medium">Текст опису</p></section>
                                <section><h3 className="text-[24px] md:text-[30px] font-bold mb-4">Мета турніру</h3><p className="text-[#1e293b]/80 font-medium">Текст мети</p></section>
                            </div>
                        </motion.main>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}