import { motion } from "framer-motion";

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

interface AssignmentCardProps {
    teamName: string;
    tournamentName: string;
    round: string;
    deadline: string;
    status: "SubmissionClosed" | "Evaluated";
}

const JuryAssignmentCard = ({ teamName, tournamentName, round, deadline, status }: AssignmentCardProps) => {
    const isEvaluated = status === "Evaluated";

    return (
        <div className="bg-white/70 rounded-[20px] p-6 border border-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-white/90">
            <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#1e293b] mb-1">{teamName}</h3>
                <p className="text-[13px] font-medium text-[#1e293b]/70">{tournamentName}</p>

                <div className="flex items-center gap-3 my-1.5">
                    <span className="text-[12px] font-bold text-[#1e293b]">Раунд {round}</span>
                    <span className={`${isEvaluated ? 'bg-[#5c75ff]' : 'bg-[#A3E635]'} text-white text-[10px] font-bold px-3 py-0.5 rounded-full`}>
                        {status}
                    </span>
                </div>

                <div className="text-[11px] font-medium text-[#1e293b]/50">
                    <p>Оцінити до:</p>
                    <p>{deadline}</p>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <button className={`flex-1 md:flex-none ${isEvaluated ? 'bg-white border border-[#f1f5f9] text-[#5c75ff]' : 'bg-[#5c75ff] text-white'} px-8 py-2.5 rounded-[12px] font-bold text-[13px] shadow-sm transition-all hover:brightness-110`}>
                    {isEvaluated ? "Детальніше" : "Оцінити"}
                </button>
            </div>
        </div>
    );
};

export default function ProfileJuryOverlay() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start relative z-20"
        >
            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-10 shadow-sm flex flex-col items-center min-h-[600px]">
                <div className="w-[150px] h-[150px] rounded-full bg-[#5c75ff] border-[4px] border-white flex items-center justify-center mb-6 shadow-xl shadow-[#5c75ff]/20 shrink-0">
                    <UserAvatarIcon />
                </div>

                <div className="text-center space-y-1 mb-6">
                    <div className="flex items-center justify-center gap-2 text-[#1e293b]">
                        <h2 className="text-[26px] font-bold tracking-tight">Ім’я Прізвище</h2>
                        <button className="text-[#1e293b]/50 hover:text-[#5c75ff] transition-colors">
                            <EditIcon />
                        </button>
                    </div>
                    <p className="text-[14px] font-medium text-[#1e293b]/70">example@gmail.com</p>
                </div>

                <div className="w-[140px] h-[40px] rounded-[12px] bg-[#5c75ff] text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-[#5c75ff]/20">
                    Журі
                </div>
            </section>

            <section className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 md:p-10 shadow-sm min-h-[600px] space-y-6">
                <h2 className="text-[26px] font-bold text-[#1e293b] mb-2">Призначені роботи</h2>

                <div className="space-y-4">
                    <JuryAssignmentCard
                        teamName="Назва команди"
                        tournamentName="Назва турніру"
                        round="N"
                        deadline="дд.мм.рр - дд.мм.рр"
                        status="SubmissionClosed"
                    />
                    <JuryAssignmentCard
                        teamName="Назва команди"
                        tournamentName="Назва турніру"
                        round="N"
                        deadline="дд.мм.рр - дд.мм.рр"
                        status="Evaluated"
                    />
                    <JuryAssignmentCard
                        teamName="Назва команди"
                        tournamentName="Назва турніру"
                        round="N"
                        deadline="дд.мм.рр - дд.мм.рр"
                        status="Evaluated"
                    />
                </div>
            </section>
        </motion.div>
    );
}