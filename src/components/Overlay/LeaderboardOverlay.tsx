import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TeamData {
  rank: number;
  name: string;
  cat1: string;
  cat2: string;
  cat3: string;
  total: number;
}

const leaderboardData: TeamData[] = [
  { rank: 1, name: "Назва команди", cat1: "20/20", cat2: "40/40", cat3: "40/40", total: 100 },
  { rank: 2, name: "Назва команди", cat1: "20/20", cat2: "40/40", cat3: "39/40", total: 99 },
  { rank: 3, name: "Назва команди", cat1: "20/20", cat2: "39/40", cat3: "39/40", total: 98 },
  { rank: 4, name: "Назва команди", cat1: "19/20", cat2: "39/40", cat3: "39/40", total: 97 },
  { rank: 5, name: "Назва команди", cat1: "18/20", cat2: "39/40", cat3: "39/40", total: 96 },
];

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const detailsVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

function TeamDetails({ team, onBack }: { team: TeamData; onBack: () => void }) {
  return (
    <motion.div
      variants={detailsVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative rounded-[32px] border border-white/60 bg-white/50 p-6 shadow-xl backdrop-blur-2xl md:p-10"
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-[13px] font-medium text-[#5c75ff] hover:underline"
      >
        <span className="text-lg">‹</span> До Leaderboard
      </button>

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a]">{team.name}</h2>
          <p className="mt-1 text-[13px] font-medium text-slate-400">
            Учасників: N • {team.rank} місце
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold text-slate-400">Сума:</p>
          <p className="text-[32px] font-bold text-[#0f172a]">
            {team.total} б.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="mb-5 text-[16px] font-bold text-[#0f172a]">
          Деталізація балів за категоріями
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Категорія 1", score: team.cat1 },
            { label: "Категорія 2", score: team.cat2 },
            { label: "Категорія 3", score: team.cat3 },
          ].map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/80 bg-white/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <p className="text-[13px] font-bold text-[#0f172a]">{cat.label}</p>
              <p className="mt-2 text-[18px] font-bold text-[#0f172a]">{cat.score}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-white/80 bg-white/60 p-6 shadow-sm">
        <h3 className="mb-6 text-[15px] font-bold text-[#0f172a]">Оцінки журі</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[12px] font-bold text-[#0f172a]">
                <th className="pb-4 pr-4">Журі</th>
                <th className="pb-4 px-4 text-center">Категорія1</th>
                <th className="pb-4 px-4 text-center">Категорія2</th>
                <th className="pb-4 px-4 text-center">Категорія3</th>
                <th className="pb-4 pl-4 text-right">Сума балів</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[14px]">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="group">
                  <td className="py-4 pr-4 font-bold text-[#0f172a]">Ім'я Прізвище</td>
                  <td className="py-4 px-4 text-center font-medium text-[#0f172a]">20/20</td>
                  <td className="py-4 px-4 text-center font-medium text-[#0f172a]">40/40</td>
                  <td className="py-4 px-4 text-center font-medium text-[#0f172a]">40/40</td>
                  <td className="py-4 pl-4 text-right font-bold text-[#5c75ff]">100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeaderboardOverlay({ onBack }: { onBack: () => void }) {
  const [isDetailed, setIsDetailed] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "#F6D84A";
    if (rank === 2) return "#A9B8C4";
    if (rank === 3) return "#C3A85B";
    return "#8C8B86";
  };

  return (
    <div className="mt-8 space-y-6 px-2 md:px-0">
      <motion.div
        layout
        className="rounded-[24px] border border-white/70 bg-white/40 p-6 shadow-lg backdrop-blur-xl"
      >
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-1 text-[13px] font-bold text-[#5c75ff]"
        >
          <span className="text-lg">‹</span> До турніру
        </button>
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-[32px] font-bold text-[#0f172a]">Назва</h2>
            <p className="text-[12px] font-medium text-slate-400">
              З 01.01.26 по 01.01.27 • Раунд 1
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c75ff]">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#34d399]">Оцінювання завершено</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedTeam ? (
          <TeamDetails
            key="details"
            team={selectedTeam}
            onBack={() => setSelectedTeam(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-[22px] font-bold text-[#0f172a]">
              {isDetailed ? "Таблиця лідерів за категоріями" : "Таблиця лідерів"}
            </h3>

            <div className="rounded-[32px] border border-white/70 bg-white/40 p-4 shadow-xl backdrop-blur-2xl">
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div
                    className="grid items-center border-b border-black/5 px-6 pb-4 text-[12px] font-bold text-slate-400"
                    style={{
                      gridTemplateColumns: isDetailed
                        ? "50px 1fr 100px 100px 100px 100px 120px"
                        : "50px 1fr 120px 120px",
                      gap: "16px",
                    }}
                  >
                    <span>#</span>
                    <span>Команда</span>
                    {isDetailed && (
                      <>
                        <span className="text-center">Категорія1</span>
                        <span className="text-center">Категорія2</span>
                        <span className="text-center">Категорія3</span>
                      </>
                    )}
                    <span className="text-center">Сума балів</span>
                    <span className="text-right">Дія</span>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-2 space-y-1"
                  >
                    {leaderboardData.map((team) => (
                      <motion.div
                        key={team.rank}
                        variants={itemVariants}
                        className="group grid items-center rounded-2xl px-6 py-4 transition-all hover:bg-white/60"
                        style={{
                          gridTemplateColumns: isDetailed
                            ? "50px 1fr 100px 100px 100px 100px 120px"
                            : "50px 1fr 120px 120px",
                          gap: "16px",
                        }}
                      >
                        <span className="text-[18px] font-bold" style={{ color: getRankColor(team.rank) }}>
                          {team.rank}
                        </span>
                        <span className="font-bold text-[#0f172a]">{team.name}</span>

                        {isDetailed && (
                          <>
                            <span className="text-center font-medium text-[#0f172a]">{team.cat1}</span>
                            <span className="text-center font-medium text-[#0f172a]">{team.cat2}</span>
                            <span className="text-center font-medium text-[#0f172a]">{team.cat3}</span>
                          </>
                        )}

                        <span className="text-center font-bold text-[#5c75ff]">{team.total}</span>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setSelectedTeam(team)}
                            className="rounded-full bg-[#5c75ff] px-5 py-2 text-[11px] font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95"
                          >
                            Детальніше
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 flex justify-center pb-4">
                <button
                  onClick={() => setIsDetailed(!isDetailed)}
                  className="rounded-2xl bg-[#5c75ff] px-12 py-4 text-[14px] font-bold text-white shadow-xl shadow-blue-500/25 active:scale-95"
                >
                  {isDetailed ? "Таблиця лідерів" : "Таблиця за категоріями"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}