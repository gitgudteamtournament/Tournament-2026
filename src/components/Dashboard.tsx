import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RobotoFont = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
.font-roboto { font-family: 'Roboto', sans-serif; }
`,
    }}
  />
);

const BellIcon = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const FilterIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    aria-hidden="true"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface TournamentCardProps {
  title: string;
  hasSubmit?: boolean;
}

const TournamentCard = ({ title, hasSubmit = false }: TournamentCardProps) => (
  <div className="bg-white/40 backdrop-blur-[20px] rounded-[24px] p-6 md:p-7 border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.03)] flex flex-col h-full transition-all duration-300">
    <h3 className="text-[18px] md:text-[20px] font-bold text-[#0f172a] mb-4">{title}</h3>
    <div className="space-y-1.5 text-[13px] md:text-[14px] font-medium text-[#1e293b]/80 mb-8 leading-tight">
      <p>Статус:</p>
      <p>Раунд:</p>
      <p>Дедлайн:</p>
      {hasSubmit && <p>Статус сабміту:</p>}
    </div>
    <div className="mt-auto flex justify-end">
      <button
        type="button"
        title={`Деталі ${title}`}
        aria-label={`Деталі ${title}`}
        className="bg-[#5c75ff] text-white font-bold py-2 px-5 md:px-6 rounded-[10px] shadow-[0_8px_16px_rgba(92,117,255,0.3)] hover:brightness-110 active:scale-95 transition-all text-[12px]"
      >
        Детальніше
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;

      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(target) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(target)
      ) {
        setIsFilterOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsFilterOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isFilterOpen, isMobileMenuOpen]);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-[#f4f7fa] font-roboto antialiased text-[#1e293b]">
      <RobotoFont />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#C1E130] blur-[140px] opacity-[0.2]" />
        <div className="absolute top-[0%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#0C13D4] blur-[160px] opacity-[0.12]" />
        <div className="absolute bottom-[-5%] left-[5%] w-[65%] h-[65%] rounded-full bg-[#29DD2C] blur-[140px] opacity-[0.18]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <header className="mt-6 rounded-[16px] bg-[#FFFFFF26] backdrop-blur-[25px] border border-white/40 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-10">
            <div className="flex items-center gap-4">
              <Link to="/" aria-label="Перейти на головну">
                <img src="/logo.png" alt="QTour" className="h-[22px] md:h-[24px]" />
              </Link>

              <div className="lg:hidden">
                <button
                  type="button"
                  ref={mobileToggleRef}
                  aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
                  aria-expanded={String(isMobileMenuOpen)}
                  title={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
                  onClick={() => setIsMobileMenuOpen((s) => !s)}
                  className="w-10 h-10 rounded-md flex items-center justify-center bg-white/6 backdrop-blur-sm shadow-sm"
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {isMobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M3 6h18M3 12h18M3 18h18" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <nav
              className="hidden lg:flex lg:items-center lg:justify-center lg:gap-8"
              aria-label="Основна навігація"
            >
              <Link to="/my-tournaments" className="text-[13px] font-bold uppercase">
                Мої турніри
              </Link>

              <Link to="/tournaments" className="text-[13px] font-bold uppercase">
                Турніри
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Сповіщення"
                title="Сповіщення"
                className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center"
              >
                <BellIcon />
              </button>

              <div className="hidden sm:flex items-center gap-3">
                <span className="text-[13px] font-bold">Ім'я</span>
                <button
                  type="button"
                  aria-label="Профіль користувача"
                  title="Профіль"
                  className="w-9 h-9 rounded-[10px] bg-[#5c75ff] flex items-center justify-center text-white font-bold text-[13px]"
                >
                  I
                </button>
              </div>

              <button
                type="button"
                aria-label="Вийти"
                title="Вийти"
                className="bg-[#5c75ff] text-white px-4 h-9 rounded-[10px] font-bold text-[13px]"
              >
                Вихід
              </button>
            </div>
          </div>

          <div
            ref={mobileMenuRef}
            aria-hidden={String(!isMobileMenuOpen)}
            className={`${
              isMobileMenuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
            } transition-[max-height,opacity] duration-300 overflow-hidden lg:hidden px-4`}
          >
            <div className="flex flex-col gap-2 pb-4">
              <Link
                to="/my-tournaments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-[15px] font-semibold"
              >
                Мої турніри
              </Link>

              <Link
                to="/tournaments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-[15px] font-semibold"
              >
                Турніри
              </Link>
            </div>
          </div>
        </header>

        <main className="mt-8 md:mt-10 space-y-10">
          <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10">
            <h2 className="text-[22px] md:text-[28px] font-bold mb-8">Ваші турніри</h2>
            <div className="w-full max-w-[340px]">
              <TournamentCard title="Назва" hasSubmit />
            </div>
          </section>

          <section className="rounded-[30px] bg-[#FFFFFF26] backdrop-blur-[35px] border border-white/40 p-6 md:p-10 relative">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[22px] md:text-[28px] font-bold">Турніри</h2>

              <div className="relative">
                <button
                  ref={filterBtnRef}
                  type="button"
                  aria-label="Фільтр турнірів"
                  aria-expanded={String(isFilterOpen)}
                  aria-controls="tournament-filter"
                  onClick={() => setIsFilterOpen((s) => !s)}
                  className="w-[54px] h-[36px] rounded-[10px] bg-[#5c75ff] flex items-center justify-center gap-1"
                >
                  <ChevronIcon />
                  <FilterIcon />
                </button>

                <div ref={filterRef}>
                  {isFilterOpen && (
                    <div
                      id="tournament-filter"
                      role="menu"
                      className="absolute right-0 mt-3 w-52 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] py-4 z-50"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        className="w-full text-left px-6 py-2 text-[13px] font-bold"
                      >
                        Registration open
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="w-full text-left px-6 py-2 text-[13px] font-bold"
                      >
                        Running
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="w-full text-left px-6 py-2 text-[13px] font-bold"
                      >
                        Finished
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <TournamentCard key={i} title="Назва" />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}