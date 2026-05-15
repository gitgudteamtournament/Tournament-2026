import { useId } from "react";
import { motion } from "framer-motion";

const BackChevronIcon = () => (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="#5c75ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 1 1 5l4 4" />
    </svg>
);

const SimpleInput = ({ label, required = false }: { label: string; required?: boolean }) => {
    const id = useId();
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-[16px] font-medium text-[#1e293b]">
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={id}
                type="text"
                required={required}
                className="w-full h-[50px] px-4 bg-white border border-[#e2e8f0] rounded-[12px] focus:ring-2 focus:ring-[#5c75ff]/20 focus:outline-none text-[15px] transition-all shadow-inner"
            />
        </div>
    );
};

interface CertificateGenerateOverlayProps {
    onBack: () => void;
    onGenerate?: () => void;
}

export default function CertificateGenerateOverlay({ onBack, onGenerate }: CertificateGenerateOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[800px] mx-auto mt-8 relative z-30"
        >
            <div className="bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 md:p-12 shadow-2xl relative overflow-hidden">

                <button
                    onClick={onBack}
                    className="flex items-center gap-2 group focus:outline-none mb-8 hover:brightness-105"
                >
                    <BackChevronIcon />
                    <span className="text-[13px] font-medium text-[#1e293b]/70 group-hover:text-[#5c75ff] transition-colors">Назад</span>
                </button>

                <div className="space-y-10">
                    <header className="space-y-2">
                        <h2 className="text-[32px] font-bold text-[#0f172a] leading-tight">Згенерувати сертифікат</h2>
                        <p className="text-[16px] font-medium text-[#1e293b]/60">Введіть дані, які будуть відображені у сертифікаті.</p>
                    </header>

                    <form
                        className="space-y-6 max-w-[600px]"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (onGenerate) onGenerate();
                        }}
                    >
                        <SimpleInput label="Введіть ім'я" required />
                        <SimpleInput label="Введіть прізвище" required />

                        <div className="pt-4 flex justify-start md:justify-end">
                            <button
                                type="submit"
                                className="px-10 h-[50px] rounded-[16px] bg-[#5c75ff] text-white font-bold text-[15px] shadow-lg shadow-[#5c75ff]/25 hover:brightness-110 active:scale-95 transition-all"
                            >
                                Згенерувати
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}