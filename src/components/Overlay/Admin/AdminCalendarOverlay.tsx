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
    events?: CalendarEvent[];
}

const eventColors: Record<EventType, string> = {
    etap: "#c7d7fd",
    consult: "#a7f3c0",
    deadline: "#fca5a5",
    event: "#d9f99d",
};

const filterIconSrc: Record<string, string> = {
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

const eventDotColors: Record<EventType, string> = {
    etap: "#6b84f7",
    consult: "#34c77b",
    deadline: "#f87171",
    event: "#84cc16",
};

const eventTypeOptions: { key: EventType; label: string }[] = [
    { key: "etap", label: "Етап" },
    { key: "consult", label: "Консультація" },
    { key: "deadline", label: "Дедлайн" },
    { key: "event", label: "Подія" },
];

const DAYS_FULL = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];
const DAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const TOTAL_CELLS = 35;

const filters = [
    { key: "etap", label: "Етапи" },
    { key: "deadline", label: "Дедлайни" },
    { key: "consult", label: "Консультації" },
    { key: "event", label: "Події" },
];

const initialCalendarData: CalendarCellData[] = [
    { date: 27, isPrev: true, events: [{ title: "Раунд N", time: "Текст", type: "etap" }] },
    { date: 28, isPrev: true },
    { date: 29, isPrev: true },
    { date: 30, isPrev: true },
    { date: 1 }, { date: 2 }, { date: 3 }, { date: 4 },
    { date: 5, events: [{ title: "Онлайн-консультація", time: "год.хв. - год.хв.", type: "consult" }] },
    { date: 6 }, { date: 7 }, { date: 8 }, { date: 9 },
    { date: 10, events: [{ title: "Раунд N", time: "Текст", type: "etap" }] },
    { date: 11 },
    { date: 12, events: [{ title: "Онлайн-консультація", time: "год.хв. - год.хв.", type: "consult" }] },
    { date: 13 }, { date: 14 },
    { date: 15, events: [{ title: "Дедлайн подання робіт", time: "год.хв. - год.хв.", type: "deadline" }] },
    { date: 16 }, { date: 17 }, { date: 18 }, { date: 19 },
    { date: 20, events: [{ title: "Текст", type: "event" }] },
    { date: 21 }, { date: 22 }, { date: 23 }, { date: 24 },
    { date: 25 }, { date: 26 }, { date: 27 }, { date: 28 },
    { date: 29 }, { date: 30 }, { date: 31 },
];

const ChevronLeft = ({ color = "currentColor" }: { color?: string }) => (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 1L1 5L5 9" />
    </svg>
);

const ChevronRight = () => (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1L5 5L1 9" />
    </svg>
);

const ChevronDown = () => (
    <svg width="11" height="7" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1.5L6 6.5L11 1.5" />
    </svg>
);

const CheckIcon = () => (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 4L3.5 6.5L9 1" />
    </svg>
);

const CloseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
        <path d="M1 1L13 13M13 1L1 13" />
    </svg>
);

const PlusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
        <path d="M7 1v12M1 7h12" />
    </svg>
);

const CalendarSmIcon = () => (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="16" height="15" rx="2" />
        <path d="M6 1v3M14 1v3M2 8h16" />
    </svg>
);

const ClockSmIcon = () => (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l3 2" />
    </svg>
);

const FilterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h14M6 10h8M9 15h2" />
    </svg>
);

interface AddEventModalProps {
    onClose: () => void;
    onAdd: (event: CalendarEvent & { date: number }) => void;
}

const AddEventModal = ({ onClose, onAdd }: AddEventModalProps) => {
    const [selectedType, setSelectedType] = useState<EventType | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("00:00");

    const handleCreate = () => {
        if (!selectedType || !title.trim() || !startDate) return;
        const day = parseInt(startDate.split(".")[0] || "1", 10);
        onAdd({
            type: selectedType,
            title: title.trim(),
            time: startTime && endTime ? `${startTime} - ${endTime}` : startTime || undefined,
            date: isNaN(day) ? 1 : day,
        });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="bg-white w-full sm:max-w-[560px] sm:mx-4 rounded-t-[28px] sm:rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "92vh" }}
            >
                <div className="flex items-center justify-between px-6 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-5 border-b border-[#f1f5f9] shrink-0">
                    <h2 className="text-[17px] sm:text-[20px] font-bold text-[#1e293b]">Додати подію</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                <div className="px-6 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
                    <div className="space-y-2">
                        <p className="text-[13px] font-semibold text-[#1e293b]">Тип події</p>
                        <div className="grid grid-cols-2 gap-2">
                            {eventTypeOptions.map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedType(key)}
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] border transition-all text-left
                                        ${selectedType === key ? "border-[#5c75ff] bg-[#5c75ff]/5" : "border-[#f1f5f9] bg-[#f8fafc] hover:border-[#cbd5e1]"}`}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: filterIconBg[key] }}>
                                        <img src={filterIconSrc[key]} alt={label} className="w-4 h-4 object-contain" />
                                    </div>
                                    <span className={`text-[13px] font-semibold truncate ${selectedType === key ? "text-[#5c75ff]" : "text-[#1e293b]"}`}>
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-[13px] font-semibold text-[#1e293b]">Назва події</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введіть назву"
                            className="w-full h-[44px] px-4 rounded-[12px] border border-[#e2e8f0] text-[14px] text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/20 focus:border-[#5c75ff]/40 transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-[13px] font-semibold text-[#1e293b]">
                            Опис <span className="text-[#94a3b8] font-normal">(необов'язково)</span>
                        </p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Введіть опис"
                            rows={2}
                            className="w-full px-4 py-3 rounded-[12px] border border-[#e2e8f0] text-[14px] text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#5c75ff]/20 focus:border-[#5c75ff]/40 resize-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1.5">
                            <p className="text-[13px] font-semibold text-[#1e293b]">Початок</p>
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 h-[44px] px-3 rounded-[12px] border border-[#e2e8f0] bg-white focus-within:ring-2 focus-within:ring-[#5c75ff]/20 min-w-0 transition-all">
                                    <CalendarSmIcon />
                                    <input
                                        type="text"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="дд.мм.рррр"
                                        className="flex-1 bg-transparent text-[12px] text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none min-w-0"
                                    />
                                </div>
                                <div className="w-[86px] flex items-center gap-1 h-[44px] px-2.5 rounded-[12px] border border-[#e2e8f0] bg-white focus-within:ring-2 focus-within:ring-[#5c75ff]/20 shrink-0 transition-all">
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="flex-1 bg-transparent text-[12px] text-[#1e293b] focus:outline-none min-w-0" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <p className="text-[13px] font-semibold text-[#1e293b]">Кінець</p>
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 h-[44px] px-3 rounded-[12px] border border-[#e2e8f0] bg-white focus-within:ring-2 focus-within:ring-[#5c75ff]/20 min-w-0 transition-all">
                                    <CalendarSmIcon />
                                    <input
                                        type="text"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="дд.мм.рррр"
                                        className="flex-1 bg-transparent text-[12px] text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none min-w-0"
                                    />
                                </div>
                                <div className="w-[86px] flex items-center gap-1 h-[44px] px-2.5 rounded-[12px] border border-[#e2e8f0] bg-white focus-within:ring-2 focus-within:ring-[#5c75ff]/20 shrink-0 transition-all">
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1 bg-transparent text-[12px] text-[#1e293b] focus:outline-none min-w-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-6 sm:px-8 py-4 border-t border-[#f1f5f9] shrink-0">
                    <button
                        onClick={handleCreate}
                        disabled={!selectedType || !title.trim()}
                        className="flex-1 sm:flex-none h-[46px] px-8 rounded-[14px] bg-[#5c75ff] text-white text-[14px] font-bold shadow-lg shadow-[#5c75ff]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                    >
                        Створити
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 sm:flex-none h-[46px] px-8 rounded-[14px] border border-[#e2e8f0] text-[#1e293b] text-[14px] font-semibold hover:bg-[#f8fafc] transition-all"
                    >
                        Скасувати
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const EventCard = ({ event }: { event: CalendarEvent }) => (
    <div
        style={{ backgroundColor: eventColors[event.type] }}
        className="rounded-[8px] px-1.5 py-1 flex flex-col justify-center w-full"
    >
        <p className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-[#111827] leading-tight m-0 line-clamp-2">
            {event.title}
        </p>
        {event.time && (
            <p className="text-[8px] sm:text-[9px] lg:text-[9.5px] text-black/60 font-medium mt-0.5 leading-tight hidden sm:block">
                {event.time}
            </p>
        )}
    </div>
);

const CalendarCell = ({
    cell,
    isLastRow,
    isLastCol,
    compact,
}: {
    cell: CalendarCellData;
    isLastRow: boolean;
    isLastCol: boolean;
    compact: boolean;
}) => {
    if (compact) {
        return (
            <div className={`
                min-h-[54px] p-1.5 flex flex-col bg-white
                ${cell.isPrev ? "opacity-35" : ""}
                ${isLastCol ? "" : "border-r border-[#e5e7eb]"}
                ${isLastRow ? "" : "border-b border-[#e5e7eb]"}
            `}>
                <span className={`text-[11px] font-semibold ${cell.isPrev ? "text-[#9ca3af]" : "text-[#111827]"}`}>
                    {cell.date}
                </span>
                {cell.events && cell.events.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {cell.events.slice(0, 3).map((ev, i) => (
                            <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: eventDotColors[ev.type] }} />
                        ))}
                        {cell.events.length > 3 && (
                            <span className="text-[8px] text-[#6b7280] font-semibold leading-none mt-px">+{cell.events.length - 3}</span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`
            min-h-[90px] lg:min-h-[108px] p-1.5 sm:p-2 flex flex-col gap-1 bg-white
            ${cell.isPrev ? "hidden sm:flex opacity-60" : "flex"}
            ${isLastCol ? "" : "border-r border-[#e5e7eb]"}
            ${isLastRow ? "" : "border-b border-[#e5e7eb]"}
        `}>
            <span className={`text-[11px] sm:text-[12px] font-semibold ${cell.isPrev ? "text-[#9ca3af]" : "text-[#111827]"}`}>
                {cell.date}
            </span>
            <div className="flex flex-col gap-1 flex-1">
                {cell.events?.map((ev, i) => <EventCard key={i} event={ev} />)}
            </div>
        </div>
    );
};

interface AdminCalendarOverlayProps {
    onClose: () => void;
}

export default function AdminCalendarOverlay({ onClose }: AdminCalendarOverlayProps) {
    const [activeFilters, setActiveFilters] = useState<Set<string>>(
        new Set(["etap", "consult", "deadline", "event"])
    );
    const [calendarData, setCalendarData] = useState<CalendarCellData[]>(initialCalendarData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilter = (key: string) => {
        setActiveFilters(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const handleAddEvent = (newEvent: CalendarEvent & { date: number }) => {
        setCalendarData(prev =>
            prev.map(cell => {
                if (cell.date === newEvent.date && !cell.isPrev) {
                    const { date: _, ...ev } = newEvent;
                    return { ...cell, events: [...(cell.events ?? []), ev] };
                }
                return cell;
            })
        );
    };

    const visibleData = calendarData.map(cell => ({
        ...cell,
        events: cell.events?.filter(ev => activeFilters.has(ev.type)),
    }));

    return (
        <div className="w-full pb-6 sm:pb-10">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
                <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[13px] text-[#5c75ff] hover:opacity-75 transition-opacity font-medium"
                >
                    <ChevronLeft color="#5c75ff" />
                    <span className="hidden xs:inline">На головну</span>
                    <span className="xs:hidden">Назад</span>
                </button>

                <div className="flex items-center gap-2 sm:hidden">
                    <button
                        onClick={() => setShowFilters(v => !v)}
                        className={`h-[34px] px-3 rounded-[10px] border text-[12px] font-semibold flex items-center gap-1.5 transition-all
                            ${showFilters ? "bg-[#5c75ff]/10 border-[#5c75ff]/30 text-[#5c75ff]" : "bg-white border-[#e5e7eb] text-[#374151]"}`}
                    >
                        <FilterIcon />
                        Фільтри
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="h-[34px] px-3 rounded-[10px] bg-[#5c75ff] flex items-center gap-1.5 shadow-md shadow-[#5c75ff]/20 active:scale-95 transition-all"
                    >
                        <PlusIcon />
                        <span className="text-[12px] font-bold text-white">Додати</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 mb-5 sm:mb-8">
                <div>
                    <h1 className="text-[18px] sm:text-[22px] md:text-[24px] font-bold text-[#111827] leading-tight mb-1">
                        Розклад турніру: Назва турніру
                    </h1>
                    <p className="text-[12px] sm:text-[13px] text-[#6b7280]">
                        Календар етапів, консультацій, дедлайнів та інших подій
                    </p>
                </div>

                <AnimatePresence>
                    {(showFilters) && (
                        <motion.div
                            key="filters-mobile"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="sm:hidden overflow-hidden"
                        >
                            <div className="bg-white rounded-2xl p-3 border border-[#e5e7eb] shadow-sm">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                    {filters.map(({ key, label }) => (
                                        <div key={key} className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: filterIconBg[key] }}>
                                                <img src={filterIconSrc[key]} alt={label} className="w-3.5 h-3.5 object-contain" />
                                            </div>
                                            <span className="text-[12px] font-semibold text-[#111827] flex-1">{label}</span>
                                            <button
                                                onClick={() => toggleFilter(key)}
                                                className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors shrink-0 ${activeFilters.has(key) ? "bg-[#5c75ff]" : "bg-[#e5e7eb]"}`}
                                            >
                                                {activeFilters.has(key) && <CheckIcon />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="hidden sm:block bg-white rounded-2xl p-4 border border-[#e5e7eb] shadow-sm shrink-0">
                    <p className="text-[12px] font-bold text-[#374151] mb-3">Тип подій</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {filters.map(({ key, label }) => (
                            <div key={key} className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: filterIconBg[key] }}>
                                    <img src={filterIconSrc[key]} alt={label} className="w-4 h-4 object-contain" />
                                </div>
                                <span className="text-[13px] font-semibold text-[#111827] whitespace-nowrap flex-1">{label}</span>
                                <button
                                    onClick={() => toggleFilter(key)}
                                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${activeFilters.has(key) ? "bg-[#5c75ff]" : "bg-[#e5e7eb]"}`}
                                >
                                    {activeFilters.has(key) && <CheckIcon />}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#e5e7eb] overflow-hidden shadow-sm">
                <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e5e7eb] gap-3">
                    <button className="flex items-center gap-1.5 text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#111827]">
                        Місяць 20рр
                        <ChevronDown />
                    </button>

                    <div className="flex items-center bg-[#f3f4f6] rounded-full p-0.5 border border-[#e5e7eb]">
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#6b7280] hover:text-[#111827] transition-colors">
                            <ChevronLeft />
                        </button>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#6b7280] hover:text-[#111827] transition-colors">
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="ml-auto hidden sm:flex">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 h-[38px] sm:h-[40px] px-4 sm:px-5 rounded-full bg-[#5c75ff] text-white text-[13px] sm:text-[14px] font-bold shadow-md shadow-[#5c75ff]/25 hover:brightness-110 active:scale-95 transition-all"
                        >
                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                                <PlusIcon />
                            </div>
                            Додати подію
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-[#e5e7eb] bg-gray-50/50">
                    {DAYS_FULL.map((day, i) => (
                        <div key={i} className="py-2 sm:py-3 text-center font-bold text-[#111827]">
                            <span className="hidden sm:inline text-[12px]">{day}</span>
                            <span className="sm:hidden text-[10px]">{DAYS_SHORT[i]}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 sm:hidden">
                    {visibleData.map((cell, index) => (
                        <CalendarCell
                            key={index}
                            cell={cell}
                            isLastRow={index >= TOTAL_CELLS - 7}
                            isLastCol={(index + 1) % 7 === 0}
                            compact={true}
                        />
                    ))}
                </div>

                <div className="hidden sm:grid grid-cols-7">
                    {visibleData.map((cell, index) => (
                        <CalendarCell
                            key={index}
                            cell={cell}
                            isLastRow={index >= TOTAL_CELLS - 7}
                            isLastCol={(index + 1) % 7 === 0}
                            compact={false}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showAddModal && (
                    <AddEventModal
                        onClose={() => setShowAddModal(false)}
                        onAdd={handleAddEvent}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}