
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
    citizenName: 'Ahmet Yılmaz',
    date: new Date(2023, 3, 15),
    reasonCategory: 'Evrak Teslimi',
    description: 'İnşaat ruhsatı evraklarını teslim etti',
    departmentId: '4',
    status: 'Tamamlandı',
  },
  {
    id: 2,
    citizenName: 'Ayşe Kaya',
    date: new Date(2023, 3, 16),
    reasonCategory: 'Bilgi Talebi',
    description: 'Emlak vergisi muafiyeti hakkında bilgi aldı',
    departmentId: '2',
    status: 'İşlemde',
  },
  {
    id: 3,
    citizenName: 'Mehmet Demir',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Hizmet Kaydı',
    description: 'Su aboneliği başvurusu yaptı',
    departmentId: '3',
    status: 'Açık',
  },
  {
    id: 4,
    citizenName: 'Fatma Şahin',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Şikayet',
    description: 'İnşaat gürültüsü şikayeti',
    departmentId: '1',
    status: 'İşlemde',
  },
  {
    id: 5,
    citizenName: 'Ali Öztürk',
    date: new Date(2023, 3, 18),
    reasonCategory: 'Ödeme',
    description: 'Emlak vergisi ödemesi yaptı',
    departmentId: '2',
    status: 'Tamamlandı',
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
    toast.success('Ziyaret kaydı başarıyla oluşturuldu');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ziyaret Yönetimi</h1>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>Yeni Ziyaret Kaydet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Yeni Vatandaş Ziyareti Kaydet</DialogTitle>
              <DialogDescription>
                Vatandaş ziyaret detaylarını giriniz. Bitirdiğinizde kaydet butonuna tıklayın.
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
          <CardTitle className="text-lg">Ziyaret Ara</CardTitle>
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
              placeholder="İsim, açıklama veya nedene göre ara..."
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
              <DialogTitle>Ziyaret Detayları</DialogTitle>
              <DialogDescription>
                Vatandaş ziyaret kaydının detayları.
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
