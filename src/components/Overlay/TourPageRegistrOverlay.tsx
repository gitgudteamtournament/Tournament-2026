import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Theme = {
    glassCard: "bg-white/70 backdrop-blur-[20px] border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[24px]",
    inputPill: "flex items-center gap-2 bg-white border border-slate-100 rounded-[12px] px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#5c75ff]/20 transition-all",
    btnBlue: "bg-[#5c75ff] text-white shadow-[0_6px_12px_rgba(92,117,255,0.2)] hover:bg-[#4b63e6] active:scale-95 transition-all font-bold",
    btnWhite: "bg-white text-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white hover:bg-slate-50 active:scale-95 transition-all font-bold",
};

export default function TourPageRegistrOverlay({ onClose }: { onClose: () => void }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

    const [teams, setTeams] = useState([
        {
            id: 1,
            name: "Назва",
            captain: { name: "Ім'я Прізвище", email: "example@gmail.com" },
            members: [
                { name: "Ім'я Прізвище", email: "example@gmail.com" },
                { name: "Ім'я Прізвище", email: "example@gmail.com" }
            ]
        },
        {
            id: 2,
            name: "Назва",
            captain: { name: "Ім'я Прізвище", email: "example@gmail.com" },
            members: [
                { name: "Ім'я Прізвище", email: "example@gmail.com" },
                { name: "Ім'я Прізвище", email: "example@gmail.com" }
            ]
        },
        {
            id: 3,
            name: "Назва",
            captain: { name: "Ім'я Прізвище", email: "example@gmail.com" },
            members: [
                { name: "Ім'я Прізвище", email: "example@gmail.com" },
                { name: "Ім'я Прізвище", email: "example@gmail.com" }
            ]
        }
    ]);

    const handleDeleteClick = (teamId: number) => {
        setSelectedTeam(teamId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedTeam !== null) {
            setTeams(teams.filter(t => t.id !== selectedTeam));
        }
        setShowDeleteModal(false);
        setSelectedTeam(null);
    };

    return (
        <>
            {/* ТЕПЕРЬ ЭТО ПРОСТО БЛОК В ПОТОКЕ, ОН НЕ ПЕРЕКРЫВАЕТ ХЕДЕР */}
            <div className="relative w-full min-h-screen bg-[#f8fafc] pb-32">
                {/* Фоновый градиент, который тянется за контентом */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0fba4]/20 via-transparent to-[#b6c6ff]/20 pointer-events-none -z-10" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[1200px] mx-auto px-8 pt-12"
                >
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors text-[14px] font-semibold mb-6 group"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        На головну
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <h1 className="text-[42px] font-bold text-slate-900 tracking-tight">Назва турніру</h1>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </button>
                                </div>
                                <span className="inline-block bg-[#5c75ff] text-white text-[12px] px-5 py-1.5 rounded-full font-bold uppercase tracking-[0.05em]">
                                    Registration
                                </span>
                            </div>

                            <div className="flex items-center gap-5">
                                <span className="text-[17px] font-semibold text-slate-700">Раундів: не створено</span>
                                <button className={`${Theme.btnBlue} px-7 py-2.5 rounded-[14px] text-[14px]`}>
                                    Створити
                                </button>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-[22px] font-bold text-slate-800">Опис</h3>
                                    <button className="text-slate-300 hover:text-slate-600">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </button>
                                </div>
                                <p className="text-slate-500 text-[16px] font-medium">Текст</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className={Theme.glassCard + " p-7"}>
                                <h3 className="text-[16px] font-bold text-slate-800 mb-5">Тривалість турніру</h3>
                                <div className="flex items-center gap-4">
                                    <div className={Theme.inputPill + " flex-1"}>
                                        <input type="date" className="w-full bg-transparent outline-none text-[14px] cursor-pointer" />
                                        <input type="time" className="bg-transparent outline-none text-[14px] cursor-pointer w-[70px]" />
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    <div className={Theme.inputPill + " flex-1"}>
                                        <input type="date" className="w-full bg-transparent outline-none text-[14px] cursor-pointer" />
                                        <input type="time" className="bg-transparent outline-none text-[14px] cursor-pointer w-[70px]" />
                                    </div>
                                </div>
                            </div>

                            <div className={Theme.glassCard + " p-7"}>
                                <h3 className="text-[16px] font-bold text-slate-800 mb-5">Термін реєстрації команд</h3>
                                <div className="flex items-center gap-4">
                                    <div className={Theme.inputPill + " flex-1"}>
                                        <input type="date" className="w-full bg-transparent outline-none text-[14px] cursor-pointer" />
                                        <input type="time" className="bg-transparent outline-none text-[14px] cursor-pointer w-[70px]" />
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    <div className={Theme.inputPill + " flex-1"}>
                                        <input type="date" className="w-full bg-transparent outline-none text-[14px] cursor-pointer" />
                                        <input type="time" className="bg-transparent outline-none text-[14px] cursor-pointer w-[70px]" />
                                    </div>
                                </div>
                            </div>

                            <button className={`${Theme.btnBlue} px-9 py-4 rounded-[18px] text-[15px]`}>
                                Завершити реєстрацію
                            </button>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-[26px] font-bold mb-8 text-slate-900">Зареєстровані команди</h2>
                        <div className={Theme.glassCard + " overflow-hidden p-2"}>
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-slate-900 font-bold text-[15px]">
                                        <th className="pl-6 py-4 w-12">#</th>
                                        <th>Назва команди</th>
                                        <th>Капітан</th>
                                        <th>Учасники</th>
                                        <th className="pr-6 text-right">Дія</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team) => (
                                        <tr key={team.id} className="bg-white/40 group hover:bg-white/80 transition-colors">
                                            <td className="pl-6 py-5 rounded-l-[16px] font-bold">{team.id}</td>
                                            <td className="font-bold text-slate-800">{team.name}</td>
                                            <td>
                                                <div className="font-bold text-[14px] text-slate-900">{team.captain.name}</div>
                                                <div className="text-[12px] text-slate-400 font-medium">{team.captain.email}</div>
                                            </td>
                                            <td className="py-4">
                                                <div className="space-y-1">
                                                    {team.members.map((m, i) => (
                                                        <div key={i} className="flex items-center gap-6">
                                                            <span className="text-[14px] font-bold text-slate-800 w-32">{m.name}</span>
                                                            <span className="text-[12px] text-slate-400 font-medium">{m.email}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="pr-6 text-right rounded-r-[16px]">
                                                <button
                                                    onClick={() => handleDeleteClick(team.id)}
                                                    className={`${Theme.btnBlue} px-6 py-2 rounded-[12px] text-[13px]`}
                                                >
                                                    Видалити
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end mt-12">
                        <button className={`${Theme.btnWhite} px-12 py-4 rounded-[18px] text-[16px]`}>
                            Зберегти
                        </button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute inset-0 bg-slate-900/10 backdrop-blur-[8px]"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-[440px] rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] p-10 z-10"
                        >
                            <h2 className="text-[24px] font-bold text-slate-900 mb-4">Видалити команду?</h2>
                            <div className="flex items-center gap-4 mt-8">
                                <button onClick={() => setShowDeleteModal(false)} className={`${Theme.btnBlue} flex-1 py-4 rounded-[18px]`}>Ні</button>
                                <button onClick={confirmDelete} className={`${Theme.btnWhite} flex-1 py-4 rounded-[18px] bg-slate-50`}>Так</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}