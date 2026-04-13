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

      <div className="mb-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#0f172a]">{team.name}</h2>
          <p className="mt-1 text-[13px] font-medium text-slate-400">
            Учасників: N • {team.rank} місце
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-[11px] font-bold text-slate-400">Сума:</p>
          <p className="text-[28px] md:text-[32px] font-bold text-[#0f172a]">
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

      <div className="rounded-[24px] border border-white/80 bg-white/60 p-6 shadow-sm overflow-hidden">
        <h3 className="mb-6 text-[15px] font-bold text-[#0f172a]">Оцінки журі</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
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
                  <td className="py-4 pr-4 font-bold text-[#0f172a] whitespace-nowrap">Ім'я Прізвище</td>
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

  const handleExport = () => {
    // Используем украинские заголовки
    const headers = ["Місце", "Команда", "Категорія 1", "Категорія 2", "Категорія 3", "Сума балів"];

    // Используем точку с запятой (;) для правильного разделения по ячейкам в Excel
    const csvContent = [
      headers.join(";"),
      ...leaderboardData.map(t => `${t.rank};"${t.name}";"${t.cat1}";"${t.cat2}";"${t.cat3}";${t.total}`)
    ].join("\n");

    // Добавляем \uFEFF (BOM) чтобы кириллица читалась корректно
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Турнірна_таблиця.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "#F6D84A";
    if (rank === 2) return "#A9B8C4";
    if (rank === 3) return "#C3A85B";
    return "#8C8B86";
  };

  return (
    <div className="space-y-6 px-2 md:px-0">
      <motion.div
        layout
        className="rounded-[24px] border border-white/70 bg-white/40 p-5 md:p-6 shadow-lg backdrop-blur-xl"
      >
        <button
          onClick={onBack}
          className="mb-3 md:mb-2 flex items-center gap-1 text-[13px] font-bold text-[#5c75ff]"
        >
          <span className="text-lg">‹</span> До турніру
        </button>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center justify-between">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold text-[#0f172a]">Назва</h2>
            <p className="text-[12px] font-medium text-slate-400">
              З 01.01.26 по 01.01.27 • Раунд 1
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 md:py-2 text-[12px] font-bold text-[#5c75ff] shadow-sm hover:bg-white transition-colors border border-white/50 w-full sm:w-auto justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Експортувати таблицю
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34d399] shrink-0">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[13px] md:text-[14px] font-bold text-[#34d399]">Оцінювання завершено</span>
            </div>
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
            <h3 className="text-[20px] md:text-[22px] font-bold text-[#0f172a]">
              {isDetailed ? "Таблиця лідерів за категоріями" : "Таблиця лідерів"}
            </h3>

            <div className="rounded-[24px] md:rounded-[32px] border border-white/70 bg-white/40 p-2 md:p-4 shadow-xl backdrop-blur-2xl">
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px] px-2 md:px-0">
                  <div
                    className="grid items-center border-b border-black/5 px-4 md:px-6 pb-4 text-[12px] font-bold text-slate-400"
                    style={{
                      gridTemplateColumns: isDetailed
                        ? "40px 1fr 90px 90px 90px 90px 100px"
                        : "40px 1fr 100px 100px",
                      gap: "12px",
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
                        className="group grid items-center rounded-2xl px-4 md:px-6 py-3 md:py-4 transition-all hover:bg-white/60"
                        style={{
                          gridTemplateColumns: isDetailed
                            ? "40px 1fr 90px 90px 90px 90px 100px"
                            : "40px 1fr 100px 100px",
                          gap: "12px",
                        }}
                      >
                        <span className="text-[16px] md:text-[18px] font-bold" style={{ color: getRankColor(team.rank) }}>
                          {team.rank}
                        </span>
                        <span className="font-bold text-[#0f172a] text-[13px] md:text-[14px] truncate" title={team.name}>{team.name}</span>

                        {isDetailed && (
                          <>
                            <span className="text-center font-medium text-[#0f172a] text-[13px]">{team.cat1}</span>
                            <span className="text-center font-medium text-[#0f172a] text-[13px]">{team.cat2}</span>
                            <span className="text-center font-medium text-[#0f172a] text-[13px]">{team.cat3}</span>
                          </>
                        )}

                        <span className="text-center font-bold text-[#5c75ff] text-[13px] md:text-[14px]">{team.total}</span>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setSelectedTeam(team)}
                            className="rounded-full bg-[#5c75ff] px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95"
                          >
                            Детальніше
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex justify-center pb-2 md:pb-4">
                <button
                  onClick={() => setIsDetailed(!isDetailed)}
                  className="rounded-2xl bg-[#5c75ff] px-8 md:px-12 py-3 md:py-4 text-[13px] md:text-[14px] font-bold text-white shadow-xl shadow-blue-500/25 active:scale-95 w-full sm:w-auto mx-4 sm:mx-0"
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