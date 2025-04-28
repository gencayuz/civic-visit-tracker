import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { EventType, EventFormData } from '@/types/event';
import AddEventForm from '@/components/events/AddEventForm';
import EventsTable from '@/components/events/EventsTable';
import EventDetails from '@/components/events/EventDetails';
import { CalendarIcon, FileText as FileWord, FileSpreadsheet as FileExcel } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Örnek etkinlik verileri
const initialEvents: EventType[] = [
  {
    id: 1,
    requestorName: "Ahmet Yılmaz",
    companyName: "ABC Organizasyon",
    phoneNumber: "0532 123 4567",
    activityName: "Açılış",
    address: "Karabük Belediyesi Nikah Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 15, 14, 30),
    attendees: ["Başkan Mehmet Özcan", "Başkan Yardımcısı İsmail Büyükvarlık"],
    additionalInfo: "Açılış kurdelesini başkan kesecek",
  },
  {
    id: 2,
    requestorName: "Fatma Kaya",
    companyName: "XYZ Ltd. Şti.",
    phoneNumber: "0533 456 7890",
    activityName: "Toplantı",
    address: "Karabük Üniversitesi Konferans Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 17, 10, 0),
    attendees: ["Başkan Yardımcısı Bilgin Atlı"],
    additionalInfo: "Üniversite yönetimi ile birlikte yapılacak",
  },
  {
    id: 3,
    requestorName: "Mehmet Demir",
    companyName: "Demir Organizasyon",
    phoneNumber: "0535 789 0123",
    activityName: "Festival",
    address: "Kent Meydanı, Merkez/Karabük",
    date: new Date(2023, 5, 20, 18, 0),
    attendees: ["Başkan Mehmet Özcan", "Başkan Yardımcısı İsmail Büyükvarlık", "Başkan Yardımcısı Bilgin Atlı"],
    additionalInfo: "Tüm halk davetlidir",
  }
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  
  // Filter events based on search term and date
  const filteredEvents = events.filter(event => {
    const matchesText = event.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedDate) {
      const eventDate = new Date(event.date);
      return matchesText && 
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear();
    }

    return matchesText;
  });

  const handleViewEvent = (event: EventType) => {
    setSelectedEvent(event);
    setOpenViewDialog(true);
  };

  const handleEditEvent = (event: EventType) => {
    setSelectedEvent(event);
    setOpenEditDialog(true);
  };

  const handleUpdateEvent = (data: EventFormData) => {
    if (!selectedEvent) return;
    
    const updatedEvent: EventType = {
      ...selectedEvent,
      requestorName: data.requestorName,
      companyName: data.companyName,
      phoneNumber: data.phoneNumber,
      activityName: data.activityName,
      address: data.address,
      date: new Date(
        data.date.getFullYear(),
        data.date.getMonth(),
        data.date.getDate(),
        Number(data.time?.split(':')[0]) || 0,
        Number(data.time?.split(':')[1]) || 0
      ),
      attendees: data.attendees,
      additionalInfo: data.additionalInfo || '',
    };
    
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setOpenEditDialog(false);
    toast.success('Etkinlik başarıyla güncellendi');
  };

  const handleDeleteEvent = (event: EventType) => {
    if (window.confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
      setEvents(events.filter(e => e.id !== event.id));
      toast.success("Etkinlik başarıyla silindi");
    }
  };

  const handleAddEvent = (data: EventFormData) => {
    const newEvent: EventType = {
      id: events.length + 1,
      requestorName: data.requestorName,
      companyName: data.companyName,
      phoneNumber: data.phoneNumber,
      activityName: data.activityName,
      address: data.address,
      date: new Date(
        data.date.getFullYear(),
        data.date.getMonth(),
        data.date.getDate(),
        Number(data.time?.split(':')[0]) || 0,
        Number(data.time?.split(':')[1]) || 0
      ),
      attendees: data.attendees,
      additionalInfo: data.additionalInfo || '',
    };
    
    setEvents([...events, newEvent]);
    setOpenAddDialog(false);
    toast.success('Etkinlik başarıyla oluşturuldu');
  };

  // Export to Word
  const exportToWord = () => {
    // Create a formatted HTML table for Word
    const header = '<tr><th>Talep Eden</th><th>Firma Adı</th><th>Telefon</th><th>Etkinlik</th><th>Tarih</th><th>Adres</th><th>Katılımcılar</th></tr>';
    
    const rows = filteredEvents.map(event => `
      <tr>
        <td>${event.requestorName}</td>
        <td>${event.companyName || '-'}</td>
        <td>${event.phoneNumber || '-'}</td>
        <td>${event.activityName}</td>
        <td>${format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}</td>
        <td>${event.address}</td>
        <td>${event.attendees.join(', ')}</td>
      </tr>
    `).join('');
    
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Etkinlik Listesi</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Etkinlik Listesi</h1>
          ${selectedDate ? `<p>Tarih: ${format(selectedDate, 'dd MMMM yyyy', { locale: tr })}</p>` : ''}
          <table>
            ${header}
            ${rows}
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `etkinlik_listesi_${format(new Date(), 'yyyy-MM-dd')}.doc`;
    link.click();
    
    toast.success(`Etkinlik listesi Word formatında indirildi`);
  };
  
  // Export to Excel
  const exportToExcel = () => {
    // Create a formatted CSV for Excel
    const header = 'Talep Eden,Firma Adı,Telefon,Etkinlik,Tarih,Adres,Katılımcılar\n';
    
    const rows = filteredEvents.map(event => `"${event.requestorName}","${event.companyName || '-'}","${event.phoneNumber || '-'}","${event.activityName}","${format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}","${event.address}","${event.attendees.join(', ')}"`).join('\n');
    
    const csv = `${header}${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `etkinlik_listesi_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    
    toast.success(`Etkinlik listesi Excel formatında indirildi`);
  };

  // Convert event data to form data for editing
  const eventToFormData = (event: EventType): EventFormData => {
    const hours = event.date.getHours().toString().padStart(2, '0');
    const minutes = event.date.getMinutes().toString().padStart(2, '0');
    
    return {
      requestorName: event.requestorName,
      companyName: event.companyName,
      phoneNumber: event.phoneNumber,
      activityName: event.activityName,
      address: event.address,
      date: event.date,
      time: `${hours}:${minutes}`,
      attendees: event.attendees,
      additionalInfo: event.additionalInfo,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gidilecek Etkinlikler</h1>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>Yeni Etkinlik Oluştur</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
              <DialogDescription>
                Etkinlik detaylarını giriniz. Bitirdiğinizde kaydet butonuna tıklayın.
              </DialogDescription>
            </DialogHeader>
            <AddEventForm 
              onSubmit={handleAddEvent}
              onCancel={() => setOpenAddDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Etkinlik Ara</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
                className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <Input
                placeholder="İsim, faaliyet veya adrese göre ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal min-w-[240px]",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "d MMMM yyyy", { locale: tr })
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  locale={tr}
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <Button 
                variant="ghost" 
                onClick={() => setSelectedDate(undefined)}
                className="px-3"
              >
                Tarihi Temizle
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle>Etkinlik Listesi</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToWord}
              className="flex items-center gap-1"
            >
              <FileWord className="h-4 w-4" />
              <span>Word</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToExcel}
              className="flex items-center gap-1"
            >
              <FileExcel className="h-4 w-4" />
              <span>Excel</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <EventsTable 
            events={filteredEvents}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </CardContent>
      </Card>
      
      {selectedEvent && (
        <>
          <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Etkinlik Detayları</DialogTitle>
              </DialogHeader>
              <EventDetails 
                event={selectedEvent}
                onClose={() => setOpenViewDialog(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Etkinlik Düzenle</DialogTitle>
                <DialogDescription>
                  Etkinlik detaylarını güncelleyiniz. Bitirdiğinizde kaydet butonuna tıklayın.
                </DialogDescription>
              </DialogHeader>
              {selectedEvent && (
                <AddEventForm 
                  initialData={eventToFormData(selectedEvent)}
                  onSubmit={handleUpdateEvent}
                  onCancel={() => setOpenEditDialog(false)}
                  isEditing={true}
                />
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Events;
