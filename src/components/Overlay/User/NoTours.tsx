import { motion } from "framer-motion";

export default function NoTours() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[1200px] mx-auto mt-8 bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[30px] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between min-h-[500px] relative font-roboto"
        >
            <div className="space-y-4 z-10 max-w-[500px] text-center md:text-left">
                <h2 className="text-[28px] md:text-[36px] font-bold text-[#1e293b] leading-tight tracking-tight">
                    Наразі активних <br className="hidden md:block" /> турнірів немає
                </h2>
                <p className="text-[16px] md:text-[18px] font-medium text-[#1e293b]/50">
                    Очікуйте на нові турніри <br className="md:hidden" /> від організаторів
                </p>
            </div>

            <div className="relative z-10 mt-10 md:mt-0 md:mr-10">
                <motion.img 
                    initial={{ y: 10 }}
                    animate={{ y: -10 }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut" 
                    }}
                    style={{ willChange: "transform" }}
                    src="/PC_No.png"
                    alt="No Tournaments"
                    className="w-[300px] md:w-[420px] h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
                />
            </div>

            <div className="absolute inset-0 pointer-events-none rounded-[30px] overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#5c75ff]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#C1E130]/5 blur-[100px] rounded-full" />
            </div>
        </motion.div>
    );
}