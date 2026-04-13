import { motion } from "framer-motion";

interface ConfirmDeleteProps {
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

const Theme = {
    btnBlue: "bg-[#5c75ff] text-white shadow-[0_6px_12px_rgba(92,117,255,0.2)] hover:bg-[#4b63e6] active:scale-95 transition-all font-bold",
    btnWhite: "bg-white text-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white hover:bg-slate-50 active:scale-95 transition-all font-bold",
};

export default function ConfirmDeleteTeamOverlay({
    onClose,
    onConfirm,
    title = "Видалити команду?",
    description = "Цю дію неможливо буде скасувати. Дані будуть видалені з турніру."
}: ConfirmDeleteProps) {
    return (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/10 backdrop-blur-[8px]"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-[440px] rounded-[24px] sm:rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] p-6 sm:p-10 z-10 text-center"
            >
                <h2 className="text-[20px] sm:text-[24px] font-bold text-slate-900 mb-4">
                    {title}
                </h2>
                <p className="text-slate-500 text-[14px] font-medium mb-8">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                        onClick={onClose}
                        className={`${Theme.btnBlue} flex-1 py-3 sm:py-4 rounded-[18px]`}
                    >
                        Ні, залишити
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`${Theme.btnWhite} flex-1 py-3 sm:py-4 rounded-[18px] bg-slate-50`}
                    >
                        Так, видалити
                    </button>
                </div>
            </motion.div>
        </div>
    );
}