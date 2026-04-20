import React from "react";
import { motion } from "framer-motion";

interface RateJuryProps {
    onBack: () => void;
    teamName?: string;
}

const ScoreRow = ({ label }: { label: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-[#f1f5f9] last:border-0">
        <span className="text-[15px] font-medium text-[#1e293b] max-w-[70%]">{label}</span>
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="N"
                className="w-12 h-10 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-center font-bold text-[#1e293b] focus:outline-none focus:border-[#5c75ff]"
            />
            <span className="text-[14px] font-bold text-[#1e293b]/30">/100</span>
        </div>
    </div>
);

export default function RateJuryOverlay({ onBack, teamName = "Назва команди" }: RateJuryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen bg-[#f3f4f6] p-6 md:p-10 font-roboto flex flex-col items-center overflow-x-hidden relative"
        >
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C1E130] blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5c75ff] blur-[120px] rounded-full opacity-30"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center">
                <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10">

                    <div className="lg:col-span-8">
                        <div className="mb-10">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-1 text-[#1e293b]/40 font-bold text-[12px] mb-4 hover:text-[#1e293b] transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                                Назад
                                <span className="ml-2 text-[#1e293b]">Назва турніру</span>
                            </button>

                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-[42px] font-black text-[#1e293b]">Раунд N: Назва</h1>
                                <span className="bg-[#C1E130] text-[#1e293b] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                    SubmissionClosed
                                </span>
                            </div>
                            <div className="text-[12px] text-[#1e293b]/50">
                                Тривалість оцінювання:<br />
                                <span className="text-[#1e293b] font-bold uppercase">дд.мм.рррр - дд.мм.рррр</span>
                            </div>
                        </div>

                        <section className="mb-12">
                            <h2 className="text-[26px] font-black text-[#1e293b] mb-8">Сабміт команди: {teamName}</h2>
                            <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm mb-6">
                                <p className="text-[12px] font-bold text-[#1e293b] mb-4">Короткий опис</p>
                                <div className="bg-white/80 rounded-2xl p-6 min-h-[140px] text-[14px] text-[#1e293b]/60 leading-relaxed border border-[#f1f5f9]">
                                    Тут відображається текст сабміту команди...
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {[
                                    { label: "Посилання на GitHub репозиторій", sub: "Посилання", icon: "/Github.png" },
                                    { label: "Відео-демо", sub: "Посилання/Файл", icon: "/Play.png" },
                                    { label: "Live Demo", sub: "Посилання", icon: "/Link.svg" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-md rounded-[24px] p-5 flex items-center justify-between border border-white shadow-sm hover:bg-white/80 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-2">
                                                <img
                                                    src={item.icon}
                                                    alt={item.label}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/40")}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1e293b]">{item.label}</p>
                                                <p className="text-[11px] font-medium text-[#1e293b]/40">{item.sub}</p>
                                            </div>
                                        </div>
                                        <button className="bg-[#5c75ff] text-white px-8 py-2.5 rounded-[14px] font-bold text-[13px] hover:brightness-110 transition-all shadow-md shadow-[#5c75ff]/20">
                                            Відкрити
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-[26px] font-black text-[#1e293b] mb-8">Оцінювання завдання</h2>

                            <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <img src="/icons/tech.png" className="w-6 h-6 object-contain opacity-40" alt="" />
                                        <h3 className="text-[16px] font-bold text-[#1e293b]">Технічна частина</h3>
                                    </div>
                                    <span className="text-[12px] font-bold text-[#1e293b]/40 uppercase">Оцінка (макс. 100)</span>
                                </div>
                                <ScoreRow label="Backend" />
                                <ScoreRow label="Database" />
                                <ScoreRow label="Frontend" />
                            </div>

                            <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm mb-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <img src="/icons/func.png" className="w-6 h-6 object-contain opacity-40" alt="" />
                                        <h3 className="text-[16px] font-bold text-[#1e293b]">Функціональність</h3>
                                    </div>
                                    <span className="text-[12px] font-bold text-[#1e293b]/40 uppercase">Оцінка (макс. 100)</span>
                                </div>
                                <ScoreRow label='Виконання вимог завдання ("must have")' />
                                <ScoreRow label="Роботоздатність, відсутність багів" />
                                <ScoreRow label="Зручність використання" />
                            </div>

                            <div className="mb-10">
                                <p className="text-[14px] font-bold text-[#1e293b] mb-4">Коментар</p>
                                <textarea
                                    placeholder="Текст вашого коментаря..."
                                    className="w-full bg-white/60 border border-white rounded-[24px] p-6 min-h-[120px] shadow-sm focus:outline-none focus:border-[#5c75ff] text-[14px] resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="bg-[#5c75ff] text-white px-12 py-4 rounded-[20px] font-bold text-[15px] shadow-lg shadow-[#5c75ff]/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    Зберегти оцінку
                                </button>
                                <button
                                    onClick={onBack}
                                    className="bg-white/80 text-[#1e293b] border border-white px-12 py-4 rounded-[20px] font-bold text-[15px] shadow-sm hover:bg-white transition-all"
                                >
                                    Скасувати
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <section>
                            <h2 className="text-[26px] font-black text-[#1e293b] mb-8 lg:text-right">Призначені роботи</h2>
                            <div className="flex flex-col gap-3">
                                {["Команда 1", "Команда 2", "Команда 3"].map((name, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-md rounded-[24px] p-5 border border-white shadow-sm flex items-center justify-between">
                                        <span className="text-[15px] font-bold text-[#1e293b]">{name}</span>
                                        <button className={`px-6 py-2.5 rounded-[14px] font-bold text-[12px] transition-all ${i < 2 ? "bg-white text-[#1e293b] border border-[#e2e8f0]" : "bg-[#5c75ff] text-white hover:brightness-110"}`}>
                                            {i < 2 ? "Редагувати" : "Оцінити"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 shadow-sm border border-white">
                            <div className="grid grid-cols-2 gap-y-5 text-[14px]">
                                <span className="font-bold text-[#1e293b]/40 uppercase text-[12px]">Категорія</span>
                                <span className="font-bold text-[#1e293b]/40 uppercase text-[12px] text-right">Сума балів</span>

                                <span className="font-bold text-[#1e293b] py-3 border-b border-[#f1f5f9]">Технічна частина</span>
                                <span className="font-bold text-[#1e293b] py-3 border-b border-[#f1f5f9] text-right">N/300</span>

                                <span className="font-bold text-[#1e293b] py-3 border-b border-[#f1f5f9]">Функціональність</span>
                                <span className="font-bold text-[#1e293b] py-3 border-b border-[#f1f5f9] text-right">N/300</span>

                                <span className="font-black text-[#1e293b] pt-5 text-[18px]">Загально</span>
                                <span className="font-black text-[#1e293b] pt-5 text-[18px] text-right text-[#5c75ff]">N/600</span>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </motion.div>
    );
}