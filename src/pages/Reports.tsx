import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { VisitType } from '@/types/visit';
import { EventType } from '@/types/event';
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText as FileWord, FileSpreadsheet as FileExcel } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Sample data for visits report
const visitReportData: VisitType[] = [
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
];

// Sample data for events report
const eventReportData: EventType[] = [
  {
    id: 1,
    requestorName: "Ahmet Yılmaz",
    activityName: "Açılış",
    address: "Karabük Belediyesi Nikah Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 15, 14, 30),
    attendees: ["Başkan Mehmet Özcan", "Başkan Yardımcısı İsmail Büyükvarlık"],
    additionalInfo: "Açılış kurdelesini başkan kesecek",
  },
  {
    id: 2,
    requestorName: "Fatma Kaya",
    activityName: "Toplantı",
    address: "Karabük Üniversitesi Konferans Salonu, Merkez/Karabük",
    date: new Date(2023, 5, 17, 10, 0),
    attendees: ["Başkan Yardımcısı Bilgin Atlı"],
    additionalInfo: "Üniversite yönetimi ile birlikte yapılacak",
  },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("visits");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter visit reports based on date and search term
  const filteredVisits = visitReportData.filter(visit => {
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

  // Filter event reports based on date and search term
  const filteredEvents = eventReportData.filter(event => {
    const matchesText = event.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedDate) {
      const eventDate = new Date(event.date);
      return matchesText && 
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear();
    }

    return matchesText;
  });

  // Export to Word
  const exportToWord = (type: 'visits' | 'events') => {
    const data = type === 'visits' ? filteredVisits : filteredEvents;
    const fileName = type === 'visits' ? 'ziyaret_raporu' : 'etkinlik_raporu';
    const title = type === 'visits' ? 'Vatandaş Ziyaretleri Raporu' : 'Etkinlikler Raporu';
    
    // Create a formatted HTML table for Word
    const header = type === 'visits' 
      ? '<tr><th>Vatandaş</th><th>Tarih</th><th>Kategori</th><th>Durum</th><th>Açıklama</th></tr>'
      : '<tr><th>Talep Eden</th><th>Etkinlik</th><th>Tarih</th><th>Adres</th><th>Katılımcılar</th></tr>';
    
    let rows = '';
    if (type === 'visits') {
      rows = filteredVisits.map(visit => `
        <tr>
          <td>${visit.citizenName}</td>
          <td>${format(visit.date, 'dd MMMM yyyy', { locale: tr })}</td>
          <td>${visit.reasonCategory}</td>
          <td>${visit.status}</td>
          <td>${visit.description}</td>
        </tr>
      `).join('');
    } else {
      rows = filteredEvents.map(event => `
        <tr>
          <td>${event.requestorName}</td>
          <td>${event.activityName}</td>
          <td>${format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}</td>
          <td>${event.address}</td>
          <td>${event.attendees.length} kişi</td>
        </tr>
      `).join('');
    }
    
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
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
    link.download = `${fileName}_${format(new Date(), 'yyyy-MM-dd')}.doc`;
    link.click();
    
    toast.success(`${title} Word formatında indirildi`);
  };
  
  // Export to Excel
  const exportToExcel = (type: 'visits' | 'events') => {
    const data = type === 'visits' ? filteredVisits : filteredEvents;
    const fileName = type === 'visits' ? 'ziyaret_raporu' : 'etkinlik_raporu';
    const title = type === 'visits' ? 'Vatandaş Ziyaretleri Raporu' : 'Etkinlikler Raporu';
    
    // Create a formatted CSV for Excel
    const header = type === 'visits' 
      ? 'Vatandaş,Tarih,Kategori,Durum,Açıklama\n'
      : 'Talep Eden,Etkinlik,Tarih,Adres,Katılımcılar\n';
    
    let rows = '';
    if (type === 'visits') {
      rows = filteredVisits.map(visit => `"${visit.citizenName}","${format(visit.date, 'dd MMMM yyyy', { locale: tr })}","${visit.reasonCategory}","${visit.status}","${visit.description}"`).join('\n');
    } else {
      rows = filteredEvents.map(event => `"${event.requestorName}","${event.activityName}","${format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}","${event.address}","${event.attendees.length} kişi"`).join('\n');
    }
    
    const csv = `${header}${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    
    toast.success(`${title} Excel formatında indirildi`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Rapor Filtreleri</CardTitle>
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
                placeholder="Arama yapın..."
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visits">Ziyaret Raporları</TabsTrigger>
          <TabsTrigger value="events">Etkinlik Raporları</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visits" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vatandaş Ziyaretleri Raporu</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportToWord('visits')}
                  className="flex items-center gap-1"
                >
                  <FileWord className="h-4 w-4" />
                  <span>Word</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportToExcel('visits')}
                  className="flex items-center gap-1"
                >
                  <FileExcel className="h-4 w-4" />
                  <span>Excel</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vatandaş</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Açıklama</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisits.length > 0 ? (
                    filteredVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.citizenName}</TableCell>
                        <TableCell>{format(visit.date, 'dd MMMM yyyy', { locale: tr })}</TableCell>
                        <TableCell>{visit.reasonCategory}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.status === 'Tamamlandı' 
                              ? 'bg-green-100 text-green-800' 
                              : visit.status === 'Açık' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {visit.status}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-md truncate">{visit.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Arama kriterlerine uygun ziyaret kaydı bulunamadı.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Etkinlikler Raporu</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportToWord('events')}
                  className="flex items-center gap-1"
                >
                  <FileWord className="h-4 w-4" />
                  <span>Word</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportToExcel('events')}
                  className="flex items-center gap-1"
                >
                  <FileExcel className="h-4 w-4" />
                  <span>Excel</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Talep Eden</TableHead>
                    <TableHead>Etkinlik</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Katılımcılar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.requestorName}</TableCell>
                        <TableCell>{event.activityName}</TableCell>
                        <TableCell>
                          {format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}
                        </TableCell>
                        <TableCell className="max-w-md truncate">{event.address}</TableCell>
                        <TableCell>{event.attendees.length} kişi</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Arama kriterlerine uygun etkinlik bulunamadı.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
