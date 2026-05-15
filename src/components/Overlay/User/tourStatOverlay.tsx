import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTournament } from "../../../api/tournaments";
import type { Tournament } from "../../../api/tournaments";

interface TourStatOverlayProps {
  tournamentId: number;
  onRegister: () => void;
  onLeaderboardClick: () => void;
}

export default function TourStatOverlay({ tournamentId, onRegister, onLeaderboardClick }: TourStatOverlayProps) {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tournamentId) return;
    setLoading(true);
    getTournament(tournamentId)
      .then(setTournament)
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [tournamentId]);

  if (loading) return <div className="mt-8 text-center font-bold text-[#1e293b]">Loading...</div>;
  if (error) return <div className="mt-8 text-center font-bold text-red-500">{error}</div>;
  if (!tournament) return null;

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mt-8 space-y-6"
    >
      <div className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-8 md:p-12 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div className="flex-1">
            <h2 className="text-[32px] md:text-[48px] font-bold mb-4 text-[#0f172a]">{tournament.title}</h2>
            <p className="text-[16px] md:text-[18px] text-[#1e293b]/70 font-medium mb-10">
              {tournament.description || "Опис відсутній"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
              className="bg-[#5c75ff] text-white font-bold py-3 px-12 rounded-[12px] shadow-lg hover:brightness-110 transition-all"
            >
              Продовжити
            </motion.button>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-[280px]">
            <div className="bg-white/40 border border-white/60 rounded-[20px] p-5 shadow-sm min-h-[80px]">
              <p className="text-[10px] font-bold text-[#1e293b]/50 uppercase tracking-widest">Статус</p>
              <p className="text-[16px] font-bold text-[#1e293b]">{tournament.status}</p>
            </div>

            <div className="bg-white/40 border border-white/60 rounded-[20px] p-5 shadow-sm min-h-[80px]">
              <p className="text-[10px] font-bold text-[#1e293b]/50 uppercase tracking-widest">Формат</p>
              <p className="text-[16px] font-bold text-[#1e293b]">{tournament.format || "N/A"}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLeaderboardClick}
              className="mt-2 bg-[#5c75ff] text-white font-bold py-3 px-6 rounded-[12px] shadow-md hover:brightness-110 transition-all text-[14px]"
            >
              Таблиця лідерів
            </motion.button>
          </div>
        </div>
      </div>

      <div className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-8 md:p-12 space-y-12 shadow-sm">
        <section>
          <h3 className="text-[24px] md:text-[30px] font-bold mb-4">Про турнір</h3>
          <p className="text-[#1e293b]/80 font-medium">{tournament.description || "Опис відсутній"}</p>
        </section>
        <section>
          <h3 className="text-[24px] md:text-[30px] font-bold mb-4">Rules</h3>
          <p className="text-[#1e293b]/80 font-medium">{tournament.rules || "Правила відсутні"}</p>
        </section>
      </div>
    </motion.main>
  );
}