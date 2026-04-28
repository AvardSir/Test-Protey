import { z } from 'zod';

// Схема валидации с помощью Zod
export const registrationSchema = z.object({
  fullName: z.string().min(1, 'ФИО обязательно'),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'), // +7 (XXX) XXX-XX-XX
  company: z.string().min(1, 'Компания обязательна'),
  position: z.string().min(1, 'Должность обязательна'),
  email: z.string().email('Неверный формат email'),
  questions: z.string().optional(),
});

// Тип на основе схемы
export type RegistrationFormData = z.infer<typeof registrationSchema>;