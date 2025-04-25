
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Ziyaret verisi
const monthlyVisitData = [
  { month: 'Oca', visits: 65, resolved: 52 },
  { month: 'Şub', visits: 72, resolved: 65 },
  { month: 'Mar', visits: 80, resolved: 76 },
  { month: 'Nis', visits: 95, resolved: 80 },
  { month: 'May', visits: 105, resolved: 90 },
  { month: 'Haz', visits: 92, resolved: 85 },
];

const departmentPerformance = [
  { department: 'İskan', resolved: 87, pending: 13, averageTime: '2.3 gün' },
  { department: 'Vergi', resolved: 92, pending: 8, averageTime: '1.8 gün' },
  { department: 'Su ve Kanalizasyon', resolved: 78, pending: 22, averageTime: '3.1 gün' },
  { department: 'İmar ve Ruhsat', resolved: 65, pending: 35, averageTime: '4.7 gün' },
  { department: 'Genel Başvuru', resolved: 95, pending: 5, averageTime: '1.2 gün' },
];

// Etkinlik verisi
const monthlyEventData = [
  { month: 'Oca', events: 4, attendees: 12 },
  { month: 'Şub', events: 6, attendees: 18 },
  { month: 'Mar', events: 8, attendees: 24 },
  { month: 'Nis', events: 12, attendees: 30 },
  { month: 'May', events: 7, attendees: 22 },
  { month: 'Haz', events: 10, attendees: 26 },
];

const eventTypesData = [
  { name: 'Açılış', value: 35 },
  { name: 'Toplantı', value: 25 },
  { name: 'Ziyaret', value: 20 },
  { name: 'Konferans', value: 12 },
  { name: 'Festival', value: 8 },
];

const attendeeStats = [
  { name: 'Başkan Mehmet Özcan', attended: 32 },
  { name: 'Başkan Yardımcısı İsmail Büyükvarlık', attended: 24 },
  { name: 'Başkan Yardımcısı Bilgin Atlı', attended: 18 },
];

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#06b6d4', '#67e8f9'];

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('visits');
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
        <p className="text-muted-foreground">
          Ziyaretler ve etkinlikler ile ilgili raporları görüntüleyin.
        </p>
      </div>
      
      <Tabs defaultValue="visits" onValueChange={setReportType} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="visits">Ziyaret Raporları</TabsTrigger>
          <TabsTrigger value="events">Etkinlik Raporları</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapor Parametreleri</CardTitle>
              <CardDescription>
                Rapor türünü ve tarih aralığını seçin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="report-type" className="block text-sm font-medium mb-2">
                    Rapor Türü
                  </label>
                  <Select value={reportType === "visits" ? "monthly" : "eventTypes"} 
                          onValueChange={(val) => setReportType(reportType === "visits" ? val : "events-" + val)}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Rapor türünü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {reportType === "visits" ? (
                          <>
                            <SelectItem value="monthly">Aylık Genel Bakış</SelectItem>
                            <SelectItem value="department">Departman Performansı</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="eventTypes">Etkinlik Türleri</SelectItem>
                            <SelectItem value="attendance">Katılım İstatistikleri</SelectItem>
                            <SelectItem value="monthly">Aylık Etkinlikler</SelectItem>
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Tarihi</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        {dateRange.from ? (
                          format(dateRange.from, "dd.MM.yyyy")
                        ) : (
                          <span>Bir tarih seçin</span>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-auto h-4 w-4 opacity-50"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <line x1="3" x2="21" y1="9" y2="9"></line>
                          <line x1="9" x2="9" y1="21" y2="9"></line>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Tarihi</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.to && "text-muted-foreground"
                        )}
                      >
                        {dateRange.to ? (
                          format(dateRange.to, "dd.MM.yyyy")
                        ) : (
                          <span>Bir tarih seçin</span>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-auto h-4 w-4 opacity-50"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <line x1="3" x2="21" y1="9" y2="9"></line>
                          <line x1="9" x2="9" y1="21" y2="9"></line>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button>Rapor Oluştur</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <TabsContent value="visits" className="space-y-6 mt-6">
          {reportType === 'monthly' && (
            <Card>
              <CardHeader>
                <CardTitle>Aylık Ziyaret Genel Bakışı</CardTitle>
                <CardDescription>
                  Toplam ziyaretler ve çözümlenen vakalar (aylık)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyVisitData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        formatter={(value, name) => [value, name === 'visits' ? 'Ziyaretler' : 'Çözümlenenler']}
                      />
                      <Legend formatter={(value) => (value === 'visits' ? 'Ziyaretler' : 'Çözümlenenler')} />
                      <Line 
                        type="monotone" 
                        dataKey="visits" 
                        stroke="#8b5cf6" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                        name="Ziyaretler"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Çözümlenenler"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
          
          {reportType === 'department' && (
            <Card>
              <CardHeader>
                <CardTitle>Departman Performansı</CardTitle>
                <CardDescription>
                  Departmanlara göre çözüm oranı ve ortalama yanıt süresi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departman</TableHead>
                      <TableHead>Çözüm Oranı</TableHead>
                      <TableHead>Bekleyen Vakalar</TableHead>
                      <TableHead>Ort. Çözüm Süresi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentPerformance.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.resolved}%</TableCell>
                        <TableCell>{dept.pending}%</TableCell>
                        <TableCell>{dept.averageTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          {reportType === 'events-eventTypes' && (
            <Card>
              <CardHeader>
                <CardTitle>Etkinlik Türleri Dağılımı</CardTitle>
                <CardDescription>
                  Etkinliklerin türlerine göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {eventTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} etkinlik`, 'Toplam']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {reportType === 'events-attendance' && (
            <Card>
              <CardHeader>
                <CardTitle>Katılım İstatistikleri</CardTitle>
                <CardDescription>
                  Kişilere göre etkinlik katılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendeeStats}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{fontSize: 12}}
                        width={150}
                      />
                      <Tooltip formatter={(value) => [`${value} etkinlik`, 'Katılım']} />
                      <Legend formatter={() => 'Etkinlik Sayısı'} />
                      <Bar 
                        dataKey="attended" 
                        fill="#8b5cf6"
                        name="Katıldığı Etkinlikler"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {reportType === 'events-monthly' && (
            <Card>
              <CardHeader>
                <CardTitle>Aylık Etkinlik Analizi</CardTitle>
                <CardDescription>
                  Aylık etkinlik sayısı ve katılımcı sayısı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyEventData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value, name) => [value, name === 'events' ? 'Etkinlikler' : 'Katılımcılar']}
                      />
                      <Legend formatter={(value) => (value === 'events' ? 'Etkinlik Sayısı' : 'Katılımcı Sayısı')} />
                      <Bar 
                        yAxisId="left" 
                        dataKey="events" 
                        fill="#8b5cf6" 
                        name="Etkinlikler" 
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="attendees" 
                        fill="#06b6d4" 
                        name="Katılımcılar" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
