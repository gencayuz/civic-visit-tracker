
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { departments, VisitType } from '@/types/visit';

interface VisitDetailsProps {
  visit: VisitType;
  onClose: () => void;
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

const VisitDetails: React.FC<VisitDetailsProps> = ({ visit, onClose }) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Citizen</h4>
          <p className="text-sm">{visit.citizenName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Date</h4>
          <p className="text-sm">{format(visit.date, 'PPP')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Reason</h4>
          <p className="text-sm">{visit.reasonCategory}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Department</h4>
          <p className="text-sm">
            {departments.find(d => d.id.toString() === visit.departmentId)?.name}
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Status</h4>
        <Badge className={getStatusColor(visit.status)}>
          {visit.status}
        </Badge>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Description</h4>
        <p className="text-sm whitespace-pre-line">{visit.description}</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>Update Status</Button>
      </div>
    </div>
  );
};

export default VisitDetails;
