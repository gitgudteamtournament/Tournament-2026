import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoCertificateOverlay from "./NoCertificateOverlay";
import CalendarOverlay from "./CalendarOverlay";

const BackChevronIcon = () => (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="#5c75ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 1 1 5l4 4" />
    </svg>
);

const DownChevronIcon = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m1 1 4 4 4-4" />
    </svg>
);

const FileIcon = () => <img src="/File.svg" alt="" />;
const LinkIcon = () => <img src="/Link.svg" alt="" />;
const GitHubIcon = () => <img src="/Github.png" alt="" className="w-5 h-5 object-contain" />;
const PlayIcon = () => <img src="/Play.png" alt="" className="w-5 h-5 object-contain" />;
const WebIcon = () => <img src="/Link.svg" alt="" className="w-5 h-5 object-contain" />;

const SuccessIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#5c75ff" />
        <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface SidebarButtonProps {
    title: string;
    isExpandable?: boolean;
    isExpanded?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const SidebarButton = ({ title, isExpandable = false, isExpanded = false, isActive = false, onClick, children }: SidebarButtonProps) => (
    <div className="space-y-3">
        <button
            onClick={onClick}
            className={`w-full h-[48px] px-5 rounded-[12px] border flex items-center justify-between shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5c75ff]/20 transition-all ${isActive ? 'bg-[#5c75ff]/5 border-[#5c75ff]/10' : 'bg-white border-white hover:border-[#5c75ff]/10'}`}
        >
            <span className={`text-[15px] font-bold ${isActive ? 'text-[#5c75ff]' : 'text-[#1e293b]'}`}>{title}</span>
            {isExpandable && (
                <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <DownChevronIcon />
                </motion.div>
            )}
        </button>
        <AnimatePresence>
            {isExpandable && isExpanded && children && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="overflow-hidden space-y-3"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const SidebarSubButton = ({ title, isActive, onClick }: { title: string; isActive?: boolean; onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`w-[calc(100%-12px)] h-[38px] px-4 rounded-[10px] border flex items-center shadow-sm ml-auto transition-colors ${isActive ? 'bg-[#5c75ff]/10 border-[#5c75ff]/20' : 'bg-white border-white hover:border-[#5c75ff]/10'}`}
    >
        <span className={`text-[13px] font-medium ${isActive ? 'text-[#5c75ff]' : 'text-[#1e293b]'}`}>{title}</span>
    </button>
);

const InfoBlock = ({ label, value, labelBold = false }: { label: string; value: string; labelBold?: boolean }) => (
    <div className="flex-1 flex flex-col justify-end min-w-[70px]">
        <p className={`text-[10px] uppercase text-[#1e293b]/70 tracking-[0.05em] ${labelBold ? 'font-bold' : ''}`}>{label}</p>
        <p className="text-[18px] font-bold text-[#1e293b] leading-tight">{value}</p>
    </div>
);

const TeamMember = ({ name, role }: { name: string; role?: string }) => (
    <div className="flex items-end justify-between gap-4">
        <p className="text-[13px] font-medium text-[#1e293b] truncate flex-1">{name}</p>
        {role && <p className="text-[11px] font-bold uppercase text-[#1e293b] tracking-[0.05em]">{role}</p>}
    </div>
);

const FileLinkItem = ({ type, title, subtitle }: { type: 'file' | 'link'; title: string; subtitle: string }) => (
    <div className="w-full h-[58px] px-6 rounded-[14px] bg-white border border-white flex items-center shadow-sm gap-4">
        {type === 'file' ? <FileIcon /> : <LinkIcon />}
        <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-[#1e293b] truncate leading-tight">{title}</p>
            <p className="text-[12px] font-medium text-[#1e293b]/60 truncate">{subtitle}</p>
        </div>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[110px] h-[32px] rounded-[10px] bg-[#5c75ff] flex items-center justify-center shadow-md shadow-[#5c75ff]/20 hover:brightness-105 transition-all"
        >
            <span className="text-[12px] font-bold text-white">Відкрити</span>
        </motion.button>
    </div>
);

const SubmittedLinkItem = ({ icon: Icon, title, subtitle }: { icon: React.ElementType, title: string, subtitle: string }) => (
    <div className="flex items-center justify-between p-6 bg-white/60 rounded-[20px] border border-white shadow-sm">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                <Icon />
            </div>
            <div>
                <p className="text-[16px] font-bold text-[#1e293b]">{title}</p>
                <p className="text-[12px] font-medium text-[#1e293b]/50">{subtitle}</p>
            </div>
        </div>
        <button className="w-[180px] h-[48px] rounded-[15px] bg-[#5c75ff] text-white font-bold text-[15px] shadow-lg shadow-[#5c75ff]/20 hover:brightness-105 transition-all">
            Відкрити
        </button>
    </div>
);

const FormField = ({ label, placeholder = "", isTextArea = false, required = false }: { label: string; placeholder?: string; isTextArea?: boolean; required?: boolean }) => {
    const id = useId();
    return (
        <div className="p-8 bg-white/80 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 space-y-4">
            <label htmlFor={id} className="text-[16px] font-bold text-[#1e293b]">
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    className="w-full min-h-[120px] p-4 bg-white border border-[#e2e8f0] rounded-[12px] focus:ring-2 focus:ring-[#5c75ff]/10 focus:outline-none text-[15px] transition-all resize-none shadow-inner"
                />
            ) : (
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    required={required}
                    className="w-full h-[54px] px-4 bg-white border border-[#e2e8f0] rounded-[12px] focus:ring-2 focus:ring-[#5c75ff]/10 focus:outline-none text-[15px] transition-all shadow-inner"
                />
            )}
        </div>
    );
};

interface TourViewOverlayProps {
    onBack: () => void;
}

export default function TourViewOverlay({ onBack }: TourViewOverlayProps) {
    const [activeTab, setActiveTab] = useState<'task' | 'submit' | 'certificate' | 'calendar'>('task');
    const [isRound1Expanded, setIsRound1Expanded] = useState(true);
    const [isRound2Expanded, setIsRound2Expanded] = useState(false);
    const [isRound3Expanded, setIsRound3Expanded] = useState(false);
    const [isCertExpanded, setIsCertExpanded] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showNoCert, setShowNoCert] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col md:flex-row gap-8 items-start relative z-20"
        >
            <AnimatePresence>
                {showNoCert && <NoCertificateOverlay onClose={() => setShowNoCert(false)} />}
            </AnimatePresence>

            <aside className="w-full md:w-[320px] flex-shrink-0 bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 space-y-6 shadow-sm">
                <button onClick={onBack} className="flex items-center gap-2 group focus:outline-none ml-1 hover:brightness-105">
                    <BackChevronIcon />
                    <span className="text-[13px] font-medium text-[#1e293b]/70 group-hover:text-[#5c75ff] transition-colors">На головну</span>
                </button>
                <h1 className="text-[26px] font-bold text-[#0f172a] leading-tight">Назва</h1>

                <div className="space-y-4 pt-1">
                    <SidebarButton
                        title="Розклад"
                        isActive={activeTab === 'calendar'}
                        onClick={() => setActiveTab('calendar')}
                    />

                    <SidebarButton
                        title="Раунд 1"
                        isExpandable
                        isExpanded={isRound1Expanded}
                        isActive={isRound1Expanded && (activeTab === 'task' || activeTab === 'submit')}
                        onClick={() => setIsRound1Expanded(!isRound1Expanded)}
                    >
                        <SidebarSubButton title="Завдання" isActive={activeTab === 'task'} onClick={() => setActiveTab('task')} />
                        <SidebarSubButton title="Подача завдання" isActive={activeTab === 'submit'} onClick={() => setActiveTab('submit')} />
                    </SidebarButton>

                    <SidebarButton title="Раунд 2" isExpandable isExpanded={isRound2Expanded} onClick={() => setIsRound2Expanded(!isRound2Expanded)} />
                    <SidebarButton title="Раунд 3" isExpandable isExpanded={isRound3Expanded} onClick={() => setIsRound3Expanded(!isRound3Expanded)} />

                    <SidebarButton
                        title="Сертифікат"
                        isExpandable
                        isExpanded={isCertExpanded}
                        isActive={activeTab === 'certificate'}
                        onClick={() => setIsCertExpanded(!isCertExpanded)}
                    >
                        <SidebarSubButton title="Отримайте сертифікат" isActive={activeTab === 'certificate'} onClick={() => setActiveTab('certificate')} />
                    </SidebarButton>
                </div>
            </aside>

            <div className="flex-1 flex flex-col gap-8 w-full">
                <section className="flex flex-col xl:flex-row gap-8 w-full items-stretch">
                    <div className="w-full xl:w-[320px] h-[92px] bg-white border border-white rounded-[20px] p-6 shadow-sm flex items-end relative overflow-hidden">
                        <InfoBlock label="Статус:" value="В процесі" />
                        <InfoBlock label="Раунд:" value="1/3" />
                        <InfoBlock label="Дедлайн:" value="24.05" />
                        <InfoBlock label="" value="18:00" />
                    </div>
                    <div className="flex-1 min-h-[92px] bg-white border border-white rounded-[20px] p-6 shadow-sm flex flex-col xl:flex-row gap-6 relative overflow-hidden">
                        <div className="flex-1 min-w-0 flex flex-col gap-1.5 justify-end">
                            <h2 className="text-[22px] font-bold text-[#1e293b] leading-tight mb-2">Ваша команда</h2>
                            <p className="text-[12px] uppercase text-[#1e293b]/70 font-bold tracking-[0.05em]">Капітан команди:</p>
                            <TeamMember name="Прізвище Ім'я" />
                            <TeamMember name="Прізвище Ім'я" role="Роль" />
                            <TeamMember name="Прізвище Ім'я" role="Роль" />
                        </div>
                        <div className="xl:w-[220px] flex xl:flex-col items-end xl:items-start xl:justify-end gap-1 pb-1">
                            <p className="text-[12px] uppercase text-[#1e293b]/70 font-bold tracking-[0.05em]">Назва команди:</p>
                            <p className="text-[16px] font-bold text-[#1e293b] leading-tight">Назва команди</p>
                        </div>
                    </div>
                </section>

                <main className="flex-1 bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 md:p-12 shadow-sm relative overflow-hidden min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'calendar' && (
                            <motion.div
                                key="calendar"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="w-full h-full min-h-[950px]"
                            >
                                <header className="mb-8">
                                    <h2 className="text-[32px] font-bold text-[#0f172a]">Розклад турніру</h2>
                                    <p className="text-[16px] font-medium text-[#1e293b]/60">Слідкуйте за важливими датами та етапами.</p>
                                </header>
                                <CalendarOverlay inline mode />
                            </motion.div>
                        )}

                        {activeTab === 'task' && (
                            <motion.div
                                key="task"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-10"
                            >
                                <h2 className="text-[30px] font-bold text-[#0f172a] leading-tight">Назва завдання</h2>
                                <section className="space-y-3">
                                    <h3 className="text-[22px] font-bold text-[#1e293b]">Опис</h3>
                                    <p className="text-[15px] font-medium text-[#1e293b]/90 leading-relaxed">
                                        Тут пишеться, що саме треба реалізувати (функціонал).
                                    </p>
                                </section>
                                <section className="space-y-3">
                                    <h3 className="text-[22px] font-bold text-[#1e293b]">Вимоги</h3>
                                    <ul className="text-[14px] font-medium text-[#1e293b]/90 space-y-1 list-disc list-inside ml-2">
                                        <li>Пункт вимог 1</li>
                                        <li>Пункт вимог 2</li>
                                    </ul>
                                </section>
                                <section className="space-y-5 pt-2">
                                    <h3 className="text-[22px] font-bold text-[#1e293b]">Додаткові матеріали</h3>
                                    <div className="space-y-4 max-w-[640px]">
                                        <FileLinkItem type="file" title="Технічне завдання" subtitle="PDF Документ" />
                                        <FileLinkItem type="link" title="Посилання на макет" subtitle="Figma" />
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === 'submit' && !isSubmitted && (
                            <motion.div
                                key="submit-form"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                className="space-y-8"
                            >
                                <header>
                                    <h2 className="text-[32px] font-bold text-[#0f172a] leading-tight">Подача результатів</h2>
                                    <p className="text-[16px] font-medium text-[#1e293b]/60 mt-1">Завантажте результати виконання завдання.</p>
                                </header>
                                <div className="space-y-6 max-w-[800px]">
                                    <FormField label="GitHub репозиторій" placeholder="https://github.com/..." required />
                                    <FormField label="Відео-демо" placeholder="Посилання" required />
                                    <FormField label="Опис рішення" isTextArea />
                                    <div className="pt-6 flex justify-end gap-6">
                                        <button className="px-10 h-[54px] rounded-full bg-[#f1f5f9] text-[#1e293b] font-bold border border-white/50 hover:bg-[#e2e8f0] transition-all">Зберегти</button>
                                        <button
                                            onClick={() => setIsSubmitted(true)}
                                            className="px-12 h-[54px] rounded-full bg-gradient-to-r from-[#5c75ff] to-[#6d82ff] text-white font-bold shadow-lg shadow-[#5c75ff]/30 hover:brightness-110 active:scale-95 transition-all"
                                        >
                                            Надіслати
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'submit' && isSubmitted && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <header className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <SuccessIcon />
                                        <h2 className="text-[32px] font-bold text-[#0f172a]">Ваша робота була подана</h2>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[15px] font-bold text-[#1e293b]">Дедлайн цього раунду минув. Змінювати або повторно надсилати роботу більше неможливо.</p>
                                        <p className="text-[15px] font-medium text-[#1e293b]/60">Ваше завдання успішно збережено та передано на оцінювання журі.</p>
                                    </div>
                                </header>

                                <div className="space-y-4 max-w-[800px] p-8 bg-white/40 rounded-[24px] border border-white/60">
                                    <SubmittedLinkItem icon={GitHubIcon} title="Посилання на GitHub репозиторій" subtitle="Посилання" />
                                    <SubmittedLinkItem icon={PlayIcon} title="Відео-демо" subtitle="Посилання/файл" />
                                    <SubmittedLinkItem icon={WebIcon} title="Live Demo" subtitle="Посилання" />

                                    <div className="pt-4 space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-[16px] font-bold text-[#1e293b]">Короткий опис</h3>
                                            <div className="w-full min-h-[100px] p-5 bg-white/80 border border-white rounded-[18px] text-[15px] text-[#1e293b]/70 shadow-sm">
                                                Текст опису...
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-[16px] font-bold text-[#1e293b]">Коментар</h3>
                                            <div className="w-full min-h-[100px] p-5 bg-white/80 border border-white rounded-[18px] text-[15px] text-[#1e293b]/70 shadow-sm">
                                                Текст коментаря...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'certificate' && (
                            <motion.div
                                key="certificate"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-10"
                            >
                                <header className="space-y-2">
                                    <h2 className="text-[32px] font-bold text-[#0f172a]">Отримати сертифікат</h2>
                                    <p className="text-[16px] font-medium text-[#1e293b]/60">Перевірте дані для генерації документа.</p>
                                </header>
                                <form className="space-y-6 max-w-[600px]" onSubmit={(e) => e.preventDefault()}>
                                    <FormField label="Ім'я" required />
                                    <FormField label="Прізвище" required />
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowNoCert(true)}
                                            className="px-10 h-[50px] rounded-[16px] bg-[#5c75ff] text-white font-bold shadow-lg shadow-[#5c75ff]/25 hover:brightness-110 active:scale-95 transition-all"
                                        >
                                            Згенерувати
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </motion.div>
    );
}