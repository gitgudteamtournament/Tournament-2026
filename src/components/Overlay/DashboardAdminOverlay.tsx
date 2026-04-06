import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTourOverlay from "./CreateTourOverlay";
import TourPageRegistrOverlay from "./TourPageRegistrOverlay";

const Theme = {
  glass: "bg-white/40 backdrop-blur-[20px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
  card: "bg-white rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-white/60",
  btnBlue: "bg-[#5c75ff] text-white shadow-[0_10px_20px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50",
  btnWhite: "bg-white text-[#5c75ff] shadow-[0_10px_20px_rgba(0,0,0,0.03)] border border-slate-50 hover:bg-slate-50 active:scale-95 transition-all",
  input: "w-full bg-white border border-slate-200 rounded-[18px] px-4 md:px-6 py-3 md:py-4 outline-none focus:border-[#5c75ff] transition-all text-[14px] md:text-[15px]"
};

export default function DashboardAdminOverlay() {
  const [showCreateTour, setShowCreateTour] = useState(false);
  const [showTourRegistr, setShowTourRegistr] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedTourName, setSelectedTourName] = useState("");

  const [tournaments, setTournaments] = useState([
    { id: 1, name: "Назва", status: "Running", color: "bg-[#4ade80]", date: "01.01.26 - 01.01.27", type: "active" },
    { id: 2, name: "Назва", status: "Registration", color: "bg-[#5c75ff]", date: "01.01.26 - 01.01.27", type: "registration" }
  ]);

  const handleSaveTournament = (newTour: any) => {
    setTournaments(prev => [{
      id: Date.now(),
      name: newTour.name || "Новий турнір",
      status: "Registration",
      color: "bg-[#5c75ff]",
      date: "03.04.26 - 03.05.26",
      type: "registration"
    }, ...prev]);
    setShowCreateTour(false);
  };

  const handleOpenDetails = (status: string) => {
    if (status === "Registration") {
      setShowTourRegistr(true);
    } else {
      console.log("Open other details");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {showCreateTour ? (
          <motion.div
            key="create-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-6 md:pt-10 pb-16 md:pb-24 max-w-[1400px] mx-auto px-4 md:px-6"
          >
            <CreateTourOverlay
              onClose={() => setShowCreateTour(false)}
              onSave={handleSaveTournament}
            />
          </motion.div>
        )

          : showTourRegistr ? (
            <motion.div
              key="registr-section"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <TourPageRegistrOverlay onClose={() => setShowTourRegistr(false)} />
            </motion.div>
          )

            : (
              <motion.div
                key="dashboard-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8 md:space-y-12 pt-6 md:pt-10 pb-16 md:pb-24 max-w-[1400px] mx-auto px-4 md:px-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 md:gap-6">
                  <StatBox count="2" label="Drafts" color="bg-[#f0f9ff]" img="/draft-icon.png" />
                  <StatBox count={tournaments.length.toString()} label="Активні турніри" color="bg-[#f0f9ff]" img="/active-icon.png" />
                  <StatBox count="3" label="Архівні турніри" color="bg-[#f5f3ff]" img="/archive-icon.png" />
                </div>

                <section className={`${Theme.glass} rounded-[30px] md:rounded-[45px] p-6 md:p-12 relative`}>
                  <h2 className="text-[24px] md:text-[32px] font-bold mb-6 md:mb-10">Drafts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <DraftCard name="Назва" rounds="1" />
                    <DraftCard name="Назва" rounds="3" />
                  </div>
                </section>

                <div className="relative z-40">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-10 h-10 md:w-12 md:h-10 bg-[#5c75ff] rounded-xl flex items-center justify-center text-white shadow-lg"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                  </button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 left-0 w-[200px] md:w-[220px] bg-white rounded-2xl p-3 md:p-4 shadow-2xl border border-white z-50"
                      >
                        {['Мої турніри', 'Registration open', 'Running', 'Finished'].map((f, i) => (
                          <div key={f} className={`py-2 px-3 text-[13px] md:text-[14px] font-bold cursor-pointer rounded-lg hover:bg-[#5c75ff]/5 hover:text-[#5c75ff] ${i === 0 ? 'text-black' : 'text-slate-400'}`}>
                            {f}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <TournamentSection
                  title="Мої турніри"
                  items={tournaments}
                  onAnnounce={(name: string) => { setSelectedTourName(name); setShowAnnouncement(true); }}
                  onCreate={() => setShowCreateTour(true)}
                  onDetails={(status: string) => handleOpenDetails(status)}
                  showAddBtn={true}
                />

                <TournamentSection
                  title="Активні турніри"
                  items={[{ id: 99, name: "Назва турніру", status: "Running", color: "bg-[#4ade80]", date: "01.01.26 - 01.01.27", type: "active" }]}
                  onAnnounce={(name: string) => { setSelectedTourName(name); setShowAnnouncement(true); }}
                  onDetails={(status: string) => handleOpenDetails(status)}
                />

                <TournamentSection
                  title="Архів"
                  items={[{ id: 100, name: "Назва", status: "Finished", color: "bg-[#1e293b]", date: "01.01.25 - 01.01.25", type: "archive" }]}
                  onAnnounce={() => { }}
                  onDetails={(status: string) => handleOpenDetails(status)}
                  isArchive={true}
                />
              </motion.div>
            )}
      </AnimatePresence>

      <AnimatePresence>
        {showAnnouncement && (
          <AnnouncementOverlay tourName={selectedTourName} onClose={() => setShowAnnouncement(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function TournamentSection({ title, items, onAnnounce, onCreate, onDetails, showAddBtn, isArchive }: any) {
  return (
    <section className={`${Theme.glass} rounded-[30px] md:rounded-[45px] p-6 md:p-12 relative ${isArchive ? 'opacity-80' : ''}`}>
      <h2 className="text-[24px] md:text-[34px] font-bold mb-6 md:mb-10">{title}</h2>
      <div className="space-y-4 md:space-y-6">
        {items.map((tour: any) => (
          <TournamentRow
            key={tour.id}
            {...tour}
            onAnnounce={() => onAnnounce(tour.name)}
            onDetails={() => onDetails(tour.status)}
            isArchive={isArchive}
          />
        ))}
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

function TournamentRow({ name, status, color, date, onAnnounce, onDetails, isArchive }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className={`${Theme.card} p-5 md:p-9 flex flex-col lg:flex-row gap-4 lg:items-center justify-between transition-all`}>
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h3 className="text-[20px] md:text-[26px] font-bold">{name}</h3>
          <span className={`${color} text-white text-[9px] md:text-[10px] px-3 md:px-4 py-1 rounded-full font-black uppercase tracking-wider`}>{status}</span>
        </div>
        <p className="text-slate-400 text-[13px] md:text-[14px] font-medium">{date} • N команд</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-5" ref={menuRef}>
        <button
          onClick={onDetails}
          className={`${Theme.btnWhite} px-5 md:px-10 py-2.5 md:py-3.5 rounded-[16px] md:rounded-[20px] font-bold text-[13px] md:text-[14px]`}
        >
          Детальніше
        </button>
        <button className={`${Theme.btnBlue} px-5 md:px-10 py-2.5 md:py-3.5 rounded-[16px] md:rounded-[20px] font-bold text-[13px] md:text-[14px]`}>
          {isArchive ? "Leaderboard" : "Редагувати"}
        </button>
      </div>
    </div>
  );
}

function StatBox({ count, label, color, img }: any) {
  return (
    <div className={`${color} px-5 md:px-8 py-4 md:py-5 rounded-[20px] md:rounded-[28px] flex items-center gap-4 md:gap-5 min-w-[unset] sm:min-w-[220px] border border-white/50`}>
      <div className="bg-white p-2 md:p-3 rounded-xl shadow-inner"><img src={img} className="w-5 h-5 md:w-6 md:h-6 object-contain" /></div>
      <div>
        <div className="text-[20px] md:text-[26px] font-black leading-none">{count}</div>
        <div className="text-[12px] md:text-[14px] font-bold text-slate-500 mt-1">{label}</div>
      </div>
    </div>
  );
}

function DraftCard({ name, rounds }: any) {
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
        <button className={`${Theme.btnBlue} flex-1 py-3 md:py-4 rounded-[16px] md:rounded-[20px] font-bold`}>Опублікувати</button>
      </div>
    </div>
  );
}

function AnnouncementOverlay({ tourName, onClose }: { tourName: string, onClose: () => void }) {
  const [target, setTarget] = useState<'all' | 'judges'>('all');
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/20 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-[680px] rounded-[24px] md:rounded-[32px] shadow-2xl p-6 md:p-12 space-y-6 md:space-y-8 z-10" >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[18px] md:text-[24px] font-bold">Оголошення: {tourName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="space-y-4 md:space-y-6">
          <input type="text" className={Theme.input} placeholder="Заголовок..." />
          <textarea className={`${Theme.input} min-h-[120px] md:min-h-[160px]`} placeholder="Повідомлення..." />
          <div className="flex gap-6">
            {(['all', 'judges'] as const).map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" className="w-4 h-4 accent-[#5c75ff]" checked={target === t} onChange={() => setTarget(t)} />
                <span className="text-[14px] font-bold group-hover:text-[#5c75ff] transition-colors">{t === 'all' ? 'Усім' : 'Тільки журі'}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button onClick={onClose} className="flex-1 py-3 md:py-4 bg-[#f1f5f9] text-slate-500 font-bold rounded-[16px] md:rounded-[20px] hover:bg-slate-200 transition-colors">Скасувати</button>
          <button className="flex-1 py-3 md:py-4 bg-[#5c75ff] text-white font-bold rounded-[16px] md:rounded-[20px]">Надіслати</button>
        </div>
      </motion.div>
    </div>
  );
}