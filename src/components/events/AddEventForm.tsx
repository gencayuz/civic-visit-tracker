
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { eventFormSchema, EventFormData } from './form/eventFormSchema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { defaultAttendees, activityTypes } from '@/types/event';

interface AddEventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialData?: EventFormData;
  isEditing?: boolean;
}

const AddEventForm = ({ onSubmit, onCancel, initialData, isEditing = false }: AddEventFormProps) => {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      requestorName: '',
      activityName: '',
      address: '',
      time: '',
      attendees: [],
      additionalInfo: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Talep Eden */}
        <FormField
          control={form.control}
          name="requestorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Talep Eden Kişi</FormLabel>
              <FormControl>
                <Input placeholder="Talep eden kişinin adı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Faaliyet */}
        <FormField
          control={form.control}
          name="activityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faaliyet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Bir faaliyet türü seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Adres */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Etkinlik adresi" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tarih */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tarih</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd.MM.yyyy")
                      ) : (
                        <span>Tarih seçin</span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-auto h-4 w-4 opacity-50"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <line x1="3" x2="21" y1="9" y2="9"></line>
                        <line x1="9" x2="9" y1="21" y2="9"></line>
                      </svg>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Saat */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saat</FormLabel>
              <FormControl>
                <Input
                  placeholder="13:30"
                  pattern="[0-9]{1,2}:[0-9]{2}"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Kim Gidecek */}
        <FormField
          control={form.control}
          name="attendees"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Kim Gidecek</FormLabel>
              </div>
              {defaultAttendees.map((person) => (
                <FormField
                  key={person}
                  control={form.control}
                  name="attendees"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={person}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(person)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, person])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== person
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {person}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ek Bilgi */}
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ek Bilgi</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Etkinlikle ilgili ek bilgiler" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddEventForm;
