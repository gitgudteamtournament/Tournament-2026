import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTourOverlay from "./CreateTourOverlay";

const Theme = {
  glass: "bg-white/40 backdrop-blur-[20px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
  card: "bg-white rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-white/60",
  btnBlue: "bg-[#5c75ff] text-white shadow-[0_10px_20px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50",
  btnWhite: "bg-white text-[#5c75ff] shadow-[0_10px_20px_rgba(0,0,0,0.03)] border border-slate-50 hover:bg-slate-50 active:scale-95 transition-all",
  input: "w-full bg-white border border-slate-200 rounded-[18px] px-6 py-4 outline-none focus:border-[#5c75ff] transition-all text-[15px]"
};

export default function DashboardAdminOverlay() {
  const [showCreateTour, setShowCreateTour] = useState(false);
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

  return (
    <div className="relative w-full min-h-screen">
      <AnimatePresence mode="wait">
        {showCreateTour ? (
          <motion.div
            key="create-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-10 pb-24 max-w-[1400px] mx-auto px-6"
          >
            <CreateTourOverlay 
              onClose={() => setShowCreateTour(false)} 
              onSave={handleSaveTournament} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12 pt-10 pb-24 max-w-[1400px] mx-auto px-6"
          >
            <div className="flex flex-wrap gap-6">
              <StatBox count="2" label="Drafts" color="bg-[#f0f9ff]" img="/draft-icon.png" />
              <StatBox count={tournaments.length.toString()} label="Активні турніри" color="bg-[#f0f9ff]" img="/active-icon.png" />
              <StatBox count="3" label="Архівні турніри" color="bg-[#f5f3ff]" img="/archive-icon.png" />
            </div>

            <section className={`${Theme.glass} rounded-[45px] p-10 md:p-12 relative`}>
              <h2 className="text-[32px] font-bold mb-10 ml-2">Drafts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <DraftCard name="Назва" rounds="1" />
                <DraftCard name="Назва" rounds="3" />
              </div>
            </section>

            <div className="relative z-40 ml-6">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-12 h-10 bg-[#5c75ff] rounded-xl flex items-center justify-center text-white shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 left-0 w-[220px] bg-white rounded-2xl p-4 shadow-2xl border border-white z-50"
                  >
                    {['Мої турніри', 'Registration open', 'Running', 'Finished'].map((f, i) => (
                      <div key={f} className={`py-2.5 px-3 text-[14px] font-bold cursor-pointer rounded-lg hover:bg-[#5c75ff]/5 hover:text-[#5c75ff] ${i === 0 ? 'text-black' : 'text-slate-400'}`}>
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
              showAddBtn={true}
            />

            <TournamentSection 
              title="Активні турніри" 
              items={[{ id: 99, name: "Назва турніру", status: "Running", color: "bg-[#4ade80]", date: "01.01.26 - 01.01.27", type: "active" }]} 
              onAnnounce={(name: string) => { setSelectedTourName(name); setShowAnnouncement(true); }}
            />

            <TournamentSection 
              title="Архів" 
              items={[{ id: 100, name: "Назва", status: "Finished", color: "bg-[#1e293b]", date: "01.01.25 - 01.01.25", type: "archive" }]} 
              onAnnounce={() => {}}
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

function TournamentSection({ title, items, onAnnounce, onCreate, showAddBtn, isArchive }: any) {
  return (
    <section className={`${Theme.glass} rounded-[45px] p-10 md:p-12 relative ${isArchive ? 'opacity-80' : ''}`}>
      <h2 className="text-[34px] font-bold mb-10 ml-2">{title}</h2>
      <div className="space-y-6">
        {items.map((tour: any) => (
          <TournamentRow 
            key={tour.id} 
            {...tour} 
            onAnnounce={() => onAnnounce(tour.name)} 
            isArchive={isArchive} 
          />
        ))}
      </div>
      {showAddBtn && (
        <motion.button 
          onClick={onCreate}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="absolute -bottom-7 right-12 w-14 h-14 bg-[#5c75ff] rounded-full text-white flex items-center justify-center shadow-[0_15px_30px_rgba(92,117,255,0.4)] z-40 transition-all"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </motion.button>
      )}
    </section>
  );
}

function TournamentRow({ name, status, color, date, onAnnounce, isArchive }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if(menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const renderMenuItems = () => {
    if (status === "Running") {
      return (
        <>
          <div onClick={() => { onAnnounce(); setMenuOpen(false); }} className="p-3 text-[13px] font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Надіслати оголошення</div>
          <div className="p-3 text-[13px] font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Розподілити журі</div>
          <div className="p-3 text-[13px] font-bold hover:bg-slate-50 rounded-xl cursor-pointer text-red-500">Завершити оцінювання</div>
        </>
      );
    }
    if (status === "Registration") {
      return (
        <>
          <div onClick={() => { onAnnounce(); setMenuOpen(false); }} className="p-3 text-[13px] font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Надіслати оголошення</div>
          <div className="p-3 text-[13px] font-bold hover:bg-slate-50 rounded-xl cursor-pointer text-red-500">Завершити реєстрацію</div>
        </>
      );
    }
    return null;
  };

  return (
    <div className={`${Theme.card} p-9 flex items-center justify-between group relative`}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-5">
          <h3 className="text-[26px] font-bold">{name}</h3>
          <span className={`${color} text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-wider`}>{status}</span>
        </div>
        <p className="text-slate-400 text-[14px] font-medium">{date} • N команд</p>
      </div>
      <div className="flex items-center gap-5 relative" ref={menuRef}>
        <button className={`${Theme.btnWhite} px-10 py-3.5 rounded-[20px] font-bold text-[14px]`}>Детальніше</button>
        <button className={`${Theme.btnBlue} px-10 py-3.5 rounded-[20px] font-bold text-[14px]`}>{isArchive ? "Leaderboard" : "Редагувати"}</button>
        
        {!isArchive && (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-slate-300 hover:text-slate-500 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/></svg>
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                  className="absolute right-0 top-12 w-[240px] bg-white rounded-2xl p-2 shadow-2xl border border-slate-100 z-50"
                >
                  {renderMenuItems()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ count, label, color, img }: any) {
  return (
    <div className={`${color} px-8 py-5 rounded-[28px] flex items-center gap-5 min-w-[260px] shadow-sm border border-white/30`}>
      <div className="bg-white p-3 rounded-xl shadow-inner"><img src={img} className="w-6 h-6 object-contain" /></div>
      <div>
        <div className="text-[26px] font-black leading-none">{count}</div>
        <div className="text-[14px] font-bold text-slate-500 mt-1">{label}</div>
      </div>
    </div>
  );
}

function DraftCard({ name, rounds }: any) {
  return (
    <div className={`${Theme.card} p-10 hover:translate-y-[-4px] transition-all duration-300`}>
      <h3 className="text-[28px] font-bold mb-6">{name}</h3>
      <div className="space-y-1.5 text-slate-500 text-[15px] mb-10 font-medium">
        <p>Статус: <span className="text-black font-bold">Draft</span></p>
        <p>Раунди: <span className="text-black font-bold">{rounds}</span></p>
        <p>Дедлайн: <span className="text-slate-300 italic">немає</span></p>
      </div>
      <div className="flex gap-4">
        <button className={`${Theme.btnWhite} flex-1 py-4 rounded-[20px] font-bold`}>Детальніше</button>
        <button className={`${Theme.btnBlue} flex-1 py-4 rounded-[20px] font-bold`}>Опублікувати</button>
      </div>
    </div>
  );
}

function AnnouncementOverlay({ tourName, onClose }: { tourName: string, onClose: () => void }) {
  const [target, setTarget] = useState<'all' | 'judges'>('all');
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/20 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-[680px] rounded-[32px] shadow-2xl p-12 space-y-8 z-10" >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/Alert.png" className="w-8 h-8 object-contain" />
            <h2 className="text-[24px] font-bold uppercase tracking-tight text-[#1e293b]">Оголошення: {tourName}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-black ml-1 text-slate-400 uppercase tracking-widest">Заголовок</label>
            <input type="text" className={Theme.input} placeholder="Введіть заголовок..." />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-black ml-1 text-slate-400 uppercase tracking-widest">Текст</label>
            <textarea className={`${Theme.input} min-h-[160px] resize-none py-5`} placeholder="Повідомлення..." />
          </div>
          <div className="flex gap-10 ml-1">
            {(['all', 'judges'] as const).map((t) => (
              <label key={t} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" checked={target === t} onChange={() => setTarget(t)} className="hidden" />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${target === t ? 'border-[#5c75ff]' : 'border-slate-300'}`}>
                  {target === t && <div className="w-2.5 h-2.5 bg-[#5c75ff] rounded-full" />}
                </div>
                <span className={`text-[15px] font-bold ${target === t ? 'text-[#1e293b]' : 'text-slate-400'}`}>{t === 'all' ? 'Усім' : 'Тільки журі'}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button onClick={onClose} className="flex-1 py-4 bg-[#f1f5f9] text-slate-500 font-bold rounded-[20px] hover:bg-slate-200 transition-all">Скасувати</button>
          <button className="flex-1 py-4 bg-[#5c75ff] text-white font-bold rounded-[20px] shadow-lg shadow-[#5c75ff]/20 hover:brightness-110 transition-all">Надіслати</button>
        </div>
      </motion.div>
    </div>
  );
}