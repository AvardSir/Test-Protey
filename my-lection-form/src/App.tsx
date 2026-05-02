import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: '',
    position: '',
    email: '',
    questions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0f1724] text-white">
      {/* Header */}
      
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <span className="text-[#0f1724] font-bold text-lg leading-none">П</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight tracking-wide">ПРОТЕЙ</span>
            <span className="text-gray-400 text-[10px] leading-tight tracking-widest uppercase">Группа компаний</span>
          </div>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">О мероприятии</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Форматы</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Круглый стол</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Лекторий</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Регистрация на лекторий</h1>

        {/* Form Card */}
        <div className="bg-[#1a2435] rounded-lg p-6 border border-gray-700/50">
          <form className="space-y-4">
            {/* Row 1: Full Name & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">ФИО<span className="text-cyan-400">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Иванов Иван Иванович"
                  className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Телефон<span className="text-cyan-400">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (987) 654-32-10"
                  className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Row 2: Company & Position */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Компания<span className="text-cyan-400">*</span></label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Название компании"
                  className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Должность<span className="text-cyan-400">*</span></label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Руководитель отдела..."
                  className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Row 3: Email */}
            <div>
              <label className="block text-sm mb-1.5">Email<span className="text-cyan-400">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@company.ru"
                className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Row 4: Questions */}
            <div>
              <label className="block text-sm mb-1.5">Ваши вопросы к обсуждению</label>
              <textarea
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                placeholder="Какие темы вам особенно интересны?"
                rows={4}
                className="w-full bg-[#0f1724] border border-gray-700/50 rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-y"
              />
            </div>

            {/* Selected Lectures Count */}
            <div className="py-2">
              <span className="text-sm text-gray-300">Выбрано 0 лекций</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1e3a5f] hover:bg-[#254a75] border border-cyan-500/30 text-white py-3 rounded-md text-sm font-medium transition-colors"
            >
              Зарегистрироваться
            </button>

            {/* Privacy Policy */}
            <p className="text-center text-xs text-gray-500">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="#" className="text-gray-400 underline hover:text-gray-300 transition-colors">
                политикой обработки персональных данных
              </a>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 mt-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <span className="text-[#0f1724] font-bold text-lg leading-none">П</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight tracking-wide">ПРОТЕЙ</span>
            <span className="text-gray-400 text-[10px] leading-tight tracking-widest uppercase">Группа компаний</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
