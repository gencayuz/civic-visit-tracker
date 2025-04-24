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
import AddVisitForm from '@/components/visits/AddVisitForm';
import VisitDetails from '@/components/visits/VisitDetails';
import VisitsTable from '@/components/visits/VisitsTable';
import { VisitType, VisitFormData } from '@/types/visit';

const initialVisits: VisitType[] = [
  {
    id: 1,
    citizenName: 'John Smith',
    date: new Date(2023, 3, 15),
    reasonCategory: 'Document Submission',
    description: 'Submitted building permit documents',
    departmentId: '4',
    status: 'Resolved',
  },
  {
    id: 2,
    citizenName: 'Maria Garcia',
    date: new Date(2023, 3, 16),
    reasonCategory: 'Information Request',
    description: 'Inquired about property tax exemptions',
    departmentId: '2',
    status: 'In Progress',
  },
  {
    id: 3,
    citizenName: 'Ahmed Hassan',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Service Registration',
    description: 'Registered for water utility service',
    departmentId: '3',
    status: 'Open',
  },
  {
    id: 4,
    citizenName: 'Emily Chen',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Complaint Filing',
    description: 'Filed noise complaint regarding construction',
    departmentId: '1',
    status: 'In Progress',
  },
  {
    id: 5,
    citizenName: 'Robert Johnson',
    date: new Date(2023, 3, 18),
    reasonCategory: 'Payment',
    description: 'Made payment for property taxes',
    departmentId: '2',
    status: 'Resolved',
  },
];

const Visits: React.FC = () => {
  const [visits, setVisits] = useState<VisitType[]>(initialVisits);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<VisitType | null>(null);
  
  const filteredVisits = visits.filter(visit => 
    visit.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.reasonCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewVisit = (visit: VisitType) => {
    setSelectedVisit(visit);
    setOpenViewDialog(true);
  };

  const handleAddVisit = (data: VisitFormData) => {
    const visitDate = data.date || new Date();
    
    const newVisit: VisitType = {
      id: visits.length + 1,
      citizenName: data.citizenName,
      date: visitDate,
      reasonCategory: data.reasonCategory,
      description: data.description,
      departmentId: data.departmentId,
      status: data.status,
    };
    
    setVisits([...visits, newVisit]);
    setOpenAddDialog(false);
    toast.success('Visit record created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Visit Management</h1>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>Record New Visit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Record New Citizen Visit</DialogTitle>
              <DialogDescription>
                Enter the details of the citizen visit. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <AddVisitForm 
              onSubmit={handleAddVisit}
              onCancel={() => setOpenAddDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search Visits</CardTitle>
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
              placeholder="Search visits by name, description, reason..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <VisitsTable 
            visits={filteredVisits}
            onViewVisit={handleViewVisit}
          />
        </CardContent>
      </Card>
      
      {selectedVisit && (
        <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Visit Details</DialogTitle>
              <DialogDescription>
                Details of the citizen visit record.
              </DialogDescription>
            </DialogHeader>
            <VisitDetails 
              visit={selectedVisit}
              onClose={() => setOpenViewDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Visits;
