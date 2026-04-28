import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData } from '../types/form';

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Данные формы:', data);
    // Здесь будет логика отправки
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {/* Поле ФИО */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          ФИО
        </label>
        <input
          id="fullName"
          {...register('fullName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.fullName && (
          <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* Аналогично для Телефона, Компании, Должности, Email */}
      {/* ... */}

      {/* Поле "Ваши вопросы к обсуждению" */}
      <div>
        <label htmlFor="questions" className="block text-sm font-medium text-gray-700">
          Ваши вопросы к обсуждению
        </label>
        <textarea
          id="questions"
          rows={3}
          {...register('questions')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegistrationForm;