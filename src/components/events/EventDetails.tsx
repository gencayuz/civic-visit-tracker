
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { EventType } from '@/types/event';

interface EventDetailsProps {
  event: EventType;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Talep Eden:</h4>
          <p className="font-medium">{event.requestorName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Faaliyet:</h4>
          <p className="font-medium">{event.activityName}</p>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground">Adres:</h4>
          <p className="font-medium">{event.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Tarih:</h4>
          <p className="font-medium">{format(event.date, 'dd.MM.yyyy')}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Saat:</h4>
          <p className="font-medium">{format(event.date, 'HH:mm')}</p>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground">Kim Gidecek:</h4>
          <ul className="list-disc pl-5 mt-1">
            {event.attendees.map((attendee, index) => (
              <li key={index} className="font-medium">{attendee}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground">Ek Bilgi:</h4>
          <p className="font-medium">{event.additionalInfo || "-"}</p>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={onClose}>Kapat</Button>
      </div>
    </div>
  );
};

export default EventDetails;
