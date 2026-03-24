import { motion } from "framer-motion";
import { useState } from "react";

interface Member {
    name: string;
    role: string;
}

interface TeamCardProps {
    teamName: string;
    captainName: string;
    members: Member[];
}

interface HistoryCardProps {
    tourName: string;
    date: string;
    round: string;
    status: string;
}

const EditIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

const UserAvatarIcon = () => (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const EyeIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        {!isOpen && <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />}
    </svg>
);

const TeamCard = ({ teamName, captainName, members }: TeamCardProps) => (
    <div className="bg-white/60 rounded-[24px] p-8 border border-white shadow-sm space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[12px] uppercase font-bold text-[#1e293b]/50 tracking-wider">Капітан команди:</p>
                <p className="text-[15px] font-bold text-[#1e293b]">{captainName}</p>
            </div>
            <div className="text-right">
                <p className="text-[14px] font-bold text-[#1e293b]">{teamName}</p>
            </div>
        </div>
        <div className="space-y-2">
            {members.map((member, idx) => (
                <div key={idx} className="flex justify-between text-[14px] font-bold text-[#1e293b]">
                    <span>{member.name}</span>
                    <span className="text-[#1e293b]/50">{member.role}</span>
                </div>
            ))}
        </div>
    </div>
);

const HistoryCard = ({ tourName, date, round, status }: HistoryCardProps) => (
    <div className="bg-white/60 rounded-[24px] p-8 border border-white shadow-sm space-y-4">
        <div>
            <h3 className="text-[16px] font-bold text-[#1e293b]">{tourName}</h3>
            <p className="text-[11px] font-medium text-[#1e293b]/40">{date}</p>
        </div>
        <div className="space-y-1">
            <p className="text-[13px] font-bold text-[#1e293b]">{round}</p>
            <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold text-[#1e293b]">
                    Статус: <span className="text-[#4ade80]">{status}</span>
                </p>
                <button className="text-[12px] font-bold text-[#5c75ff] hover:underline transition-all">
                    Переглянути сабміт
                </button>
            </div>
        </div>
    </div>
);

export default function ProfileUserOverlay() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-[340px_1fr_1fr] gap-8 items-start relative z-20"
        >
            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-10 shadow-sm flex flex-col items-center min-h-[720px]">
                <div className="w-[140px] h-[140px] rounded-full bg-[#5c75ff] flex items-center justify-center mb-8 shadow-xl shadow-[#5c75ff]/20 shrink-0">
                    <UserAvatarIcon />
                </div>

                <div className="text-center space-y-1 mb-6">
                    <div className="flex items-center justify-center gap-2 text-[#1e293b]">
                        <h2 className="text-[24px] font-bold">Ім’я Прізвище</h2>
                        <button
                            aria-label="Edit profile name"
                            title="Edit"
                            className="hover:text-[#5c75ff] transition-colors"
                        >
                            <EditIcon />
                        </button>
                    </div>
                    <p className="text-[13px] font-medium text-[#1e293b]/60">example@gmail.com</p>
                </div>

                <div className="w-full max-w-[140px] h-[44px] rounded-full bg-[#5c75ff] text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-[#5c75ff]/20 mb-12 shrink-0">
                    Учасник
                </div>

                <div className="w-full space-y-2 mb-auto">
                    <label htmlFor="password" className="text-[14px] font-bold text-[#1e293b] ml-1">
                        Пароль
                    </label>
                    <div className="relative group">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            disabled
                            value="password123"
                            className="w-full h-[48px] bg-white/50 border border-white/60 rounded-[15px] px-5 pr-24 text-[14px] font-bold text-[#1e293b] transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-[#1e293b]/30">
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="hover:text-[#5c75ff] transition-colors"
                            >
                                <EyeIcon isOpen={showPassword} />
                            </button>
                            <button
                                aria-label="Edit password"
                                title="Edit"
                                type="button"
                                className="hover:text-[#5c75ff] transition-colors"
                            >
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <button className="w-full max-w-[160px] h-[44px] rounded-full bg-[#5c75ff] text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-[#5c75ff]/20 mt-8 hover:brightness-110 transition-all active:scale-95">
                    Вихід
                </button>
            </section>

            {/* Команда */}
            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-10 shadow-sm min-h-[720px] space-y-8">
                <h2 className="text-[28px] font-bold text-[#1e293b]">Моя команда</h2>
                <div className="space-y-6">
                    <TeamCard
                        teamName="Назва команди"
                        captainName="Прізвище Ім'я"
                        members={[
                            { name: "Прізвище Ім'я", role: "Роль" },
                            { name: "Прізвище Ім'я", role: "Роль" }
                        ]}
                    />
                    <TeamCard
                        teamName="Назва команди"
                        captainName="Прізвище Ім'я"
                        members={[
                            { name: "Прізвище Ім'я", role: "Роль" },
                            { name: "Прізвище Ім'я", role: "Роль" }
                        ]}
                    />
                </div>
            </section>

            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-10 shadow-sm min-h-[720px] space-y-8">
                <h2 className="text-[28px] font-bold text-[#1e293b]">Історія участі</h2>
                <div className="space-y-6">
                    <HistoryCard
                        tourName="Назва турніру"
                        date="з 01.01.26 по 01.01.27"
                        round="Раунд 1"
                        status="Прийнято"
                    />
                    <HistoryCard
                        tourName="Назва турніру"
                        date="з 01.01.26 по 01.01.27"
                        round="Раунд 1"
                        status="Прийнято"
                    />
                </div>
            </section>
        </motion.div>
    );
}