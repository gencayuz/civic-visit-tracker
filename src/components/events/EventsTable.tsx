
import React from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EventType } from '@/types/event';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isAdmin } = useAuth();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Talep Eden</TableHead>
          <TableHead>Firma Adı</TableHead>
          <TableHead>Telefon Numarası</TableHead>
          <TableHead>Etkinlik</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead>Adres</TableHead>
          <TableHead>Katılımcılar</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length > 0 ? (
          events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.requestorName}</TableCell>
              <TableCell>{event.companyName || '-'}</TableCell>
              <TableCell>{event.phoneNumber || '-'}</TableCell>
              <TableCell>{event.activityName}</TableCell>
              <TableCell>
                {format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}
              </TableCell>
              <TableCell className="max-w-md truncate">{event.address}</TableCell>
              <TableCell>{event.attendees.length} kişi</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewEvent(event)}
                  >
                    Görüntüle
                  </Button>
                  {isAdmin() && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditEvent(event)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onDeleteEvent(event)}
                      >
                        Sil
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              Etkinlik bulunamadı.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EventsTable;
