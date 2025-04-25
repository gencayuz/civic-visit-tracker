
import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EventType } from '@/types/event';

interface EventsTableProps {
  events: EventType[];
  onViewEvent: (event: EventType) => void;
  onEditEvent: (event: EventType) => void;
  onDeleteEvent: (event: EventType) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({
  events,
  onViewEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Talep Eden</TableHead>
          <TableHead>Faaliyet</TableHead>
          <TableHead>Adres</TableHead>
          <TableHead>Tarih ve Saat</TableHead>
          <TableHead>Kim Gidecek</TableHead>
          <TableHead>Ek Bilgi</TableHead>
          <TableHead>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length > 0 ? (
          events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.requestorName}</TableCell>
              <TableCell>{event.activityName}</TableCell>
              <TableCell className="max-w-[200px] truncate" title={event.address}>{event.address}</TableCell>
              <TableCell>{format(event.date, 'dd.MM.yyyy HH:mm')}</TableCell>
              <TableCell className="max-w-[200px]">
                <div className="flex flex-col">
                  {event.attendees.slice(0, 2).map((attendee, index) => (
                    <span key={index} className="truncate">{attendee}</span>
                  ))}
                  {event.attendees.length > 2 && (
                    <span className="text-muted-foreground text-xs italic">
                      +{event.attendees.length - 2} kişi daha
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={event.additionalInfo}>
                {event.additionalInfo || "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewEvent(event)}>
                    Görüntüle
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditEvent(event)}>
                    Düzenle
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDeleteEvent(event)}>
                    Sil
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Kayıtlı etkinlik bulunamadı.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EventsTable;
