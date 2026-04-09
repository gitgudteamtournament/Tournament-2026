import { motion } from "framer-motion";

interface AddJuryProps {
    onClose: () => void;
    onAdd?: (data: { name: string; email: string }) => void;
}

const Theme = {
    overlay: "fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md",
    modal: "relative bg-white w-full max-w-[500px] rounded-[32px] shadow-2xl p-8 md:p-10 space-y-6 z-10",
    input: "w-full bg-white border border-slate-200 rounded-[18px] px-6 py-4 outline-none focus:border-[#5c75ff] transition-all text-[15px] text-[#1e293b] placeholder:text-slate-400",
    label: "text-[14px] font-bold ml-1 text-[#1e293b]",
    btnPrimary: "flex-1 py-4 bg-[#5c75ff] text-white font-bold rounded-[18px] shadow-lg shadow-[#5c75ff]/20 hover:brightness-110 active:scale-95 transition-all",
    btnSecondary: "flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-[18px] hover:bg-slate-200 active:scale-95 transition-all"
};

export default function AddJuryOverlay({ onClose, onAdd }: AddJuryProps) {
    return (
        <div className={Theme.overlay}>
            {/* Фон-заглушка для закрытия */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0"
            />

            {/* Окно модалки */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={Theme.modal}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-[24px] font-bold text-[#1e293b]">Додати журі</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                    Вкажіть дані користувача, якого потрібно додати до журі.
                </p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className={Theme.label}>Прізвище Ім'я</label>
                        <input type="text" className={Theme.input} placeholder="Введіть ПІБ..." />
                    </div>
                    <div className="space-y-2">
                        <label className={Theme.label}>Email</label>
                        <input type="email" className={Theme.input} placeholder="example@gmail.com" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className={Theme.btnSecondary + " order-2 sm:order-1"}
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className={Theme.btnPrimary + " order-1 sm:order-2"}
                    >
                        Додати
                    </button>
                </div>
            </motion.div>
        </div>
    );
}