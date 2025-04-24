
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { VisitFormData } from '@/types/visit';
import { visitFormSchema } from './form/visitFormSchema';
import { VisitDateTimeField } from './form/VisitDateTimeField';
import { VisitBasicInfoField } from './form/VisitBasicInfoField';
import { VisitReasonField } from './form/VisitReasonField';
import { VisitDepartmentField } from './form/VisitDepartmentField';

interface AddVisitFormProps {
  onSubmit: (data: VisitFormData) => void;
  onCancel: () => void;
}

const AddVisitForm: React.FC<AddVisitFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<VisitFormData>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      citizenName: '',
      date: undefined,
      time: '',
      reasonCategory: '',
      description: '',
      departmentId: '',
      status: 'Open',
    },
  });

  const handleSubmit = (data: VisitFormData) => {
    // Combine date and time
    const [hours, minutes] = data.time.split(':').map(Number);
    const dateWithTime = new Date(data.date);
    dateWithTime.setHours(hours, minutes);

    // Ensure all required fields are present in the submission
    const formData: VisitFormData = {
      ...data,
      date: dateWithTime,
    };

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <VisitBasicInfoField form={form} />
        <VisitDateTimeField form={form} />
        <VisitReasonField form={form} />
        <VisitDepartmentField form={form} />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Visit Record</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddVisitForm;
