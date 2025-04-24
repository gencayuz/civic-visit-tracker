
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { visitFormSchema } from './visitFormSchema';

type FormData = z.infer<typeof visitFormSchema>;

interface VisitBasicInfoFieldProps {
  form: UseFormReturn<FormData>;
}

export const VisitBasicInfoField: React.FC<VisitBasicInfoFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="citizenName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Citizen Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter citizen's full name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
