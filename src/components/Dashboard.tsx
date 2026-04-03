import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamRegOverlay, { RegistrationHeader } from "./Overlay/teamRegOverlay";
import TourStatOverlay from "./Overlay/tourStatOverlay";
import TourViewOverlay from "./Overlay/tourViewOverlay";
import ProfileUserOverlay from "./Overlay/ProfileUserOverlay";
import DashboardUserOverlay from "./Overlay/DashboardUserOverlay";
import DashboardAdminOverlay from "./Overlay/DashboardAdminOverlay";
import LeaderboardOverlay from "./Overlay/LeaderboardOverlay";

const CURRENT_USER_ROLE: 'Admin' | 'User' = 'Admin'; 

const RobotoFont = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        .font-roboto { font-family: 'Roboto', sans-serif; }
        html { overflow-y: scroll; height: 100%; }
        body { min-height: 100%; margin: 0; padding: 0; }
    `}} />
);

const BellIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const AnnouncementIcon = () => (
    <img src="/Alert.png" alt="" />
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = ({ size = 24, color = "#1e293b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
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
                className="mt-6 rounded-[16px] bg-white shadow-sm border border-black/5 flex items-center justify-between px-4 md:px-10 h-[68px] relative z-[60]"
            >
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-1 hover:bg-black/5 rounded-lg transition-colors">
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <button onClick={onHome} className="hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="Logo" className="h-[20px] md:h-[24px]" />
                    </button>
                </div>

                <nav className="hidden lg:flex gap-8 uppercase text-[13px] font-bold text-[#1e293b]">
                    <button onClick={onHome} className="hover:text-[#5c75ff] transition-colors">
                        {CURRENT_USER_ROLE === 'Admin' ? 'Керування' : 'Мої турніри'}
                    </button>
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
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-[320px] bg-white rounded-[20px] shadow-2xl border border-black/5 overflow-hidden z-[70]"
                                >
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                        <div className="flex items-center gap-2 text-[#1e293b]">
                                            <AnnouncementIcon />
                                            <span className="font-bold text-[16px]">Оголошення</span>
                                        </div>
                                        <button onClick={() => setIsNotifOpen(false)} className="hover:opacity-60 transition-opacity">
                                            <CloseIcon size={20} />
                                        </button>
                                    </div>

                                    <div className="max-h-[400px] overflow-y-auto">
                                        <div className="px-5 py-4 relative hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <div className="absolute left-2 top-6 w-1.5 h-1.5 bg-[#5c75ff] rounded-full" />
                                            <h4 className="font-bold text-[15px] text-[#1e293b] mb-1">Заголовок</h4>
                                            <p className="text-[14px] text-slate-600 leading-snug mb-2">Текст уведомления, который может занимать несколько строк.</p>
                                            <span className="text-[12px] text-slate-400">Щойно</span>
                                        </div>

                                        <div className="mx-5 border-b border-gray-100" />

                                        <div className="px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <h4 className="font-bold text-[15px] text-[#1e293b] mb-1">Заголовок</h4>
                                            <p className="text-[14px] text-slate-600 leading-snug">Текст</p>
                                            <button className="text-[#5c75ff] text-[14px] font-medium hover:underline block mb-2">посилання</button>
                                            <span className="text-[12px] text-slate-400">1 день тому</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button onClick={onProfileClick} className="flex items-center gap-3 group">
                        <span className="hidden sm:block text-[14px] font-bold text-[#1e293b] group-hover:text-[#5c75ff] transition-colors">Ім'я</span>
                        <div className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center text-white font-bold shadow-lg shadow-[#5c75ff]/30 group-hover:brightness-110 transition-all">І</div>
                    </button>

                    <button className="bg-[#5c75ff] text-white px-5 h-9 rounded-[10px] font-bold text-[13px] hover:brightness-110 transition-all">Вихід</button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden" />
                        <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 bottom-0 w-64 bg-white z-[58] p-8 pt-24 shadow-2xl lg:hidden">
                            <nav className="flex flex-col gap-6 uppercase text-sm font-bold">
                                <button onClick={() => { onHome(); setIsMenuOpen(false); }}>Головна</button>
                                <button onClick={() => { onHome(); setIsMenuOpen(false); }}>Турніри</button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default function Dashboard() {
    type ViewType = 'main' | 'details' | 'register' | 'teamView' | 'profile' | 'leaderboard';
    const [view, setView] = useState<ViewType>('main');
    
    const resetView = () => setView('main');

    return (
        <div className="min-h-screen w-full relative bg-[#f4f7fa] font-roboto antialiased text-[#1e293b]">
            <RobotoFont />
            
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div animate={{ x: [0, 40, 0], y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#C1E130] blur-[120px] opacity-[0.18]" />
                <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[#0C13D4] blur-[140px] opacity-[0.12]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                {view === 'register' || view === 'teamView' ? (
                    <RegistrationHeader onBack={resetView} />
                ) : (
                    <StandardHeader onHome={resetView} onProfileClick={() => setView('profile')} />
                )}

                <AnimatePresence mode="wait">
                    {view === 'main' && (
                        CURRENT_USER_ROLE === 'Admin' 
                            ? <DashboardAdminOverlay key="admin" />
                            : <DashboardUserOverlay 
                                key="user" 
                                onDetailClick={() => setView('details')} 
                                onTeamDetailClick={() => setView('teamView')} 
                              />
                    )}

                    {view === 'profile' && <ProfileUserOverlay key="profile" />}
                    {view === 'teamView' && <TourViewOverlay key="team" onBack={resetView} />}
                    {view === 'register' && <TeamRegOverlay key="register" />}
                    {view === 'details' && (
                        <TourStatOverlay 
                            key="details" 
                            onRegister={() => setView('register')} 
                            onLeaderboardClick={() => setView('leaderboard')} 
                        />
                    )}
                    {view === 'leaderboard' && (
                        <LeaderboardOverlay 
                            key="leaderboard" 
                            onBack={() => setView('details')} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}