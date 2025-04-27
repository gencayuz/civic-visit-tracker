
import React, { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { departments, VisitType, visitStatuses } from '@/types/visit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface VisitDetailsProps {
  visit: VisitType;
  onClose: () => void;
  onUpdate: (updatedVisit: VisitType) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Açık':
      return 'bg-blue-100 text-blue-800';
    case 'İşlemde':
      return 'bg-yellow-100 text-yellow-800';
    case 'Tamamlandı':
      return 'bg-green-100 text-green-800';
    case 'İptal Edildi':
      return 'bg-red-100 text-red-800';
    case 'Gelmedi':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const VisitDetails: React.FC<VisitDetailsProps> = ({ visit, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVisit, setEditedVisit] = useState(visit);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleUpdate = () => {
    onUpdate(editedVisit);
    setIsEditing(false);
    toast.success("Ziyaret başarıyla güncellendi");
  };

  if (isEditing) {
    return (
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium">Vatandaş</h4>
            <p className="text-sm">{editedVisit.citizenName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Tarih</h4>
            <div className="flex gap-2 items-center">
              <Button 
                variant="outline" 
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {format(editedVisit.date, 'dd.MM.yyyy')}
              </Button>
              <Input
                type="time"
                value={format(editedVisit.date, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const newDate = new Date(editedVisit.date);
                  newDate.setHours(hours, minutes);
                  setEditedVisit({ ...editedVisit, date: newDate });
                }}
              />
            </div>
            {showCalendar && (
              <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Tarih Seç</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={editedVisit.date}
                    onSelect={(date) => {
                      if (date) {
                        const newDate = new Date(date);
                        newDate.setHours(editedVisit.date.getHours());
                        newDate.setMinutes(editedVisit.date.getMinutes());
                        setEditedVisit({ ...editedVisit, date: newDate });
                        setShowCalendar(false);
                      }
                    }}
                    className="p-3 pointer-events-auto"
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium">Durum</h4>
          <Select
            value={editedVisit.status}
            onValueChange={(value) => setEditedVisit({ ...editedVisit, status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              {visitStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-sm font-medium">Açıklama</h4>
          <Textarea
            value={editedVisit.description}
            onChange={(e) => setEditedVisit({ ...editedVisit, description: e.target.value })}
            placeholder="Ziyaret ile ilgili notlar..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            İptal
          </Button>
          <Button onClick={handleUpdate}>
            Kaydet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Vatandaş</h4>
          <p className="text-sm">{visit.citizenName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Tarih</h4>
          <p className="text-sm">{format(visit.date, 'PPP', { locale: tr })}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Neden</h4>
          <p className="text-sm">{visit.reasonCategory}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Departman</h4>
          <p className="text-sm">
            {departments.find(d => d.id.toString() === visit.departmentId)?.name}
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Durum</h4>
        <Badge className={getStatusColor(visit.status)}>
          {visit.status}
        </Badge>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Açıklama</h4>
        <p className="text-sm whitespace-pre-line">{visit.description}</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Kapat
        </Button>
        <Button onClick={() => setIsEditing(true)}>
          Düzenle
        </Button>
      </div>
    </div>
  );
};

export default VisitDetails;
