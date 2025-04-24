
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { visitFormSchema } from './visitFormSchema';
import { visitReasons } from '@/types/visit';

type FormData = z.infer<typeof visitFormSchema>;

interface VisitReasonFieldProps {
  form: UseFormReturn<FormData>;
}

export const VisitReasonField: React.FC<VisitReasonFieldProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="reasonCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Visit</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper" className="w-full z-50 bg-background">
                {visitReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter detailed description of the visit"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
