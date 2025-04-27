
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { VisitType } from '@/types/visit';
import { EventType } from '@/types/event';

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visits">Ziyaret Raporları</TabsTrigger>
          <TabsTrigger value="events">Etkinlik Raporları</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visits" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vatandaş Ziyaretleri Raporu</CardTitle>
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
                  {visitReportData.map((visit) => (
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Etkinlikler Raporu</CardTitle>
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
                  {eventReportData.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.requestorName}</TableCell>
                      <TableCell>{event.activityName}</TableCell>
                      <TableCell>
                        {format(event.date, 'dd MMMM yyyy HH:mm', { locale: tr })}
                      </TableCell>
                      <TableCell className="max-w-md truncate">{event.address}</TableCell>
                      <TableCell>{event.attendees.length} kişi</TableCell>
                    </TableRow>
                  ))}
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
