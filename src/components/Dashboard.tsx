import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamRegOverlay, { RegistrationHeader } from "./Overlay/teamRegOverlay";
import TourStatOverlay from "./Overlay/tourStatOverlay";
import TourViewOverlay from "./Overlay/tourViewOverlay";
import ProfileUserOverlay from "./Overlay/ProfileUserOverlay";

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

const AnnouncementIcon = () => (
        <img src="/Alert.png" alt="" />
);

interface TournamentCardProps {
    title: string;
    hasSubmit?: boolean;
    isTeamView?: boolean;
    onDetailClick: () => void;
}

const TournamentCard = ({ title, hasSubmit = false, isTeamView = false, onDetailClick }: TournamentCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="bg-white/40 backdrop-blur-[20px] rounded-[24px] p-6 md:p-7 border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.03)] flex flex-col h-full transition-all duration-300 relative overflow-hidden"
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
                {isTeamView ? "Дивитися" : "Детальніше"}
            </motion.button>
        </div>
    </motion.div>
);

const StandardHeader = ({ onHome, onProfileClick }: { onHome: () => void; onProfileClick: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        if (isNotifOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNotifOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 rounded-[16px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-black/5 flex items-center justify-between px-4 md:px-10 h-[68px] relative z-[60]"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-1 hover:bg-black/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <button onClick={onHome} className="hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="QTour Logo" className="h-[20px] md:h-[24px]" />
                    </button>
                </div>

                <nav className="hidden lg:flex gap-8 uppercase text-[13px] font-bold text-[#1e293b]">
                    <button onClick={onHome} className="hover:text-[#5c75ff] transition-colors">Мої турніри</button>
                    <button onClick={onHome} className="hover:text-[#5c75ff] transition-colors">Турніри</button>
                </nav>

                <div className="flex items-center gap-3 md:gap-5">
                    <div className="relative" ref={notifRef}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                            className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center shadow-lg shadow-[#5c75ff]/30 relative"
                        >
                            <BellIcon />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff4d4d] border-2 border-white rounded-full" />
                        </motion.button>

                        <AnimatePresence>
                            {isNotifOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 mt-4 w-[320px] bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-black/5 overflow-hidden"
                                >
                                    <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <AnnouncementIcon />
                                            <span className="text-[14px] font-bold text-[#1e293b]">Оголошення</span>
                                        </div>
                                        <button title = "BellICo" onClick={() => setIsNotifOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="max-h-[360px] overflow-y-auto">
                                        <div className="p-6 border-b border-black/5 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5c75ff] mt-2 shrink-0" />
                                                <div>
                                                    <h4 className="text-[14px] font-bold text-[#1e293b]">Заголовок</h4>
                                                    <p className="text-[13px] text-[#1e293b]/60 leading-snug">Текст оголошення, який пояснює суть події.</p>
                                                    <span className="text-[10px] font-bold text-black/20 uppercase mt-2 block">Щойно</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className="ml-4">
                                                <h4 className="text-[14px] font-bold text-[#1e293b]">Заголовок</h4>
                                                <p className="text-[13px] text-[#1e293b]/60 leading-snug">Текст</p>
                                                <a href="#" className="text-[12px] text-[#5c75ff] font-bold hover:underline">посилання</a>
                                                <span className="text-[10px] font-bold text-black/20 uppercase mt-2 block">1 день тому</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div 
                        onClick={onProfileClick}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <span className="hidden sm:block text-[14px] font-bold text-[#1e293b] group-hover:text-[#5c75ff] transition-colors">Ім'я</span>
                        <div className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center text-white font-bold text-[14px] shadow-lg shadow-[#5c75ff]/30 group-hover:brightness-110 transition-all">
                            І
                        </div>
                    </div>

                    <button className="bg-[#5c75ff] text-white px-5 h-9 rounded-[10px] font-bold text-[13px] hover:brightness-110 active:brightness-95 transition-all">
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

const TournamentsList = ({ onDetailClick, onTeamDetailClick }: { onDetailClick: () => void; onTeamDetailClick: () => void }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement | null>(null);
    const filterBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (isFilterOpen && filterRef.current && !filterRef.current.contains(e.target as Node) && filterBtnRef.current && !filterBtnRef.current.contains(e.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [isFilterOpen]);

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 space-y-10">
            <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10 shadow-sm relative overflow-hidden">
                <h2 className="text-[22px] md:text-[28px] font-bold mb-8">Ваші турніри</h2>
                <div className="w-full max-w-[340px]">
                    <TournamentCard title="Назва" hasSubmit isTeamView onDetailClick={onTeamDetailClick} />
                </div>
            </section>

            <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-10 pt-1">
                    <h2 className="text-[22px] md:text-[28px] font-bold">Турніри</h2>
                    <div className="relative">
                        <motion.button
                            ref={filterBtnRef}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
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
                    {[...Array(6)].map((_, i) => <TournamentCard key={i} title="Назва" onDetailClick={onDetailClick} />)}
                </div>
            </section>
        </motion.main>
    );
};

export default function Dashboard() {
    const [showDetails, setShowDetails] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [viewingTournamentAsTeam, setViewingTournamentAsTeam] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const resetView = () => {
        setShowDetails(false);
        setIsRegistering(false);
        setViewingTournamentAsTeam(false);
        setShowProfile(false);
    };

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden bg-[#f4f7fa] font-roboto antialiased text-[#1e293b]">
            <RobotoFont />

            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div animate={{ x: [0, 40, 0], y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#C1E130] blur-[120px] opacity-[0.18]" />
                <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[#0C13D4] blur-[140px] opacity-[0.12]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                {isRegistering || viewingTournamentAsTeam ? (
                    <RegistrationHeader onBack={resetView} />
                ) : (
                    <StandardHeader 
                        onHome={resetView} 
                        onProfileClick={() => { resetView(); setShowProfile(true); }} 
                    />
                )}

                <AnimatePresence mode="wait">
                    {showProfile ? (
                        <ProfileUserOverlay key="profile" />
                    ) : viewingTournamentAsTeam ? (
                        <TourViewOverlay key="viewTeam" onBack={resetView} />
                    ) : isRegistering ? (
                        <TeamRegOverlay key="register" />
                    ) : !showDetails ? (
                        <TournamentsList
                            key="list"
                            onDetailClick={() => setShowDetails(true)}
                            onTeamDetailClick={() => setViewingTournamentAsTeam(true)}
                        />
                    ) : (
                        <TourStatOverlay key="details" onRegister={() => setIsRegistering(true)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}