
import * as z from 'zod';

export const eventFormSchema = z.object({
  requestorName: z.string().min(2, { message: 'Talep eden kişi adı zorunludur' }),
  activityName: z.string().min(2, { message: 'Faaliyet adı zorunludur' }),
  address: z.string().min(5, { message: 'Adres en az 5 karakter olmalıdır' }),
  date: z.date({ required_error: 'Tarih zorunludur' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Lütfen geçerli bir saat giriniz' }),
  attendees: z.array(z.string()).min(1, { message: 'En az bir katılımcı seçilmelidir' }),
  additionalInfo: z.string().optional()
});

export type EventFormData = z.infer<typeof eventFormSchema>;
