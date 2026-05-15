import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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

interface StepProps {
    number: number;
    title: string;
    text: string;
}

interface PrincipleCardProps {
    title: string;
    text: string;
    align?: "left" | "right";
}

interface FAQItemProps {
    question: string;
    answer: string;
}

interface TournamentCardProps {
    title?: string;
}

const FilterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const TournamentCard: React.FC<TournamentCardProps> = ({ title = "Назва" }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white flex flex-col h-full min-h-[280px]"
    >
        <h3 className="text-[22px] font-bold text-black mb-4">{title}</h3>
        <div className="space-y-2 text-[15px] text-black/80 font-medium flex-grow">
            <div className="flex flex-col">
                <span className="text-black">Статус:</span>
            </div>
            <div className="flex flex-col">
                <span className="text-black">Раунд:</span>
            </div>
            <div className="flex flex-col">
                <span className="text-black">Дедлайн:</span>
            </div>
        </div>
        <button className="w-full mt-6 bg-[#5c75ff] text-white py-2.5 rounded-[12px] font-bold text-[14px] shadow-[0_4px_12px_rgba(92,117,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all">
            Детальніше
        </button>
    </motion.div>
);

const LandingHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 rounded-[24px] bg-white/50 backdrop-blur-[20px] border border-white/60 flex items-center justify-between px-6 md:px-10 h-[76px] relative z-50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-1 hover:bg-black/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    <img src="/logo.png" alt="QTour" className="h-[22px]" />
                </div>

                <nav className="hidden lg:flex items-center gap-10 text-[15px] font-bold text-[#1e293b]">
                    <a href="#about" className="hover:text-[#5c75ff] transition-colors">Про нас</a>
                    <a href="#tours" className="hover:text-[#5c75ff] transition-colors">Турніри</a>
                    <a href="#faq" className="hover:text-[#5c75ff] transition-colors">FAQ</a>
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center bg-[#5c75ff] text-white px-6 h-[42px] rounded-[14px] font-bold text-[14px] shadow-[0_6px_16px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all"
                    >
                        Реєстрація
                    </Link>

                    <Link
                        to="/signup"
                        className="flex items-center justify-center bg-[#5c75ff] text-white px-6 h-[42px] rounded-[14px] font-bold text-[14px] shadow-[0_6px_16px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all"
                    >
                        Вхід
                    </Link>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white/90 backdrop-blur-[30px] z-[58] lg:hidden p-8 pt-24 shadow-2xl"
                        >
                            <nav className="flex flex-col gap-6 uppercase text-[16px] font-bold">
                                <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5c75ff] transition-colors">Про нас</a>
                                <a href="#tours" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5c75ff] transition-colors">Турніри</a>
                                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5c75ff] transition-colors">FAQ</a>
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5c75ff] transition-colors">
                                    Реєстрація
                                </Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5c75ff] transition-colors">
                                    Вхід
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const Step: React.FC<StepProps> = ({ number, title, text }) => (
    <div className="flex gap-6 relative">
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border border-[#1e293b]/10 flex items-center justify-center text-[15px] font-bold text-[#1e293b] bg-white shrink-0 z-10">
                {number}
            </div>
            {number !== 6 && <div className="w-[1px] h-full bg-[#1e293b]/10 absolute top-10" />}
        </div>
        <div className="pb-10">
            <h4 className="text-[18px] font-bold text-[#0f172a] mb-2">{title}</h4>
            <p className="text-[15px] text-[#1e293b]/70 leading-relaxed max-w-[400px]">{text}</p>
        </div>
    </div>
);

const PrincipleCard: React.FC<PrincipleCardProps> = ({ title, text, align = "left" }) => (
    <div className={`flex items-center w-full mb-12 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
        <div className="w-[45%]">
            <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white">
                <h4 className="text-[18px] font-bold text-[#0f172a] mb-3">{title}</h4>
                <p className="text-[14px] leading-relaxed text-[#1e293b]/70">{text}</p>
            </div>
        </div>
        <div className="w-[10%] flex justify-center items-center relative">
            <div className="w-full h-[1px] bg-[#1e293b]/10" />
        </div>
        <div className="w-[45%]" />
    </div>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 w-full max-w-[860px] mx-auto relative z-20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border border-white/60 px-8 py-6 flex items-center justify-between text-left transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group ${isOpen ? "rounded-t-[28px] border-b-transparent" : "rounded-[28px]"}`}
            >
                <span className="text-[17px] font-bold text-[#1e293b] group-hover:text-[#5c75ff] transition-colors pr-4">
                    {question}
                </span>
                <div className="shrink-0 text-2xl text-[#5c75ff]">
                    {isOpen ? "×" : "+"}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white border-x border-b border-white/60 rounded-b-[28px] px-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                    >
                        <div className="pb-8 pt-2 text-[15px] text-[#1e293b]/75 leading-relaxed border-t border-slate-50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function LandingPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement | null>(null);
    const filterBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                filterBtnRef.current &&
                !filterRef.current.contains(event.target as Node) &&
                !filterBtnRef.current.contains(event.target as Node)
            ) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen w-full font-roboto antialiased text-[#1e293b] relative overflow-x-hidden pb-20 bg-[#f8fafc]">
            <RobotoFont />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[#E5F5A3] blur-[140px] opacity-60" />
                <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[70%] rounded-full bg-[#C2C9FF] blur-[150px] opacity-60" />
            </div>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">
                <LandingHeader />

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mt-10 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between min-h-[580px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative overflow-hidden"
                >
                    <div className="flex-1 max-w-[540px] relative z-20">
                        <h1 className="text-[44px] md:text-[52px] font-bold leading-[1.15] text-[#0f172a] mb-6">
                            QTour — Кодь.<br />
                            Релізь. Перемагай.
                        </h1>
                        <p className="text-[16px] md:text-[18px] text-[#1e293b]/80 font-medium mb-10 leading-relaxed max-w-[420px]">
                            Реєструй команду, розробляй круті проєкти та змагайся за першість у професійному турнірі з програмування!
                        </p>
                        <motion.a
                            href="#tours"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center bg-[#5c75ff] text-white px-8 py-4 rounded-[16px] font-bold text-[16px] shadow-[0_8px_24px_rgba(92,117,255,0.3)] hover:brightness-110 transition-all"
                        >
                            До турнірів
                        </motion.a>
                    </div>

                    <div className="flex-1 w-full h-[500px] relative mt-10 lg:mt-0 z-10 hidden md:block">
                        <motion.div
                            initial={{ rotate: -90 }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: 120, height: 120 }}
                            className="absolute top-[10%] right-[0%] z-20"
                        >
                            <img src="/Atom.png" alt="" className="w-full h-full object-contain" />
                        </motion.div>

                        <motion.div
                            initial={{ rotate: 55 }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            style={{ width: 120, height: 120 }}
                            className="absolute bottom-[5%] right-[5%] z-20"
                        >
                            <img src="/Atom.png" alt="" className="w-full h-full object-contain" />
                        </motion.div>

                        <motion.div
                            initial={{ rotate: 45 }}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            style={{ width: 120, height: 120 }}
                            className="absolute top-[40%] left-[-15%] z-20"
                        >
                            <img src="/Atom.png" alt="" className="w-full h-full object-contain" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: 500, height: 373 }}
                            className="absolute right-[60px] top-[20%] z-10"
                        >
                            <img src="/PC.png" alt="Computer Setup" className="w-full h-full object-contain drop-shadow-2xl" />
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    id="about"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1">
                            <h2 className="text-[36px] md:text-[42px] font-bold text-[#0f172a] mb-8">Про нас</h2>
                            <div className="space-y-6 text-[16px] md:text-[18px] leading-[1.6] text-[#1e293b]/90 font-medium max-w-[680px]">
                                <p>
                                    Ми самі знаємо, як це — шукати круті челенджі, де можна не просто «пописати код», а реально перевірити себе на міцність. QTour з’явився, бо нам не вистачало місця з прозорим оцінюванням, зрозумілими правилами та адекватними дедлайнами.
                                </p>
                                <p>
                                    Це простір, де ти збираєш тіму, отримуєш ТЗ і за обмежений час створюєш щось робоче. Без води, без бюрократії — тільки чистий код, Git і командна робота. Ми створили цей інструмент, щоб кожен міг відчути драйв справжнього змагання.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 relative flex justify-center lg:justify-end w-full">
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-full max-w-[480px]"
                            >
                                <img src="/AboutImg.png" alt="Teamwork" className="w-full h-auto object-contain" />
                            </motion.div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#E5F5A3]/30 to-[#C2C9FF]/30 blur-[80px] -z-10" />
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
                >
                    <h2 className="text-[36px] md:text-[42px] font-bold text-[#0f172a] mb-16">Шлях учасника</h2>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-x-12">
                            <Step number={1} title="Створи акаунт" text="Перший крок — реєстрація на платформі. Це твій квиток у світ усіх майбутніх івентів." />
                            <Step number={2} title="Обери івент" text="Переглядай список доступних турнірів і читай описи. Обирай той, що підходить під твій скілсет." />
                            <Step number={3} title="Збери банду" text="Реєструй свою команду всередині турніру. Пам'ятай про ліміти на кількість учасників!" />
                            <Step number={4} title="Кодь на повну" text="Після старту раунду ти побачиш завдання. У тебе є чіткий дедлайн, посилання на репо та відео-демо." />
                            <Step number={5} title="Отримай фідбек" text="Твій проєкт потрапляє до рук журі. Ніякого рандому в балах — тільки об'єктивні оцінки за твої старання." />
                            <Step number={6} title="Дивись у таблицю" text="Чекай на результати в Leaderboard. Навіть якщо не перший — ти побачиш, куди рости далі." />
                        </div>

                        <div className="flex-1 w-full flex justify-center lg:justify-end">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full max-w-[550px]"
                            >
                                <img src="/StepImg.png" alt="Participant Path" className="w-full h-auto drop-shadow-xl" />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
                >
                    <h2 className="text-[36px] md:text-[42px] font-bold text-[#0f172a] mb-16">Наші принципи</h2>
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1e293b]/10 -translate-x-1/2 hidden md:block" />
                        <div className="flex flex-col">
                            <PrincipleCard title="Прозорість понад усе" text="Жодних прихованих балів. Ти бачиш, за що тобі поставили оцінку і як її розрахували експерти." align="left" />
                            <PrincipleCard title="Свобода стеку" text="Ми не обмежуємо у виборі інструментів. Якщо твій проєкт працює і виконує завдання — це головне!" align="right" />
                            <PrincipleCard title="Код — це мистецтво" text="Ми цінуємо чистий код, паттерни та документацію. Робимо так, як робили б «флагмани»." align="left" />
                            <PrincipleCard title="Рівні умови" text="Система сама розподіляє рівні команди, щоб змагання залишалися чесними для всіх." align="right" />
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    id="faq"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative overflow-hidden"
                >
                    <h2 className="text-[36px] md:text-[42px] font-bold text-[#0f172a] mb-16 relative z-10">Поширені запитання</h2>
                    <div className="relative z-10">
                        <FAQItem question="Чи можу я бути в кількох командах одночасно?" answer="У межах одного турніру — ні. Тобі доведеться обрати одну команду." />
                        <FAQItem question="Що буде, якщо ми не встигнемо завантажити посилання?" answer="Система автоматично закриває прийом робіт рівно в зазначену секунду." />
                        <FAQItem question="Хто ці люди в журі?" answer="Це досвідчені розробники та архітектори з топових IT-компаній." />
                        <FAQItem question="А якщо я — одинак, можу брати участь?" answer="Зазвичай наші турніри командні, бо вміння працювати в команді — це критично важливо." />
                    </div>
                </motion.section>

                <motion.section
                    id="tours"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-white/40 backdrop-blur-[24px] border border-white/60 rounded-[40px] p-10 md:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative overflow-hidden"
                >
                    <div className="relative w-full py-12 px-4">
                        <div className="max-w-[1100px] mx-auto rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-8 md:p-12 shadow-sm relative overflow-visible">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-[32px] font-bold text-black">Турніри</h2>

                                <div className="relative">
                                    <motion.button
                                        ref={filterBtnRef}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="w-[58px] h-[34px] rounded-[12px] bg-[#5c75ff] flex items-center justify-center gap-1 shadow-md hover:brightness-110 transition-all"
                                    >
                                        <ChevronIcon />
                                        <FilterIcon />
                                    </motion.button>

                                    <AnimatePresence>
                                        {isFilterOpen && (
                                            <motion.div
                                                ref={filterRef}
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 mt-3 w-[190px] bg-[#dbeafe]/80 backdrop-blur-[20px] border border-white/40 rounded-[20px] shadow-xl z-50 overflow-hidden py-2"
                                            >
                                                {["Registration open", "Running", "Finished"].map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => setIsFilterOpen(false)}
                                                        className="w-full text-left px-5 py-2.5 hover:bg-white/30 text-[14px] font-bold text-black transition-colors"
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <TournamentCard key={i} />
                                ))}
                            </div>
                        </div>

                        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                            <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#C2C9FF] blur-[120px] opacity-40" />
                            <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#E5F5A3] blur-[120px] opacity-40" />
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}