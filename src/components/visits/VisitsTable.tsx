import React from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { departments, VisitType } from '@/types/visit';
import { toast } from 'sonner';

interface VisitsTableProps {
  visits: VisitType[];
  onViewVisit: (visit: VisitType) => void;
  onDeleteVisit?: (visitId: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Açık':
      return 'bg-blue-100 text-blue-800';
    case 'İşlemde':
      return 'bg-yellow-100 text-yellow-800';
    case 'Tamamlandı':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const VisitsTable: React.FC<VisitsTableProps> = ({ visits, onViewVisit, onDeleteVisit }) => {
  const { isAdmin } = useAuth();
  
  const calculateTimeLeft = (date: Date) => {
    const visitTime = new Date(date).getTime();
    const now = new Date().getTime();
    const diffMinutes = Math.floor((visitTime - now) / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes} dk` : 'Bitti';
  };

  const handleDeleteVisit = (id: number) => {
    if (onDeleteVisit) {
      onDeleteVisit(id);
    } else {
      toast.error('Silme işlevi henüz tanımlanmamış');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vatandaş Adı</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Tarih & Saat
            </div>
          </TableHead>
          <TableHead>Neden</TableHead>
          <TableHead>Departman</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Timer className="h-4 w-4" />
              Kalan Süre
            </div>
          </TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visits.length > 0 ? (
          visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell className="font-medium">{visit.citizenName}</TableCell>
              <TableCell>{format(visit.date, 'd MMMM yyyy HH:mm', { locale: tr })}</TableCell>
              <TableCell>{visit.reasonCategory}</TableCell>
              <TableCell>
                {departments.find(d => d.id.toString() === visit.departmentId)?.name}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(visit.status)}>
                  {visit.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {calculateTimeLeft(visit.date)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewVisit(visit)}
                  >
                    Görüntüle
                  </Button>
                  {isAdmin() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteVisit(visit.id)}
                    >
                      Sil
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Ziyaret kaydı bulunamadı.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VisitsTable;
