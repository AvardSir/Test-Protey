import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>Get started</h1>
          <h2>Хелоу</h2>

          
          <div>
            <div className="mb-6 md:mb-8 lg:mb-12">
              <div className="text-center mx-auto">
                <h2 className="text-[16px] md:text-[32px] lg:text-[40px] font-semibold leading-[125%] lg:leading-[133%] tracking-[-0.01em] text-white mb-2 md:mb-6">
                  Регистрация на лекторий
                </h2>
              </div>
            </div>
            <div className="lg:sticky lg:top-[108px] rounded-[8px] p-6 bg-blue-gradient">
              <form noValidate>
                <div className="grid gap-4 lg:gap-6 grid-cols-1 md-only-cols-2 mb-4 md:mb-6">
                  {/* ФИО */}
                  <div className="col-span-1">
                    <label htmlFor="fullName" className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                      ФИО<span className="text-blue ml-0.5">*</span>
                    </label>
                    <input
                      id="fullName"
                      className="w-full bg-blue-dark-500 border rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none transition-colors border-transparent hover:border-blue focus:border-blue"
                      autoComplete="name"
                      placeholder="Иванов Иван Иванович"
                      name="fullName"
                    />
                  </div>

                  {/* Телефон */}
                  <div className="col-span-1">
                    <label htmlFor="phone" className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                      Телефон<span className="text-blue ml-0.5">*</span>
                    </label>
                    <input
                      id="phone"
                      autoComplete="tel"
                      placeholder="+7 (987) 654-32-10"
                      className="w-full bg-blue-dark-500 border rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none transition-colors border-transparent hover:border-blue focus:border-blue"
                      type="tel"
                      name="phone"
                    />
                  </div>

                  {/* Компания */}
                  <div className="col-span-1">
                    <label htmlFor="company" className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                      Компания<span className="text-blue ml-0.5">*</span>
                    </label>
                    <input
                      id="company"
                      className="w-full bg-blue-dark-500 border rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none transition-colors border-transparent hover:border-blue focus:border-blue"
                      autoComplete="organization"
                      placeholder="Название компании"
                      name="company"
                    />
                  </div>

                  {/* Должность */}
                  <div className="col-span-1">
                    <label htmlFor="position" className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                      Должность<span className="text-blue ml-0.5">*</span>
                    </label>
                    <input
                      id="position"
                      className="w-full bg-blue-dark-500 border rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none transition-colors border-transparent hover:border-blue focus:border-blue"
                      autoComplete="organization-title"
                      placeholder="Руководитель отдела..."
                      name="position"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <div className="col-span-1">
                      <label htmlFor="email" className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                        Email<span className="text-blue ml-0.5">*</span>
                      </label>
                      <input
                        id="email"
                        className="w-full bg-blue-dark-500 border rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none transition-colors border-transparent hover:border-blue focus:border-blue"
                        autoComplete="email"
                        placeholder="example@company.ru"
                        type="email"
                        name="email"
                      />
                    </div>
                  </div>

                  {/* Вопросы */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <label className="block text-[14px] lg:text-[16px] font-normal leading-[125%] lg:leading-[150%] text-white mb-1">
                      Ваши вопросы к обсуждению
                    </label>
                    <textarea
                      autoComplete="off"
                      rows={4}
                      placeholder="Какие темы вам особенно интересны?"
                      className="block w-full bg-blue-dark-500 border border-transparent rounded-[8px] p-2 text-[12px] md:text-sm font-normal leading-[167%] md:leading-[143%] text-white-300 placeholder:text-white/30 outline-none hover:border-blue focus:border-blue transition-colors resize-y"
                      name="questions"
                    />
                  </div>
                </div>

                <p className="mb-6 md:mb-12 lg:mb-6 text-[10px] md:text-[14px] lg:text-[16px] font-normal leading-[150%] text-white">
                  Выбрано <span className="text-blue text-[12px] md:text-[16px] lg:text-lg leading-[125%] lg:leading-[156%]">0</span> лекций
                </p>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-normal text-[12px] md:text-[16px] lg:text-[18px] leading-[125%] lg:leading-[156%] text-white transition-opacity duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed btn-ghost hover:opacity-80 w-full"
                  >
                    Зарегистрироваться
                  </button>
                  <p className="mt-3 text-[10px] md:text-sm font-normal leading-[125%] md:leading-[143%] text-center text-white-300">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a
                      href="https://tl.protei.ru/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                    >
                      политикой обработки персональных данных
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
