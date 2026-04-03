import { useState } from "react";
import { motion } from "framer-motion";

interface CreateTourProps {
  onClose: () => void;
  onSave: (tour: any) => void;
}

const Theme = {
  input: "w-full bg-white border border-slate-100 rounded-[18px] px-6 py-4 outline-none focus:border-[#5c75ff] transition-all text-[15px] shadow-sm",
  label: "text-[13px] font-black mb-3 block text-slate-400 uppercase tracking-widest",
  section: "bg-white/50 p-8 rounded-[35px] border border-white/60 shadow-sm space-y-4",
  dateBox: "flex items-center gap-4 bg-white border border-slate-100 rounded-[18px] p-2 shadow-sm focus-within:border-[#5c75ff] transition-all"
};

export default function CreateTourOverlay({ onClose, onSave }: CreateTourProps) {
  const [isDraftPreview, setIsDraftPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    regStart: "",
    regEnd: "",
    format: "one-round"
  });

  const handleCreateInitial = () => {
    if (formData.name.trim()) {
      setIsDraftPreview(true);
      window.scrollTo(0, 0);
    } else {
      alert("Будь ласка, введіть назву турніру");
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1000px] mx-auto py-6">
        
        <button 
          onClick={onClose} 
          className="flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-10 transition-colors font-bold text-[14px]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
          На головну
        </button>

        {!isDraftPreview ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <h1 className="text-[42px] font-black text-[#1e293b] tracking-tight">Створення турніру</h1>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className={Theme.label}>Назва турніру</label>
                <input 
                  type="text" 
                  className={Theme.input} 
                  placeholder="Введіть назву..."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className={Theme.label}>Опис / Правила</label>
                <textarea 
                  className={`${Theme.input} min-h-[180px] py-5 resize-none`} 
                  placeholder="Додайте деталі турніру..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={Theme.label}>Тривалість турніру</label>
                  <div className={Theme.dateBox}>
                     <input type="date" value={formData.startDate} onChange={(e)=>setFormData({...formData, startDate: e.target.value})} className="flex-1 bg-transparent px-3 py-2 outline-none text-[14px] font-bold" />
                     <div className="w-4 h-[2px] bg-slate-200" />
                     <input type="date" value={formData.endDate} onChange={(e)=>setFormData({...formData, endDate: e.target.value})} className="flex-1 bg-transparent px-3 py-2 outline-none text-[14px] font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={Theme.label}>Термін реєстрації</label>
                  <div className={Theme.dateBox}>
                     <input type="date" value={formData.regStart} onChange={(e)=>setFormData({...formData, regStart: e.target.value})} className="flex-1 bg-transparent px-3 py-2 outline-none text-[14px] font-bold" />
                     <div className="w-4 h-[2px] bg-slate-200" />
                     <input type="date" value={formData.regEnd} onChange={(e)=>setFormData({...formData, regEnd: e.target.value})} className="flex-1 bg-transparent px-3 py-2 outline-none text-[14px] font-bold" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className={Theme.label}>Формат турніру</label>
                <div className="flex gap-10">
                  {['one-round', 'multi-round'].map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        checked={formData.format === f} 
                        onChange={() => setFormData({...formData, format: f})} 
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.format === f ? 'border-[#5c75ff]' : 'border-slate-300'}`}>
                        {formData.format === f && <div className="w-2.5 h-2.5 bg-[#5c75ff] rounded-full" />}
                      </div>
                      <span className={`font-bold text-[15px] ${formData.format === f ? 'text-black' : 'text-slate-400'}`}>
                        {f === 'one-round' ? 'Один раунд' : 'Декілька раундів'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-10">
              <button 
                onClick={handleCreateInitial} 
                className="px-14 py-4 bg-[#5c75ff] text-white font-bold rounded-[22px] shadow-[0_15px_30px_rgba(92,117,255,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Створити
              </button>
              <button className="px-10 py-4 bg-white text-slate-500 font-bold rounded-[22px] border border-slate-100 hover:bg-slate-50 transition-all">
                Зберегти в чернетку
              </button>
              <button onClick={onClose} className="text-slate-400 font-bold hover:text-red-400 px-6 transition-colors">
                Скасувати
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              
              <div className="flex-1 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h1 className="text-[48px] font-black text-[#1e293b] leading-tight">{formData.name}</h1>
                    <button onClick={() => setIsDraftPreview(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                      <img src="/Edit.png" className="w-6 h-6 opacity-40 hover:opacity-100" />
                    </button>
                  </div>
                  <div className="inline-block bg-[#e2ff4a] text-black px-6 py-1.5 rounded-full font-black text-[12px] uppercase tracking-wider shadow-sm">
                    Draft
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-400 font-black text-[14px] uppercase tracking-widest">Раунди</p>
                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-slate-100 text-slate-400 rounded-2xl font-bold italic">Ще не створено</div>
                    <button className="w-12 h-12 bg-[#5c75ff] rounded-[18px] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <p className="text-slate-400 font-black text-[14px] uppercase tracking-widest">Опис</p>
                    <button onClick={() => setIsDraftPreview(false)}><img src="/Edit.png" className="w-4 h-4 opacity-30" /></button>
                  </div>
                  <p className="text-[#1e293b]/70 font-medium text-[16px] leading-relaxed max-w-xl">
                    {formData.description || "Опис відсутній..."}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-[400px]">
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-xl space-y-8">
                  <div className="space-y-3">
                    <label className={Theme.label}>Тривалість</label>
                    <div className="bg-white/80 p-4 rounded-2xl border border-slate-50 flex items-center justify-between font-bold text-[14px]">
                      <span>{formData.startDate || "—"}</span>
                      <img src="/Arrow-right.png" className="w-4 opacity-20" />
                      <span>{formData.endDate || "—"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className={Theme.label}>Реєстрація</label>
                    <div className="bg-white/80 p-4 rounded-2xl border border-slate-50 flex items-center justify-between font-bold text-[14px]">
                      <span>{formData.regStart || "—"}</span>
                      <img src="/Arrow-right.png" className="w-4 opacity-20" />
                      <span>{formData.regEnd || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-10 border-t border-slate-100">
              <button 
                onClick={() => onSave(formData)} 
                className="px-16 py-5 bg-[#5c75ff] text-white font-black rounded-[24px] shadow-[0_20px_40px_rgba(92,117,255,0.3)] hover:brightness-110 hover:translate-y-[-2px] transition-all"
              >
                Опублікувати турнір
              </button>
              <button className="px-10 py-5 bg-white text-slate-500 font-bold rounded-[24px] border border-slate-100 hover:bg-slate-50 transition-all">
                Зберегти зміни
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}