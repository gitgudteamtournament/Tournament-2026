import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateTourProps {
  onClose: () => void;
  onSave: (tour: any) => void;
}

const Theme = {
  // Добавил max-h и overflow-y-auto, чтобы окно не улетало вниз
  card: "bg-white/30 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-full max-w-[1100px] max-h-[90vh] overflow-y-auto relative custom-scrollbar",
  section: "bg-white/40 p-6 rounded-[28px] border border-white/60 mb-6 shadow-sm",
  label: "text-[14px] font-bold mb-3 block text-[#1e293b]",
  input: "w-full bg-white rounded-[18px] px-5 py-3.5 outline-none text-[#1e293b] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5c75ff]/20 transition-all",
  dateTimeGroup: "flex items-center gap-3 bg-white px-4 py-3 rounded-[18px] shadow-sm border border-slate-50 flex-1",
  btnPrimary: "px-10 py-3.5 bg-[#5c75ff] text-white font-bold rounded-[22px] shadow-lg shadow-[#5c75ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50",
  btnSecondary: "px-10 py-3.5 bg-white text-slate-600 font-bold rounded-[22px] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"
};

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer text-[#1e293b]"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

export default function CreateTourOverlay({ onClose, onSave }: CreateTourProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    format: "one-round",
    hasMaxTeams: false
  });

  // Блокируем скролл основной страницы при открытом оверлее
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-slate-900/10 backdrop-blur-sm">
      <motion.div
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      <motion.div
        className={Theme.card}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {!isPreview ? (
          /* --- ШАГ 1: СОЗДАНИЕ --- */
          <div className="animate-in fade-in duration-300">
            <h1 className="text-[32px] md:text-[36px] font-bold text-[#1e293b] mb-10">Створення турніру</h1>

            <div className={Theme.section}>
              <label className={Theme.label}>Назва турніру</label>
              <input
                type="text"
                className={Theme.input}
                placeholder="Введіть назву турніру"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={Theme.section}>
              <label className={Theme.label}>Опис/правила</label>
              <textarea
                className={`${Theme.input} min-h-[140px] resize-none`}
                placeholder="Текст..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {[
                { label: "Тривалість турніру", key: "duration" },
                { label: "Термін реєстрації команд", key: "reg" }
              ].map((item) => (
                <div key={item.key} className={Theme.section + " mb-0"}>
                  <label className={Theme.label}>{item.label}</label>
                  <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className={Theme.dateTimeGroup}>
                      <CalendarIcon />
                      <input type="text" placeholder="дд.мм.рррр" className="bg-transparent outline-none w-full text-sm" />
                      <input type="text" defaultValue="00:00" className="bg-transparent outline-none w-12 text-sm text-right font-medium" />
                      <ClockIcon />
                    </div>
                    <ArrowIcon />
                    <div className={Theme.dateTimeGroup}>
                      <CalendarIcon />
                      <input type="text" placeholder="дд.мм.рррр" className="bg-transparent outline-none w-full text-sm" />
                      <input type="text" defaultValue="00:00" className="bg-transparent outline-none w-12 text-sm text-right font-medium" />
                      <ClockIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 px-2 mb-8">
              <input
                type="checkbox"
                id="maxTeams"
                className="w-5 h-5 rounded-[6px] border-slate-300 text-[#5c75ff] accent-[#5c75ff] cursor-pointer"
                checked={formData.hasMaxTeams}
                onChange={(e) => setFormData({ ...formData, hasMaxTeams: e.target.checked })}
              />
              <label htmlFor="maxTeams" className="text-[14px] font-bold text-[#1e293b] cursor-pointer">Максимальна кількість команд</label>
            </div>

            <div className="mb-10 px-2">
              <label className={Theme.label}>Формат турніру</label>
              <div className="flex items-center gap-2 bg-white/60 p-1.5 rounded-[20px] w-max shadow-sm border border-white/80 font-bold text-sm">
                <button
                  onClick={() => setFormData({ ...formData, format: "one-round" })}
                  className={`px-8 py-2.5 rounded-[16px] transition-all ${formData.format === 'one-round' ? 'bg-[#5c75ff] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Один раунд
                </button>
                <button
                  onClick={() => setFormData({ ...formData, format: "multi-round" })}
                  className={`px-8 py-2.5 rounded-[16px] transition-all ${formData.format === 'multi-round' ? 'bg-[#5c75ff] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Декілька раунд
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => formData.name && setIsPreview(true)}
                className={Theme.btnPrimary}
                disabled={!formData.name}
              >
                Створити
              </button>
              <button className={Theme.btnSecondary}>Зберегти</button>
              <button onClick={onClose} className="px-10 py-3.5 text-slate-400 font-bold hover:text-slate-600 transition-colors">Скасувати</button>
            </div>
          </div>
        ) : (
          /* --- ШАГ 2: ПРЕДПРОСМОТР --- */
          <div className="animate-in slide-in-from-right-4 duration-400">
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-8 transition-colors font-bold text-[11px] uppercase tracking-[1.5px]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
              На головну
            </button>

            <div className="flex flex-col xl:flex-row gap-12">
              <div className="flex-1 space-y-10">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-[36px] md:text-[48px] font-black text-[#1e293b] leading-tight">
                      {formData.name || "Назва турніру"}
                    </h1>
                    <button onClick={() => setIsPreview(false)} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                      <EditIcon />
                    </button>
                  </div>
                  <span className="bg-[#e2ff4a] text-black px-5 py-1.5 rounded-full font-black text-[12px] uppercase tracking-wider shadow-sm">
                    Draft
                  </span>
                </div>

                <div className="flex items-center gap-6 bg-white/30 w-max p-4 rounded-[24px] border border-white/40">
                  <p className="text-slate-600 font-bold text-sm">Раундів: не створено</p>
                  <button className="px-6 py-2.5 bg-[#5c75ff] text-white font-bold rounded-[14px] text-[11px] uppercase tracking-wider shadow-lg shadow-[#5c75ff]/20 active:scale-95 transition-all">
                    Створити
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[22px] md:text-[26px] font-bold text-[#1e293b]">Опис</h3>
                    <button onClick={() => setIsPreview(false)} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                      <EditIcon />
                    </button>
                  </div>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed whitespace-pre-wrap max-w-[600px]">
                    {formData.description || "Текст опису еще не добавлен..."}
                  </p>
                </div>
              </div>

              <div className="w-full xl:w-[420px] space-y-4">
                {[
                  { label: "Тривалість турніру", key: "d1" },
                  { label: "Термін реєстрації команд", key: "d2" }
                ].map((item) => (
                  <div key={item.key} className="bg-white/50 p-6 rounded-[32px] border border-white/60 shadow-sm backdrop-blur-md">
                    <label className={Theme.label}>{item.label}</label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-[18px] border border-slate-50 shadow-sm">
                        <CalendarIcon />
                        <span className="text-slate-500 text-sm font-medium">дд.мм.рррр</span>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1e293b]">00:00</span>
                          <ClockIcon />
                        </div>
                      </div>
                      <div className="flex justify-center rotate-90 xl:rotate-0">
                        <ArrowIcon />
                      </div>
                      <div className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-[18px] border border-slate-50 shadow-sm">
                        <CalendarIcon />
                        <span className="text-slate-500 text-sm font-medium">дд.мм.рррр</span>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1e293b]">00:00</span>
                          <ClockIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-5 mt-16 pt-8 border-t border-white/20">
              <button onClick={() => onSave(formData)} className={Theme.btnPrimary}>Опублікувати</button>
              <button className={Theme.btnSecondary}>Зберегти</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}