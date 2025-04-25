
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

// Örnek etkinlik verileri
const initialEvents: EventType[] = [
  {
    id: 1,
    requestorName: "Ahmet Yılmaz",
    activityName: "Açılış",
    address: "Karabük Belediyesi Nikah Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 15, 14, 30),
    attendees: ["Başkan Mehmet Özcan", "Başkan Yardımcısı İsmail Büyükvarlık"],
    additionalInfo: "Açılış kurdelesini başkan kesecek",
  },
  {
    id: 2,
    requestorName: "Fatma Kaya",
    activityName: "Toplantı",
    address: "Karabük Üniversitesi Konferans Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 17, 10, 0),
    attendees: ["Başkan Yardımcısı Bilgin Atlı"],
    additionalInfo: "Üniversite yönetimi ile birlikte yapılacak",
  },
  {
    id: 3,
    requestorName: "Mehmet Demir",
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
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  
  const filteredEvents = events.filter(event => 
    event.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEvent = (event: EventType) => {
    setSelectedEvent(event);
    setOpenViewDialog(true);
  };

  const handleEditEvent = (event: EventType) => {
    // Bu fonksiyon daha sonra implement edilecek
    toast.info("Düzenleme özelliği henüz aktif değil");
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
          <div className="relative">
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
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
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
      )}
    </div>
  );
};

export default Events;
