import { motion } from "framer-motion";

interface NoCertificateOverlayProps {
    onClose: () => void;
}

export default function NoCertificateOverlay({ onClose }: NoCertificateOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-white/5 backdrop-blur-[4px] rounded-[30px]"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-[440px] bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white flex flex-col items-start gap-6"
            >
                <div className="space-y-3">
                    <h2 className="text-[24px] font-bold text-[#0f172a] leading-tight">
                        Сертифікат недоступний
                    </h2>
                    <p className="text-[15px] font-medium text-[#1e293b]/70 leading-relaxed">
                        На даний момент сертифікат ще недоступний. <br />
                        Будь ласка, перевірте пізніше.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="w-[140px] h-[48px] rounded-[14px] bg-[#5c75ff] text-white font-bold text-[15px] shadow-lg shadow-[#5c75ff]/25 hover:brightness-110 active:scale-95 transition-all"
                >
                    Закрити
                </button>
            </motion.div>
        </motion.div>
    );
}