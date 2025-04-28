import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AddVisitForm from '@/components/visits/AddVisitForm';
import VisitDetails from '@/components/visits/VisitDetails';
import VisitsTable from '@/components/visits/VisitsTable';
import { VisitType, VisitFormData, departments } from '@/types/visit';
import { directorates } from '@/types/directorate';
import { FileText as FileWord, FileSpreadsheet as FileExcel } from 'lucide-react';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<VisitType | null>(null);
  const [openForwardDialog, setOpenForwardDialog] = useState(false);
  const [selectedDirectorate, setSelectedDirectorate] = useState<string>("");
  
  const filteredVisits = visits.filter(visit => {
    const matchesText = visit.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.reasonCategory.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedDate) {
      const visitDate = new Date(visit.date);
      return matchesText && 
        visitDate.getDate() === selectedDate.getDate() &&
        visitDate.getMonth() === selectedDate.getMonth() &&
        visitDate.getFullYear() === selectedDate.getFullYear();
    }

    return matchesText;
  });

  // Export to Word
  const exportToWord = () => {
    // Create a formatted HTML table for Word
    const header = '<tr><th>Vatandaş</th><th>Tarih</th><th>Kategori</th><th>Departman</th><th>Durum</th><th>Açıklama</th></tr>';
    
    const rows = filteredVisits.map(visit => {
      const department = departments.find(d => d.id.toString() === visit.departmentId)?.name || '-';
      return `
        <tr>
          <td>${visit.citizenName}</td>
          <td>${format(visit.date, 'dd MMMM yyyy', { locale: tr })}</td>
          <td>${visit.reasonCategory}</td>
          <td>${department}</td>
          <td>${visit.status}</td>
          <td>${visit.description}</td>
        </tr>
      `;
    }).join('');
    
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Ziyaret Listesi</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Ziyaret Listesi</h1>
          ${selectedDate ? `<p>Tarih: ${format(selectedDate, 'dd MMMM yyyy', { locale: tr })}</p>` : ''}
          <table>
            ${header}
            ${rows}
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ziyaret_listesi_${format(new Date(), 'yyyy-MM-dd')}.doc`;
    link.click();
    
    toast.success(`Ziyaret listesi Word formatında indirildi`);
  };
  
  // Export to Excel
  const exportToExcel = () => {
    // Create a formatted CSV for Excel
    const header = 'Vatandaş,Tarih,Kategori,Departman,Durum,Açıklama\n';
    
    const rows = filteredVisits.map(visit => {
      const department = departments.find(d => d.id.toString() === visit.departmentId)?.name || '-';
      return `"${visit.citizenName}","${format(visit.date, 'dd MMMM yyyy', { locale: tr })}","${visit.reasonCategory}","${department}","${visit.status}","${visit.description}"`;
    }).join('\n');
    
    const csv = `${header}${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ziyaret_listesi_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    
    toast.success(`Ziyaret listesi Excel formatında indirildi`);
  };

  const handleViewVisit = (visit: VisitType) => {
    setSelectedVisit(visit);
    setOpenViewDialog(true);
  };

  const handleUpdateVisit = (updatedVisit: VisitType) => {
    setVisits(visits.map(visit => 
      visit.id === updatedVisit.id ? updatedVisit : visit
    ));
    setSelectedVisit(updatedVisit);
  };
  
  const handleDeleteVisit = (visitId: number) => {
    setVisits(visits.filter(visit => visit.id !== visitId));
    toast.success("Ziyaret kaydı başarıyla silindi");
  };

  const handleForwardVisit = (visit: VisitType) => {
    setSelectedVisit(visit);
    setOpenForwardDialog(true);
  };

  const handleConfirmForward = () => {
    if (!selectedVisit || !selectedDirectorate) {
      toast.error("Lütfen bir müdürlük seçin");
      return;
    }

    // Here we would normally send this to the backend
    // For now, we'll just show a success message
    toast.success(`Ziyaret kaydı başarıyla ${selectedDirectorate} müdürlüğüne yönlendirildi`);
    
    // Update the visit record with the directorate information
    const updatedVisit = {
      ...selectedVisit,
      forwardedTo: selectedDirectorate,
      status: 'İşlemde'
    };
    
    handleUpdateVisit(updatedVisit);
    setOpenForwardDialog(false);
    setSelectedDirectorate("");
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal min-w-[240px]",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "d MMMM yyyy", { locale: tr })
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  locale={tr}
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <Button 
                variant="ghost" 
                onClick={() => setSelectedDate(undefined)}
                className="px-3"
              >
                Tarihi Temizle
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle>Ziyaret Listesi</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToWord}
              className="flex items-center gap-1"
            >
              <FileWord className="h-4 w-4" />
              <span>Word</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToExcel}
              className="flex items-center gap-1"
            >
              <FileExcel className="h-4 w-4" />
              <span>Excel</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <VisitsTable 
            visits={filteredVisits}
            onViewVisit={handleViewVisit}
            onDeleteVisit={handleDeleteVisit}
            onForwardVisit={handleForwardVisit}
          />
        </CardContent>
      </Card>
      
      {selectedVisit && (
        <>
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
                onUpdate={handleUpdateVisit}
              />
            </DialogContent>
          </Dialog>
          
          <Dialog open={openForwardDialog} onOpenChange={setOpenForwardDialog}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Ziyareti Yönlendir</DialogTitle>
                <DialogDescription>
                  Bu ziyaret kaydını yönlendirmek istediğiniz müdürlüğü seçin.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Select value={selectedDirectorate} onValueChange={setSelectedDirectorate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Müdürlük seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Müdürlükler</SelectLabel>
                      {directorates.map((directorate) => (
                        <SelectItem key={directorate.id} value={directorate.name}>
                          {directorate.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenForwardDialog(false)}>
                  İptal
                </Button>
                <Button onClick={handleConfirmForward}>
                  Yönlendir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Visits;
