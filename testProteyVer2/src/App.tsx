import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type Lecture = {
  id: string
  title: string
  date: string
}

type FormValues = {
  fullName: string
  phone: string
  company: string
  position: string
  email: string
  discussionQuestions: string
  lectures: string[]
}

type ModalType = 'success' | 'error' | 'lectureError'

const lectureOptions: Lecture[] = [
  { id: 'arch-control', title: 'Контролируемость архитектуры и полный цикл производства ПАК', date: '7 апреля, 11:00' },
  { id: 'kii-resilience', title: 'Устойчивость КИИ к продолжительным угрозам', date: '7 апреля, 13:00' },
  { id: 'secure-dev', title: 'Безопасная разработка ПО и аудит защищенности', date: '7 апреля, 15:00' },
  { id: 'b2b-security', title: 'Технологическая безопасность инфраструктуры B2B', date: '8 апреля, 11:00' },
  { id: 'b2g-infra', title: 'Требования к инфраструктуре органов госвласти', date: '8 апреля, 13:00' },
  { id: 'regulation', title: 'Практика соответствия требованиям регуляторов', date: '9 апреля, 11:00' },
]

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits
  const d = normalized.startsWith('7') ? normalized.slice(1) : normalized
  const p1 = d.slice(0, 3)
  const p2 = d.slice(3, 6)
  const p3 = d.slice(6, 8)
  const p4 = d.slice(8, 10)

  let result = '+7'
  if (p1) result += ` (${p1}`
  if (p1.length === 3) result += ')'
  if (p2) result += ` ${p2}`
  if (p3) result += `-${p3}`
  if (p4) result += `-${p4}`
  return result
}

function App() {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [isSubmittingMock, setIsSubmittingMock] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      phone: '+7',
      company: '',
      position: '',
      email: '',
      discussionQuestions: '',
      lectures: [],
    },
    mode: 'onBlur',
  })

  const selectedLectures = watch('lectures') ?? []
  const selectedCount = selectedLectures.length

  const phoneRegistration = register('phone', {
    required: 'Укажите телефон',
    validate: (value) =>
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value) || 'Формат: +7 (999) 999-99-99',
  })

  const onSubmit = async () => {
    if (selectedCount === 0) {
      setModalType('lectureError')
      return
    }

    setIsSubmittingMock(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmittingMock(false)

    const isError = Math.random() < 0.25
    if (isError) {
      setModalType('error')
      return
    }

    setModalType('success')
    reset()
  }

  const selectedLectureTitles = useMemo(
    () =>
      lectureOptions
        .filter((lecture) => selectedLectures.includes(lecture.id))
        .map((lecture) => lecture.title)
        .join(', '),
    [selectedLectures],
  )

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalType(null)
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  return (
    <main className="min-h-screen bg-[#131c2d] px-4 py-10 text-white md:py-16">
      <section className="container mx-auto max-w-[1176px]">
        <div className="mx-auto max-w-[744px] rounded-[8px] bg-blue-gradient p-4 md:p-6 lg:p-12">
          <h1 className="mb-2 text-center text-[24px] font-semibold leading-[125%] lg:text-[40px] lg:leading-[114%]">
            Регистрация на лекторий
          </h1>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <label className="col-span-1 block">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  ФИО <span className="text-[#75c9ea]">*</span>
                </span>
              <input
                  {...register('fullName', {
                    required: 'Обязательное поле',
                    minLength: { value: 2, message: 'Минимум 2 символа' },
                    pattern: { value: /^[a-zA-Zа-яёА-ЯЁ\s\-.]+$/, message: 'Только буквы' },
                  })}
                  type="text"
                  autoComplete="name"
                  placeholder="Иванов Иван Иванович"
                  className={`w-full rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.fullName
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.fullName?.message}</span>
              </label>

              <label className="col-span-1 block">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  Телефон <span className="text-[#75c9ea]">*</span>
                </span>
                <input
                  {...phoneRegistration}
                  onChange={(event) => {
                    const formatted = normalizePhone(event.target.value)
                    setValue('phone', formatted, { shouldValidate: true })
                  }}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7 (987) 654-32-10"
                  className={`w-full rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.phone
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.phone?.message}</span>
              </label>

              <label className="col-span-1 block">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  Компания <span className="text-[#75c9ea]">*</span>
                </span>
                <input
                  {...register('company', {
                    required: 'Обязательное поле',
                    minLength: { value: 2, message: 'Минимум 2 символа' },
                    pattern: { value: /^[^<>{}\\]+$/, message: 'Недопустимые символы' },
                  })}
                  type="text"
                  autoComplete="organization"
                  placeholder="Название компании"
                  className={`w-full rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.company
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.company?.message}</span>
              </label>

              <label className="col-span-1 block">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  Должность <span className="text-[#75c9ea]">*</span>
                </span>
                <input
                  {...register('position', {
                    required: 'Обязательное поле',
                    minLength: { value: 2, message: 'Минимум 2 символа' },
                    pattern: { value: /^[a-zA-Zа-яёА-ЯЁ0-9\s\-.,]+$/, message: 'Только буквы и цифры' },
                  })}
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Руководитель отдела..."
                  className={`w-full rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.position
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.position?.message}</span>
              </label>

              <label className="col-span-1 block md:col-span-2 lg:col-span-1">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  Email <span className="text-[#75c9ea]">*</span>
                </span>
              <input
                  {...register('email', {
                    required: 'Обязательное поле',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Некорректный email' },
                  })}
                  type="email"
                  autoComplete="email"
                  placeholder="example@company.ru"
                  className={`w-full rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.email?.message}</span>
              </label>

              <label className="col-span-1 block md:col-span-2 lg:col-span-1">
                <span className="mb-1 block text-[14px] font-normal leading-[125%] lg:text-[16px] lg:leading-[150%]">
                  Ваши вопросы к обсуждению
                </span>
                <textarea
                  {...register('discussionQuestions', {
                    validate: (value) => !value || !/<[^>]+>/.test(value) || 'Недопустимые символы',
                  })}
                  autoComplete="off"
                  placeholder="Какие темы вам особенно интересны?"
                  rows={4}
                  className={`block w-full resize-y rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[167%] text-[#ffffff4d] outline-none transition-colors md:text-sm md:leading-[143%] placeholder:text-[#ffffff4d] ${
                    errors.discussionQuestions
                      ? 'border-red-500'
                      : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                  }`}
                />
                <span className="mt-1 block min-h-4 text-xs text-red-400">
                  {errors.discussionQuestions?.message}
                </span>
              </label>
            </div>

            <div className="mb-6 mt-6 grid gap-3">
              {lectureOptions.map((lecture) => (
                <label
                  key={lecture.id}
                  className="lecture-card flex cursor-pointer gap-3 rounded-[8px] border border-transparent p-3 transition-colors hover:border-[#75c9ea]"
                >
                  <input
                    {...register('lectures')}
                    value={lecture.id}
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#75c9ea]"
                  />
                  <span className="grid">
                    <span className="text-[10px] leading-[125%] text-white md:text-[14px] md:leading-[150%] lg:text-[16px]">
                      {lecture.title}
                    </span>
                    <span className="mt-1 text-[10px] leading-[125%] text-[#ffffff4d] md:text-[12px]">
                      {lecture.date}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <p className="mb-6 text-[10px] font-normal leading-[150%] text-white md:mb-12 md:text-[14px] lg:mb-6 lg:text-[16px]">
              Выбрано{' '}
              <span className="text-[12px] leading-[125%] text-[#75c9ea] md:text-[16px] lg:text-[18px] lg:leading-[156%]">
                {selectedCount}
              </span>{' '}
              лекций
            </p>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmittingMock}
                onClick={() => {
                  if (selectedCount === 0) {
                    setModalType('lectureError')
                  }
                }}
                className="btn-ghost inline-flex w-full cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-[12px] font-normal leading-[125%] text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 md:text-[16px] lg:text-[18px] lg:leading-[156%]"
              >
                {isSubmittingMock ? 'Отправка...' : 'Зарегистрироваться'}
              </button>
              <button
                type="button"
                onClick={() => setModalType('error')}
                className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-[#ff8b3d] bg-transparent px-6 py-3 text-[12px] font-normal leading-[125%] text-white/90 transition-opacity duration-200 hover:opacity-80 md:text-[16px] lg:text-[18px] lg:leading-[156%]"
              >
                Смоделировать ошибку
              </button>
              <p className="mt-3 text-center text-[10px] font-normal leading-[125%] text-[#ffffff4d] md:text-sm md:leading-[143%]">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a
                  href="https://tl.protei.ru/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline transition-colors hover:text-white"
                >
                  политикой обработки персональных данных
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </section>

      {modalType && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setModalType(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-blue-gradient p-7 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
              <svg
                className={`h-6 w-6 ${
                  modalType === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {modalType === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                  />
                )}
              </svg>
            </div>
            <h3
              className={`mb-2 text-xl font-bold ${
                modalType === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {modalType === 'success'
                ? 'Заявка отправлена!'
                : modalType === 'lectureError'
                  ? 'Выберите лекции'
                  : 'Произошла ошибка'}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              {modalType === 'success'
                ? `Мы получили вашу заявку. Выбрано ${selectedCount} лекций${selectedLectureTitles ? `: ${selectedLectureTitles}.` : '.'}`
                : modalType === 'lectureError'
                  ? 'Пожалуйста, выберите хотя бы одну лекцию из программы для регистрации.'
                  : 'Не удалось отправить заявку. Пожалуйста, попробуйте снова или свяжитесь с нами.'}
            </p>
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="btn-blue inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-[12px] font-normal leading-[125%] text-white transition-opacity duration-200 hover:opacity-90 md:text-[16px] lg:text-[18px] lg:leading-[156%]"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
