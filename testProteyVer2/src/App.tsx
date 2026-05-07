import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import leftGlow from './assets/left-glow.png'
import sp1 from './assets/speakers/sp1.png'
import sp2 from './assets/speakers/sp2.png'
import sp3 from './assets/speakers/sp3.png'
import sp4 from './assets/speakers/sp4.png'
import sp5 from './assets/speakers/sp5.png'
import sp6 from './assets/speakers/sp6.png'

type Lecture = {
  id: string
  title: string
  day: '7 апреля' | '8 апреля' | '9 апреля'
  time: string
  speaker: string
  position: string
  image: string
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
  {
    id: 'arch-control',
    day: '7 апреля',
    time: '11:00-12:00',
    title: 'Вертикальное импортозамещение: путь к технологической безопасности сетей связи',
    speaker: 'Игорь Ищенко Александр, пресейл-менеджер',
    position: 'НТЦ ПРОТЕЙ',
    image: sp1,
  },
  {
    id: 'unified-system',
    day: '7 апреля',
    time: '12:00-13:00',
    title: 'Экосистема унифицированных коммуникаций ПРОТЕЙ',
    speaker: 'Роман Дмитриев, пресейл-менеджер',
    position: 'ПРОТЕЙ Технологии',
    image: sp2,
  },
  {
    id: 'single-control',
    day: '7 апреля',
    time: '13:00-14:00',
    title: 'Единая среда реагирования: как связь управляет инцидентами в ERP и системах безопасности',
    speaker: 'Виталий Павлов',
    position: 'НТЦ ПРОТЕЙ',
    image: sp3,
  },
  {
    id: 'critical-objects',
    day: '8 апреля',
    time: '14:00-15:00',
    title: 'Управление инфраструктурой распределенных точек: контроль сети объектов в одной точке',
    speaker: 'Олег Иванов, руководитель проектного офиса',
    position: 'НТЦ ПРОТЕЙ',
    image: sp4,
  },
  {
    id: 'transport-kii',
    day: '8 апреля',
    time: '15:00-16:00',
    title: 'Выделенные сети LTE на объектах КИИ: надежная транспортная среда для взаимодействия людей и координации устройств',
    speaker: 'Павел Бажин, инженер',
    position: 'НТЦ ПРОТЕЙ',
    image: sp5,
  },
  {
    id: 'command-comms',
    day: '9 апреля',
    time: '16:00-17:00',
    title: 'Надежная корпоративная сеть телефонной связи: что нужно и как создать',
    speaker: 'Виталий Панов, менеджер продукта',
    position: 'НТЦ ПРОТЕЙ',
    image: sp6,
  },
]

const days: Array<Lecture['day']> = ['7 апреля', '8 апреля', '9 апреля']

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
  const [openDays, setOpenDays] = useState<Set<Lecture['day']>>(new Set())

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

  const lecturesByDay = useMemo(
    () =>
      days.map((day) => ({
        day,
        lectures: lectureOptions.filter((lecture) => lecture.day === day),
      })),
    [],
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

  const toggleDay = (day: Lecture['day']) => {
    setOpenDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) {
        next.delete(day)
      } else {
        next.add(day)
      }
      return next
    })
  }

  const toggleLecture = (lectureId: string) => {
    const isSelected = selectedLectures.includes(lectureId)
    const next = isSelected
      ? selectedLectures.filter((id) => id !== lectureId)
      : [...selectedLectures, lectureId]
    setValue('lectures', next, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#131c2d] px-4 py-10 text-white md:py-16">
      <img
        src={leftGlow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[380px] lg:w-[520px] min-[1440px]:block"
      />
      <section className="container mx-auto max-w-[1176px]">
        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div>
            <h2>Программа лектория</h2>
            <p className="body-l mt-3 max-w-[620px] text-white">
              Выберите интересующие вас темы и составьте индивидуальное расписание. Регистрация
              доступна на каждое событие отдельно.
            </p>

            <div className="mt-5">
              {lecturesByDay.map(({ day, lectures }) => {
                const isOpen = openDays.has(day)
                return (
                  <div key={day} className="border-b border-[#1d5f90] py-3">
                    <button type="button" className="flex items-center gap-3 text-left" onClick={() => toggleDay(day)}>
                      <h3>{day}</h3>
                      <svg
                        className={`h-3 w-3 shrink-0 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="mt-3 grid gap-2.5 pb-2">
                        {lectures.map((lecture) => (
                          <button
                            type="button"
                            key={lecture.id}
                            onClick={() => toggleLecture(lecture.id)}
                            className={`lecture-card flex w-full cursor-pointer gap-3 rounded-[3px] border p-2.5 text-left transition-colors hover:border-[#75c9ea] ${selectedLectures.includes(lecture.id) ? 'border-[#75c9ea]' : 'border-transparent'
                              }`}
                          >
                            <img src={lecture.image} alt="" aria-hidden="true" className="h-[80px] w-[80px] shrink-0 rounded-[2px] object-cover" />
                            <div className="min-w-0">
                              <div className="mb-1 inline-flex rounded-[8px] border border-[#75c9ea] bg-transparent px-2 py-[1px] text-[10px] leading-[125%] text-white">
                                {lecture.time}
                              </div>
                              <p className="text-[14px] font-semibold leading-[120%] text-white md:text-[16px]">
                                {lecture.title}
                              </p>
                              <p className="mt-1 text-[11px] leading-[125%] text-white">
                                {lecture.speaker}
                              </p>
                              <p className="text-[11px] leading-[125%] text-white">
                                {lecture.position}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>



          <div>
            <div className="mb-6 md:mb-8 lg:mb-12" data-label="div.mb-6">
              <div className="text-center mx-auto">
                <h2 className="text-[16px] md:text-[32px] lg:text-[40px] font-semibold leading-[125%] lg:leading-[133%] tracking-[-0.01em] text-white mb-2 md:mb-6">
                  Регистрация на лекторий
                </h2>
              </div>
            </div>

            <h2>
              Регистрация <br /> на лекторий
            </h2>

            <div className="rounded-[8px] bg-blue-gradient p-4 md:p-5 lg:p-5">
              <form className="mt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 gap-2">
                  <label className="col-span-1 block">
                    <span className="caption mb-1 block text-white">
                      ФИО <span className="text-[#75c9ea]">*</span>
                    </span>
                    {/* инпуты остаются с прежними классами, т.к. это не типографика заголовков */}
                    <input
                      {...register('fullName', {
                        required: 'Обязательное поле',
                        minLength: { value: 2, message: 'Минимум 2 символа' },
                        pattern: { value: /^[a-zA-Zа-яёА-ЯЁ\s\-.]+$/, message: 'Только буквы' },
                      })}
                      type="text"
                      autoComplete="name"
                      placeholder="Иванов Иван Иванович"
                      className={`h-[34px] w-full rounded-[8px] border bg-[#000c1480] px-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.fullName ? 'border-red-500' : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.fullName?.message}</span>
                  </label>



                  {/* ... остальные поля формы без изменений ... */}
                  <label className="col-span-1 block">
                    <span className="mb-1 block text-[12px] font-normal leading-[125%] md:text-[12px] lg:text-[14px] lg:leading-[20px]">
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
                      className={`h-[34px] w-full rounded-[8px] border bg-[#000c1480] px-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.phone
                        ? 'border-red-500'
                        : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.phone?.message}</span>
                  </label>

                  <label className="col-span-1 block">
                    <span className="mb-1 block text-[12px] font-normal leading-[125%] md:text-[12px] lg:text-[14px] lg:leading-[20px]">
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
                      className={`h-[34px] w-full rounded-[8px] border bg-[#000c1480] px-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.company
                        ? 'border-red-500'
                        : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.company?.message}</span>
                  </label>

                  <label className="col-span-1 block">
                    <span className="mb-1 block text-[12px] font-normal leading-[125%] md:text-[12px] lg:text-[14px] lg:leading-[20px]">
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
                      className={`h-[34px] w-full rounded-[8px] border bg-[#000c1480] px-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.position
                        ? 'border-red-500'
                        : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.position?.message}</span>
                  </label>

                  <label className="col-span-1 block">
                    <span className="mb-1 block text-[12px] font-normal leading-[125%] md:text-[12px] lg:text-[14px] lg:leading-[20px]">
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
                      className={`h-[34px] w-full rounded-[8px] border bg-[#000c1480] px-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.email
                        ? 'border-red-500'
                        : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">{errors.email?.message}</span>
                  </label>

                  <label className="col-span-1 block">
                    <span className="mb-1 block text-[12px] font-normal leading-[125%] md:text-[12px] lg:text-[14px] lg:leading-[20px]">
                      Ваши вопросы к обсуждению
                    </span>
                    <textarea
                      {...register('discussionQuestions', {
                        validate: (value) => !value || !/<[^>]+>/.test(value) || 'Недопустимые символы',
                      })}
                      autoComplete="off"
                      placeholder="Какие темы вам особенно интересны?"
                      rows={4}
                      className={`block h-[110px] w-full resize-none rounded-[8px] border bg-[#000c1480] p-2 text-[12px] font-normal leading-[143%] text-[#d4e0f580] outline-none transition-colors placeholder:text-[#ffffff4d] ${errors.discussionQuestions
                        ? 'border-red-500'
                        : 'border-transparent hover:border-[#75c9ea] focus:border-[#75c9ea]'
                        }`}
                    />
                    <span className="mt-1 block min-h-4 text-xs text-red-400">
                      {errors.discussionQuestions?.message}
                    </span>
                  </label>
                </div>

                <p className="body-m mb-6 mt-2 text-white">
                  Выбрано{' '}
                  <span className="text-[#75c9ea]">{selectedCount}</span>{' '}
                  лекций
                </p>

                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={isSubmittingMock}
                    className="btn-ghost inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg px-6 text-[16px] font-normal leading-[150%] text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingMock ? 'Отправка...' : 'Зарегистрироваться'}
                  </button>
                  <p className="caption mt-3 text-center text-[#ffffff4d]">
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
          </div>
        </div>
      </section>


      {/* Модальные окна без изменений */}
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
                className={`h-6 w-6 ${modalType === 'success' ? 'text-emerald-400' : 'text-red-400'
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
              className={`mb-2 text-xl font-bold ${modalType === 'success' ? 'text-emerald-400' : 'text-red-400'
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
