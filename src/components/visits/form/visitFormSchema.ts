
import * as z from 'zod';

export const visitFormSchema = z.object({
  citizenName: z.string().min(2, { message: 'Citizen name is required' }),
  date: z.date({ required_error: 'Visit date is required' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Please enter a valid time' }),
  reasonCategory: z.string({ required_error: 'Please select a reason category' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  departmentId: z.string({ required_error: 'Please select a department' }),
  status: z.string().default('Open'),
});

export type VisitFormData = z.infer<typeof visitFormSchema>;
