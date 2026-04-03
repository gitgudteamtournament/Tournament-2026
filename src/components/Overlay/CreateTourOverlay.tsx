import { useState } from "react";
import { motion } from "framer-motion";

interface CreateTourProps {
  onClose: () => void;
  onSave: (tour: any) => void;
}

const Theme = {
  input: "w-full bg-white border border-slate-100 rounded-[18px] px-6 py-4 outline-none focus:border-[#5c75ff] transition-all text-[15px] shadow-sm",
  label: "text-[14px] font-bold mb-3 block text-[#1e293b]",
  section: "bg-white/50 p-8 rounded-[35px] border border-white/60 shadow-sm space-y-4"
};

export default function CreateTourOverlay({ onClose, onSave }: CreateTourProps) {
  // Шаг 1: Форма (isEditing = false), Шаг 2: Предпросмотр (isEditing = true)
  const [isEditing, setIsEditing] = useState(false);
  
  // Данные формы
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
    if (formData.name) setIsEditing(true);
  };

  const handleFinalPublish = () => {
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[300] bg-[#f8fafc] overflow-y-auto"
    >
      <div className="max-w-[1000px] mx-auto px-6 py-16">
        
        {/* КНОПКА НАЗАД / ЗАКРЫТЬ */}
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-[#5c75ff] mb-8 transition-colors font-bold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          На головну
        </button>

        {!isEditing ? (
          /* --- СОСТОЯНИЕ 1: СОЗДАНИЕ (image_fa0d9e.png) --- */
          <div className="space-y-10">
            <h1 className="text-[36px] font-bold text-[#1e293b]">Створення турніру</h1>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className={Theme.label}>Назва турніру</label>
                <input 
                  type="text" 
                  className={Theme.input} 
                  placeholder="Введіть назву турніру"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className={Theme.label}>Опис/правила</label>
                <textarea 
                  className={`${Theme.input} min-h-[160px] py-5 resize-none`} 
                  placeholder="Текст..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={Theme.label}>Тривалість турніру</label>
                  <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-[18px] p-2 shadow-sm">
                     <input type="date" className="flex-1 bg-transparent px-4 py-2 outline-none" />
                     <img src="/Arrow-right.png" className="w-5 opacity-30" alt="" />
                     <input type="date" className="flex-1 bg-transparent px-4 py-2 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={Theme.label}>Термін реєстрації команд</label>
                  <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-[18px] p-2 shadow-sm">
                     <input type="date" className="flex-1 bg-transparent px-4 py-2 outline-none" />
                     <img src="/Arrow-right.png" className="w-5 opacity-30" alt="" />
                     <input type="date" className="flex-1 bg-transparent px-4 py-2 outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className={Theme.label}>Формат турніру</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="format" checked={formData.format === 'one-round'} onChange={() => setFormData({...formData, format: 'one-round'})} className="accent-[#5c75ff] w-4 h-4" />
                    <span className="font-bold text-[14px]">Один раунд</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="format" checked={formData.format === 'multi-round'} onChange={() => setFormData({...formData, format: 'multi-round'})} className="accent-[#5c75ff] w-4 h-4" />
                    <span className="font-bold text-[14px]">Декілька раундів</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5 pt-10">
              <button onClick={handleCreateInitial} className="px-12 py-4 bg-[#5c75ff] text-white font-bold rounded-[20px] shadow-lg shadow-[#5c75ff]/30 hover:brightness-110 transition-all">Створити</button>
              <button className="px-12 py-4 bg-white text-slate-500 font-bold rounded-[20px] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">Зберегти</button>
              <button onClick={onClose} className="px-12 py-4 bg-white text-slate-400 font-bold rounded-[20px] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">Скасувати</button>
            </div>
          </div>
        ) : (
          /* --- СОСТОЯНИЕ 2: РЕДАКТИРОВАНИЕ/ПРЕДПРОСМОТР (image_fa2406.png) --- */
          <div className="space-y-12">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-[42px] font-bold">{formData.name}</h1>
                  <button onClick={() => setIsEditing(false)}><img src="/Edit.png" className="w-6 h-6 object-contain" /></button>
                </div>
                <span className="bg-[#e2ff4a] text-black px-5 py-1.5 rounded-full font-black text-[12px] uppercase">Draft</span>
                
                <div className="pt-6">
                   <p className="text-slate-400 font-bold mb-4">Раундів: не створено</p>
                   <button className="px-8 py-3 bg-[#5c75ff] text-white font-bold rounded-2xl shadow-lg shadow-[#5c75ff]/20">Створити</button>
                </div>

                <div className="pt-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[24px] font-bold">Опис</h3>
                    <button onClick={() => setIsEditing(false)}><img src="/Edit.png" className="w-4 h-4 object-contain" /></button>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                    {formData.description || "Текст опису поки що порожній..."}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-[450px] space-y-6">
                <div className="bg-white/40 p-8 rounded-[35px] border border-white/60 space-y-6">
                  <div className="space-y-3">
                    <label className={Theme.label}>Тривалість турніру</label>
                    <div className="flex items-center gap-4 bg-white/80 rounded-[18px] p-4 border border-slate-50">
                       <span className="text-slate-400 text-[14px]">дд.мм.рррр</span>
                       <img src="/Arrow-right.png" className="w-4 opacity-20" />
                       <span className="text-slate-400 text-[14px]">дд.мм.рррр</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className={Theme.label}>Термін реєстрації команд</label>
                    <div className="flex items-center gap-4 bg-white/80 rounded-[18px] p-4 border border-slate-50">
                       <span className="text-slate-400 text-[14px]">дд.мм.рррр</span>
                       <img src="/Arrow-right.png" className="w-4 opacity-20" />
                       <span className="text-slate-400 text-[14px]">дд.мм.рррр</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5 pt-16">
              <button onClick={handleFinalPublish} className="px-16 py-4 bg-[#5c75ff] text-white font-bold rounded-[22px] shadow-2xl shadow-[#5c75ff]/40 hover:scale-105 transition-all">Опублікувати</button>
              <button className="px-16 py-4 bg-white text-slate-500 font-bold rounded-[22px] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">Зберегти</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}