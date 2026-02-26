import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <style>{`
        input::-ms-reveal, input::-ms-clear { display: none; }
        input[type="password"]::-webkit-textfield-decoration-container,
        input[type="password"]::-webkit-password-reveal-button,
        input::-webkit-textfield-decoration-container,
        input::-webkit-contacts-auto-fill-button { display: none !important; }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#6f8bff] via-[#e6eeff] to-[#55e99b] relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/28 blur-[150px] rounded-full top-[-220px] left-[-220px]" />
        <div className="absolute w-[520px] h-[520px] bg-green-400/28 blur-[150px] rounded-full bottom-[-170px] right-[-170px]" />

        <div className="w-full max-w-[550px] h-14 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/40 rounded-3xl mb-8 relative z-10" />

        <div className="w-full max-w-[1000px] backdrop-blur-3xl bg-gradient-to-br from-white/55 to-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/40 rounded-[30px] p-6 sm:p-10 md:p-12 relative z-10">
          <h1 className="text-center text-[20px] sm:text-[22px] font-bold tracking-wide text-gray-900 mb-8">
            РЕЄСТРАЦІЯ
          </h1>

          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[14px] sm:text-[15px] text-gray-800 font-medium mb-1.5 ml-1">
                Ім'я
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-label="Ім'я"
                className="w-full h-12 rounded-2xl bg-white/70 px-4 outline-none focus:ring-2 focus:ring-[#485cea] transition border border-white/50 backdrop-blur-md shadow-inner appearance-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[14px] sm:text-[15px] text-gray-800 font-medium mb-1.5 ml-1">
                Електронна пошта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-label="Електронна пошта"
                className="w-full h-12 rounded-2xl bg-white/70 px-4 outline-none focus:ring-2 focus:ring-[#485cea] transition border border-white/50 backdrop-blur-md shadow-inner appearance-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[14px] sm:text-[15px] text-gray-800 font-medium mb-1.5 ml-1">
                Пароль
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-label="Пароль"
                  className="w-full h-12 rounded-2xl bg-white/70 px-4 pr-12 outline-none focus:ring-2 focus:ring-[#485cea] transition border border-white/50 backdrop-blur-md shadow-inner appearance-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#485cea] transition p-1"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.305.658-2.73 1.8-4.012m3.1-2.56A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 pb-2">
              <p className="text-[13px] sm:text-[14px] text-center text-gray-800">
                Вже є акаунт?{" "}
                <Link to="/signup" className="text-[#5c75ff] hover:text-blue-600 hover:underline transition-colors">
                  Увійти
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#465ae0] hover:bg-[#3649c9] text-white font-medium text-[15px] sm:text-[16px] py-3.5 rounded-2xl shadow-[0_12px_30px_rgba(70,90,224,0.4)] hover:shadow-[0_15px_40px_rgba(70,90,224,0.5)] transition-all duration-300 active:scale-[0.97]"
            >
              Зареєструватися
            </button>
          </form>
        </div>
      </div>
    </>
  );
}