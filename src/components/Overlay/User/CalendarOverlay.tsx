import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EventType = "etap" | "consult" | "deadline" | "event";

interface CalendarEvent {
  title: string;
  time?: string;
  type: EventType;
}

interface CalendarCellData {
  date: number;
  isPrev?: boolean;
  event?: CalendarEvent;
}

const eventColors: Record<EventType, string> = {
  etap: "#c7d7fd",
  consult: "#a7f3c0",
  deadline: "#fca5a5",
  event: "#d9f99d",
};

const filterIcons: Record<string, string> = {
  etap: "/Steps.png",
  consult: "/Comment.png",
  deadline: "/Cloc.png",
  event: "/Calendar.png",
};

const filterIconBg: Record<string, string> = {
  etap: "#c7d7fd",
  consult: "#bbf7d0",
  deadline: "#fecaca",
  event: "#d9f99d",
};

const calendarData: CalendarCellData[] = [
  { date: 27, isPrev: true, event: { title: "Раунд N", time: "Текст", type: "etap" } },
  { date: 28, isPrev: true },
  { date: 29, isPrev: true },
  { date: 30, isPrev: true },
  { date: 1 },
  { date: 2 },
  { date: 3 },
  { date: 4 },
  { date: 5, event: { title: "Онлайн-консультація", time: "10:00 - 12:00", type: "consult" } },
  { date: 6 },
  { date: 7 },
  { date: 8 },
  { date: 9 },
  { date: 10, event: { title: "Раунд N", time: "Текст", type: "etap" } },
  { date: 11 },
  { date: 12, event: { title: "Онлайн-консультація", time: "14:00 - 16:00", type: "consult" } },
  { date: 13 },
  { date: 14 },
  { date: 15, event: { title: "Дедлайн подання робіт", time: "23:59", type: "deadline" } },
  { date: 16 },
  { date: 17 },
  { date: 18 },
  { date: 19 },
  { date: 20, event: { title: "Текст", type: "event" } },
  { date: 21 },
  { date: 22 },
  { date: 23 },
  { date: 24 },
  { date: 25 },
  { date: 26 },
  { date: 27 },
  { date: 28 },
  { date: 29 },
  { date: 30 },
  { date: 31 },
];

const DAYS_OF_WEEK = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];
const TOTAL_CELLS = 35;

const filters = [
  { key: "etap", label: "Етапи" },
  { key: "deadline", label: "Дедлайни" },
  { key: "consult", label: "Консультації" },
  { key: "event", label: "Події" },
];

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4L3.5 6.5L9 1" />
  </svg>
);

const ChevronDown = () => (
  <svg width="11" height="7" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1.5L6 6.5L11 1.5" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 1L1 5L5 9" />
  </svg>
);

const ChevronRight = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1L5 5L1 9" />
  </svg>
);

const BackChevronIcon = () => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="#5c75ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 1L1 5L4 9" />
  </svg>
);

const DownChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m1 1 4 4 4-4" />
  </svg>
);


const EventCard = ({ event }: { event: CalendarEvent }) => (
  <div
    style={{
      backgroundColor: eventColors[event.type],
      borderRadius: 10,
      padding: "6px 8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "50px",
      width: "100%",
    }}
  >
    <p className="text-[10px] md:text-[11px] font-bold text-[#111827] leading-tight m-0">
      {event.title}
    </p>
    {event.time && (
      <p className="text-[9px] md:text-[9.5px] text-black/60 font-medium mt-1">
        {event.time}
      </p>
    )}
  </div>
);

const CalendarCell = ({ cell, isLastRow, isLastCol }: { cell: CalendarCellData; isLastRow: boolean; isLastCol: boolean }) => {
  return (
    <div
      className={`
        min-h-[80px] md:min-h-[108px] p-2 flex flex-col gap-1 bg-white transition-colors
        ${isLastCol ? "" : "md:border-r border-[#e5e7eb]"}
        ${isLastRow ? "" : "border-b border-[#e5e7eb]"}
        ${cell.isPrev ? "hidden md:flex" : "flex"}
      `}
    >
      <span className={`text-[12px] font-semibold ${cell.isPrev ? "text-[#9ca3af]" : "text-[#111827]"}`}>
        {cell.date}
      </span>
      {cell.event && <EventCard event={cell.event} />}
    </div>
  );
};

const CalendarOverlay = ({ onClose }: { onClose: () => void }) => {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(["etap", "consult", "deadline", "event"])
  );

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const visibleData = calendarData.map((cell) => ({
    ...cell,
    event: cell.event && activeFilters.has(cell.event.type) ? cell.event : undefined,
  }));

  return (
    <div className="w-full max-w-full overflow-x-hidden pb-10">
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 text-[13px] text-[#374151] mb-6 hover:text-[#5c75ff] transition-colors"
      >
        <ChevronLeft />
        Назад до туру
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="max-w-xl">
          <h1 className="text-[20px] md:text-[24px] font-bold text-[#111827] leading-tight mb-2">
            Розклад турніру: Назва
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#6b7280]">
            Календар етапів, консультацій та важливих дедлайнів.
          </p>
        </div>

        <div className="w-full lg:w-auto bg-white rounded-2xl p-4 border border-[#e5e7eb] shadow-sm">
          <p className="text-[12px] font-bold text-[#374151] mb-3">Фільтр подій</p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6">
            {filters.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: filterIconBg[key] }}
                >
                  <img src={filterIcons[key]} alt={label} className="w-5 h-5 object-contain" />
                </div>
                <span className="text-[13px] font-semibold text-[#111827] whitespace-nowrap">{label}</span>
                <button
                  onClick={() => toggleFilter(key)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${activeFilters.has(key) ? 'bg-[#5c75ff]' : 'bg-[#e5e7eb]'}`}
                >
                  {activeFilters.has(key) && <CheckIcon />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-[#e5e7eb] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <button className="flex items-center gap-2 text-[16px] md:text-[18px] font-bold text-[#111827]">
            Травень 2026
            <ChevronDown />
          </button>
          <div className="flex items-center bg-[#f3f4f6] rounded-full p-1 border border-[#e5e7eb]">
            <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#111827] transition-colors"><ChevronLeft /></button>
            <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#111827] transition-colors"><ChevronRight /></button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-7 border-b border-[#e5e7eb] bg-gray-50/50">
          {DAYS_OF_WEEK.map((day, i) => (
            <div key={i} className="py-3 text-center text-[12px] font-bold text-[#111827]">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7">
          {visibleData.map((cell, index) => (
            <CalendarCell
              key={index}
              cell={cell}
              isLastRow={index >= TOTAL_CELLS - 7}
              isLastCol={(index + 1) % 7 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TourViewOverlay({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'task' | 'submit' | 'certificate'>('task');
  const [isRound1Expanded, setIsRound1Expanded] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-4 md:mt-8 relative px-4 md:px-0"
    >
      <div className={`flex flex-col lg:flex-row gap-6 md:gap-8 items-start transition-all duration-300 ${showCalendar ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>

        <aside className="w-full lg:w-[320px] shrink-0 bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[24px] md:rounded-[30px] p-6 md:p-8 space-y-6 shadow-sm">
          <button onClick={onBack} className="flex items-center gap-2 group text-[#1e293b]/70 hover:text-[#5c75ff] transition-colors">
            <BackChevronIcon />
            <span className="text-[13px] font-medium">На головну</span>
          </button>

          <h1 className="text-[24px] md:text-[26px] font-bold text-[#0f172a]">Назва туру</h1>

          <div className="space-y-3 pt-1">
            <button
              onClick={() => setShowCalendar(true)}
              className="w-full h-[48px] px-5 rounded-[12px] border border-white bg-white flex items-center justify-between shadow-sm hover:border-[#5c75ff]/30 transition-all group"
            >
              <span className="text-[15px] font-bold text-[#1e293b] group-hover:text-[#5c75ff]">Розклад</span>
              <ChevronRight />
            </button>

            <SidebarButton
              title="Раунд 1"
              isExpandable
              isExpanded={isRound1Expanded}
              isActive={isRound1Expanded && (activeTab === 'task' || activeTab === 'submit')}
              onClick={() => setIsRound1Expanded(!isRound1Expanded)}
            >
              <SidebarSubButton title="Завдання" isActive={activeTab === 'task'} onClick={() => setActiveTab('task')} />
              <SidebarSubButton title="Подача завдання" isActive={activeTab === 'submit'} onClick={() => setActiveTab('submit')} />
            </SidebarButton>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-6 md:gap-8 w-full">
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
            <div className="bg-white border border-white rounded-[20px] p-6 shadow-sm flex flex-wrap gap-4 items-end justify-between">
              <InfoBlock label="Статус" value="В процесі" />
              <InfoBlock label="Раунд" value="1/3" />
              <InfoBlock label="Дедлайн" value="24.05 18:00" />
            </div>
            <div className="bg-white border border-white rounded-[20px] p-6 shadow-sm flex items-center overflow-hidden">
              <div className="flex-1">
                <h2 className="text-[12px] uppercase text-gray-400 font-bold mb-1">Ваша команда</h2>
                <p className="text-[18px] font-bold text-[#1e293b] truncate">Прізвище Ім'я Команди</p>
              </div>
            </div>
          </section>

          <main className="min-h-[500px] bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[24px] md:rounded-[30px] p-6 md:p-10 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
              >
                {activeTab === 'task' ? (
                  <div className="space-y-6">
                    <h2 className="text-[24px] md:text-[30px] font-bold text-[#0f172a]">Опис завдання</h2>
                    <div className="prose prose-blue max-w-none text-gray-600">
                      Тут буде текст вашого завдання...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-[24px] md:text-[32px] font-bold text-[#0f172a]">Подача результатів</h2>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full"
          >
            <CalendarOverlay onClose={() => setShowCalendar(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


const SidebarButton = ({ title, isExpanded, isActive, onClick, children }: any) => (
  <div className="space-y-2">
    <button
      onClick={onClick}
      className={`w-full h-[48px] px-5 rounded-[12px] border flex items-center justify-between transition-all ${isActive ? 'bg-[#5c75ff]/5 border-[#5c75ff]/20' : 'bg-white border-transparent shadow-sm'}`}
    >
      <span className={`text-[15px] font-bold ${isActive ? 'text-[#5c75ff]' : 'text-[#1e293b]'}`}>{title}</span>
      <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
        <DownChevronIcon />
      </motion.div>
    </button>
    {isExpanded && <div className="space-y-2 pl-2">{children}</div>}
  </div>
);

const SidebarSubButton = ({ title, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full h-[38px] px-4 rounded-[10px] border flex items-center transition-colors ${isActive ? 'bg-[#5c75ff]/10 border-[#5c75ff]/20' : 'bg-white/50 border-transparent hover:bg-white'}`}
  >
    <span className={`text-[13px] font-semibold ${isActive ? 'text-[#5c75ff]' : 'text-[#475569]'}`}>{title}</span>
  </button>
);

const InfoBlock = ({ label, value }: any) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">{label}</span>
    <span className="text-[16px] md:text-[18px] font-extrabold text-[#1e293b]">{value}</span>
  </div>
);