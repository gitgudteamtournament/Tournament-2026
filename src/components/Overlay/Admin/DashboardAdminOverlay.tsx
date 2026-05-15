import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CreateTourOverlay from "./CreateTourOverlay";
import TourPageRegistrOverlay from "./TourPageRegistrOverlay";
import TourPageRunningOverlay from "./TourPageRunningOverlay";
import ArchiveTournamentPage from "./ArchiveTournamentPage";
import { getTournaments, startTournament, closeSubmission, startEvaluation, finishTournament } from "../../../api/tournaments";
import { createAnnouncement } from "../../../api/announcements";
import { useAuth } from "../../../context/AuthContext";
import type { TournamentCard } from "../../../api/tournaments";

interface StatBoxProps {
  count: string | number;
  label: string;
  color: string;
  icon: ReactNode;
}

const Theme = {
  glass: "bg-white/40 backdrop-blur-[20px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
  card: "bg-white rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-white/60",
  btnBlue: "bg-[#5c75ff] text-white shadow-[0_10px_20px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50",
  btnWhite: "bg-white text-[#5c75ff] shadow-[0_10px_20px_rgba(0,0,0,0.03)] border border-slate-50 hover:bg-slate-50 active:scale-95 transition-all",
  input: "w-full bg-white border border-slate-200 rounded-[18px] px-4 md:px-6 py-3 md:py-4 outline-none focus:border-[#5c75ff] transition-all text-[14px] md:text-[15px]"
};

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>
);

export default function DashboardAdminOverlay() {
  const { user } = useAuth();
  const [showCreateTour, setShowCreateTour] = useState(false);
  const [showTourRegistr, setShowTourRegistr] = useState(false);
  const [showTourRunning, setShowTourRunning] = useState(false);
  const [showTourArchive, setShowTourArchive] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedTourName, setSelectedTourName] = useState("");

  const [tournaments, setTournaments] = useState<TournamentCard[]>([]);
  const [draftCount, setDraftCount] = useState(0);
  const [archiveCount, setArchiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTours = () => {
    setLoading(true);
    Promise.all([
      getTournaments(),
      getTournaments("DRAFT"),
      getTournaments("FINISHED"),
    ])
      .then(([all, drafts, archived]) => {
        setTournaments(all.filter(t => t.status !== "DRAFT" && t.status !== "FINISHED"));
        setDraftCount(drafts.length);
        setArchiveCount(archived.length);
      })
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSaveTournament = () => {
    setShowCreateTour(false);
    fetchTours();
  };

  const handleOpenDetails = (t: TournamentCard) => {
    if (t.status === "REGISTRATION") {
      setSelectedTournamentId(t.id);
      setShowTourRegistr(true);
    } else if (t.status === "SUBMISSION_OPEN" || t.status === "SUBMISSION_CLOSED" || t.status === "EVALUATION") {
      setSelectedTournamentId(t.id);
      setShowTourRunning(true);
    } else if (t.status === "FINISHED") {
      setSelectedTournamentId(t.id);
      setShowTourArchive(true);
    }
  };

  const handleLifecycleAction = async (tournamentId: number, action: string) => {
    if (!user?.login) return;
    try {
      switch (action) {
        case "closeRegistration":
          await startTournament(tournamentId, parseInt(user.login));
          break;
        case "closeSubmission":
          await closeSubmission(tournamentId, parseInt(user.login));
          break;
        case "startEvaluation":
          await startEvaluation(tournamentId, parseInt(user.login));
          break;
        case "finish":
          await finishTournament(tournamentId, parseInt(user.login));
          break;
      }
      fetchTours();
    } catch (err: any) {
      setError(err.message || "Action failed");
    }
  };

  const handleAnnouncementSent = async (tournamentId: number, title: string, content: string) => {
    try {
      await createAnnouncement({ title, content, createdBy: parseInt(user?.login || "0") });
      setShowAnnouncement(false);
    } catch (err: any) {
      setError(err.message || "Failed to send announcement");
    }
  };

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      REGISTRATION: "bg-[#5c75ff]",
      SUBMISSION_OPEN: "bg-[#4ade80]",
      SUBMISSION_CLOSED: "bg-[#f59e0b]",
      EVALUATION: "bg-[#8b5cf6]",
      FINISHED: "bg-[#1e293b]",
      DRAFT: "bg-[#94a3b8]",
    };
    return map[status] || "bg-[#94a3b8]";
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      REGISTRATION: "Registration",
      SUBMISSION_OPEN: "Submission Open",
      SUBMISSION_CLOSED: "Submission Closed",
      EVALUATION: "Evaluation",
      FINISHED: "Finished",
      DRAFT: "Draft",
    };
    return map[status] || status;
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {showCreateTour ? (
          <motion.div
            key="create-section"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="pt-6 md:pt-10 pb-16 md:pb-24 max-w-[1400px] mx-auto px-4 md:px-6"
          >
            <CreateTourOverlay onClose={() => setShowCreateTour(false)} onSave={handleSaveTournament} />
          </motion.div>
        ) : showTourRegistr && selectedTournamentId ? (
          <motion.div
            key="registr-section"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
          >
            <TourPageRegistrOverlay onClose={() => setShowTourRegistr(false)} tournamentId={selectedTournamentId} />
          </motion.div>
        ) : showTourRunning && selectedTournamentId ? (
          <motion.div
            key="running-section"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
          >
            <TourPageRunningOverlay onClose={() => setShowTourRunning(false)} tournamentId={selectedTournamentId} />
          </motion.div>
        ) : showTourArchive && selectedTournamentId ? (
          <motion.div
            key="archive-section"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
          >
            <ArchiveTournamentPage onBack={() => setShowTourArchive(false)} tournamentId={selectedTournamentId} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-section"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-8 md:space-y-12 pt-6 md:pt-10 pb-16 md:pb-24 max-w-[1400px] mx-auto px-4 md:px-6"
          >
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-[14px] font-medium">{error}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 md:gap-6">
              <StatBox
                count={draftCount.toString()}
                label="Drafts"
                color="bg-[#f0f9ff]"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>}
              />
              <StatBox
                count={tournaments.length.toString()}
                label="Активні турніри"
                color="bg-[#f0fdf4]"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
              />
              <StatBox
                count={archiveCount.toString()}
                label="Архівні турніри"
                color="bg-[#f5f3ff]"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" className="w-5 h-5 md:w-6 md:h-6"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg>}
              />
            </div>

            <section className={`${Theme.glass} rounded-[30px] md:rounded-[45px] p-6 md:p-12 relative`}>
              <h2 className="text-[24px] md:text-[32px] font-bold mb-6 md:mb-10">Drafts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {loading ? (
                  <p className="text-slate-400 font-medium">Loading...</p>
                ) : (
                  tournaments.filter(t => t.status === "DRAFT").map((t) => (
                    <DraftCard key={t.id} name={t.title} rounds="0" onPublish={(id) => handleLifecycleAction(id, "publish")} tournamentId={t.id} />
                  ))
                )}
                {!loading && tournaments.filter(t => t.status === "DRAFT").length === 0 && (
                  <p className="text-slate-400 font-medium col-span-full">Немає чернеток</p>
                )}
              </div>
            </section>

            <div className="relative z-40">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-10 h-10 md:w-12 md:h-10 bg-[#5c75ff] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 left-0 w-[200px] md:w-[220px] bg-white rounded-2xl p-3 md:p-4 shadow-2xl border border-slate-100 z-50"
                  >
                    {['REGISTRATION', 'SUBMISSION_OPEN', 'SUBMISSION_CLOSED', 'EVALUATION', 'FINISHED'].map((f, i) => (
                      <div key={f} onClick={() => setIsFilterOpen(false)} className={`py-2 px-3 text-[13px] md:text-[14px] font-bold cursor-pointer rounded-lg hover:bg-[#5c75ff]/5 hover:text-[#5c75ff] ${i === 0 ? 'text-black' : 'text-slate-400'}`}>
                        {f.replace(/_/g, ' ')}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <TournamentSection
              title="Мої турніри"
              items={tournaments}
              onAnnounce={(id: number, name: string) => { setSelectedTourName(name); setSelectedTournamentId(id); setShowAnnouncement(true); }}
              onCreate={() => setShowCreateTour(true)}
              onDetails={(t: TournamentCard) => handleOpenDetails(t)}
              onLifecycleAction={handleLifecycleAction}
              showAddBtn={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAnnouncement && selectedTournamentId && (
          <AnnouncementOverlay
            tourName={selectedTourName}
            onClose={() => setShowAnnouncement(false)}
            onSend={(title, content) => handleAnnouncementSent(selectedTournamentId, title, content)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TournamentSection({ title, items, onAnnounce, onCreate, onDetails, onLifecycleAction, showAddBtn }: any) {
  return (
    <section className={`${Theme.glass} rounded-[30px] md:rounded-[45px] p-6 md:p-12 relative`}>
      <h2 className="text-[24px] md:text-[34px] font-bold mb-6 md:mb-10">{title}</h2>
      <div className="space-y-4 md:space-y-6">
        {items.length === 0 ? (
          <p className="text-slate-400 font-medium">Немає турнірів</p>
        ) : (
          items.map((tour: TournamentCard) => (
            <TournamentRow
              key={tour.id}
              tournament={tour}
              onAnnounce={() => onAnnounce(tour.id, tour.title)}
              onDetails={() => onDetails(tour)}
              onLifecycleAction={onLifecycleAction}
            />
          ))
        )}
      </div>
      {showAddBtn && (
        <motion.button
          onClick={onCreate}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="absolute -bottom-6 md:-bottom-7 right-6 md:right-12 w-12 h-12 md:w-14 md:h-14 bg-[#5c75ff] rounded-full text-white flex items-center justify-center shadow-[0_15px_30px_rgba(92,117,255,0.4)] z-40"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </motion.button>
      )}
    </section>
  );
}

function TournamentRow({ tournament, onAnnounce, onDetails, onLifecycleAction }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const statusColorFn = (status: string) => {
    const colors: Record<string, string> = {
      REGISTRATION: "bg-[#5c75ff]",
      SUBMISSION_OPEN: "bg-[#4ade80]",
      SUBMISSION_CLOSED: "bg-[#f59e0b]",
      EVALUATION: "bg-[#8b5cf6]",
      FINISHED: "bg-[#1e293b]",
      DRAFT: "bg-[#94a3b8]",
    };
    return colors[status] || "bg-[#94a3b8]";
  };

  const statusLabelFn = (status: string) => {
    const labels: Record<string, string> = {
      REGISTRATION: "Registration",
      SUBMISSION_OPEN: "Submission Open",
      SUBMISSION_CLOSED: "Submission Closed",
      EVALUATION: "Evaluation",
      FINISHED: "Finished",
      DRAFT: "Draft",
    };
    return labels[status] || status;
  };

  const renderMenuItems = () => {
    const status = tournament.status;
    return (
      <>
        <button
          onClick={() => { onAnnounce(); setMenuOpen(false); }}
          className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Надіслати оголошення
        </button>
        {status === "REGISTRATION" && (
          <button
            onClick={() => { onLifecycleAction(tournament.id, "closeRegistration"); setMenuOpen(false); }}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Завершити реєстрацію
          </button>
        )}
        {status === "SUBMISSION_CLOSED" && (
          <button
            onClick={() => { onLifecycleAction(tournament.id, "startEvaluation"); setMenuOpen(false); }}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Почати оцінювання
          </button>
        )}
        {status === "EVALUATION" && (
          <button
            onClick={() => { onLifecycleAction(tournament.id, "finish"); setMenuOpen(false); }}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Завершити оцінювання
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`${Theme.card} p-5 md:p-9 flex flex-col lg:flex-row gap-4 lg:items-center justify-between transition-all relative`}>
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h3 className="text-[20px] md:text-[26px] font-bold">{tournament.title}</h3>
          <span className={`${statusColorFn(tournament.status)} text-white text-[9px] md:text-[10px] px-3 md:px-4 py-1 rounded-full font-black uppercase tracking-wider`}>
            {statusLabelFn(tournament.status)}
          </span>
        </div>
        <p className="text-slate-400 text-[13px] md:text-[14px] font-medium">{tournament.format || "N/A"}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <button
          onClick={onDetails}
          className={`${Theme.btnWhite} px-5 md:px-10 py-2.5 md:py-3.5 rounded-[16px] md:rounded-[20px] font-bold text-[13px] md:text-[14px]`}
        >
          Детальніше
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-black hover:bg-slate-100 rounded-full transition-all"
          >
            <MoreIcon />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                className="absolute right-0 top-12 mt-2 w-[200px] bg-white rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-[100]"
              >
                {renderMenuItems()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatBox({ count, label, color, icon }: StatBoxProps) {
  return (
    <div className={`${color} px-5 md:px-8 py-4 md:py-5 rounded-[20px] md:rounded-[28px] flex items-center gap-4 md:gap-5 min-w-[unset] sm:min-w-[220px] border border-white/50`}>
      <div className="bg-white p-2 md:p-3 rounded-xl shadow-inner flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[20px] md:text-[26px] font-black leading-none">{count}</div>
        <div className="text-[12px] md:text-[14px] font-bold text-slate-500 mt-1">{label}</div>
      </div>
    </div>
  );
}

function DraftCard({ name, rounds, onPublish, tournamentId }: { name: string, rounds: string, onPublish: (id: number) => void, tournamentId: number }) {
  return (
    <div className={`${Theme.card} p-6 md:p-10 transition-transform hover:scale-[1.01]`}>
      <h3 className="text-[22px] md:text-[28px] font-bold mb-4 md:mb-6">{name}</h3>
      <div className="space-y-1 text-slate-500 text-[14px] md:text-[15px] mb-6 md:mb-10 font-medium">
        <p>Статус: <span className="text-black font-bold">Draft</span></p>
        <p>Раунди: <span className="text-black font-bold">{rounds}</span></p>
        <p>Дедлайн: <span className="text-slate-300 italic">немає</span></p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <button className={`${Theme.btnWhite} flex-1 py-3 md:py-4 rounded-[16px] md:rounded-[20px] font-bold`}>Детальніше</button>
        <button onClick={() => onPublish(tournamentId)} className={`${Theme.btnBlue} flex-1 py-3 md:py-4 rounded-[16px] md:rounded-[20px] font-bold`}>Опублікувати</button>
      </div>
    </div>
  );
}

function AnnouncementOverlay({ tourName, onClose, onSend }: { tourName: string, onClose: () => void, onSend: (title: string, content: string) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/20 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-[680px] rounded-[24px] md:rounded-[32px] shadow-2xl p-6 md:p-12 space-y-6 md:space-y-8 z-10" >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[18px] md:text-[24px] font-bold">Оголошення: {tourName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="space-y-4 md:space-y-6">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={Theme.input} placeholder="Заголовок..." />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className={`${Theme.input} min-h-[120px] md:min-h-[160px] resize-y`} placeholder="Повідомлення..." />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button onClick={onClose} className="flex-1 py-3 md:py-4 bg-[#f1f5f9] text-slate-500 font-bold rounded-[16px] md:rounded-[20px] hover:bg-slate-200 transition-colors">Скасувати</button>
          <button onClick={() => onSend(title, content)} disabled={!title || !content} className="flex-1 py-3 md:py-4 bg-[#5c75ff] text-white font-bold rounded-[16px] md:rounded-[20px] shadow-[0_10px_20px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50">Надіслати</button>
        </div>
      </motion.div>
    </div>
  );
}