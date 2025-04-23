
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Timer } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { departments, VisitType } from '@/types/visit';

interface VisitsTableProps {
  visits: VisitType[];
  onViewVisit: (visit: VisitType) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-blue-100 text-blue-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Resolved':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const VisitsTable: React.FC<VisitsTableProps> = ({ visits, onViewVisit }) => {
  const calculateTimeLeft = (date: Date) => {
    const visitTime = new Date(date).getTime();
    const now = new Date().getTime();
    const diffMinutes = Math.floor((visitTime - now) / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes} min` : 'Ended';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Citizen Name</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Date & Time
            </div>
          </TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <Timer className="h-4 w-4" />
              Time Left
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visits.length > 0 ? (
          visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell className="font-medium">{visit.citizenName}</TableCell>
              <TableCell>{format(visit.date, 'MMM d, yyyy HH:mm')}</TableCell>
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewVisit(visit)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No visits found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VisitsTable;
