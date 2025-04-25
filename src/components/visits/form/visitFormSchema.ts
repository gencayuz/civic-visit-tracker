
import * as z from 'zod';

export const visitFormSchema = z.object({
  citizenName: z.string().min(2, { message: 'Vatandaş adı zorunludur' }),
  date: z.date({ required_error: 'Ziyaret tarihi zorunludur' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Lütfen geçerli bir saat giriniz' }),
  reasonCategory: z.string({ required_error: 'Lütfen bir ziyaret nedeni seçiniz' }),
  description: z.string().min(5, { message: 'Açıklama en az 5 karakter olmalıdır' }),
  departmentId: z.string({ required_error: 'Lütfen bir departman seçiniz' }),
  status: z.string().default('Açık'),
});

export type VisitFormData = z.infer<typeof visitFormSchema>;
