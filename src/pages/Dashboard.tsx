
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Ziyaret verileri
const visitStats = [
  { name: 'Pzt', visits: 24 },
  { name: 'Sal', visits: 18 },
  { name: 'Çar', visits: 32 },
  { name: 'Per', visits: 20 },
  { name: 'Cum', visits: 28 },
  { name: 'Cmt', visits: 12 },
  { name: 'Paz', visits: 5 },
];

const departmentData = [
  { name: 'İskan', value: 35 },
  { name: 'Vergi', value: 25 },
  { name: 'Su ve Kanalizasyon', value: 20 },
  { name: 'İmar ve Ruhsat', value: 15 },
  { name: 'Diğer', value: 5 },
];

// Etkinlik verileri
const upcomingEvents = [
  { name: 'Pzt', events: 3 },
  { name: 'Sal', events: 1 },
  { name: 'Çar', events: 2 },
  { name: 'Per', events: 4 },
  { name: 'Cum', events: 3 },
  { name: 'Cmt', events: 5 },
  { name: 'Paz', events: 2 },
];

const eventTypeData = [
  { name: 'Açılış', value: 8 },
  { name: 'Toplantı', value: 12 },
  { name: 'Ziyaret', value: 5 },
  { name: 'Konferans', value: 3 },
  { name: 'Festival', value: 2 },
];

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Ziyaret istatistikleri
  const totalVisits = visitStats.reduce((sum, day) => sum + day.visits, 0);
  const averageVisitsPerDay = Math.round(totalVisits / visitStats.length);
  const mostVisitedDepartment = departmentData.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  ).name;
  
  // Etkinlik istatistikleri
  const totalEvents = upcomingEvents.reduce((sum, day) => sum + day.events, 0);
  const averageEventsPerDay = Math.round(totalEvents / upcomingEvents.length);
  const mostCommonEventType = eventTypeData.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  ).name;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hoşgeldiniz, {user?.username}!</h1>
        <p className="text-muted-foreground">İşte vatandaş ziyaretleri ve etkinlik aktivitelerinin genel görünümü.</p>
      </div>

      <Tabs defaultValue="visits" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="visits">Ziyaretler</TabsTrigger>
          <TabsTrigger value="events">Etkinlikler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visits" className="space-y-6 mt-6">
          {/* Ziyaret istatistik kartları */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Ziyaret</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalVisits}</div>
                <p className="text-xs text-muted-foreground mt-1">Bu hafta</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Günlük Ortalama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageVisitsPerDay}</div>
                <p className="text-xs text-muted-foreground mt-1">Ziyaret / gün</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Açık Vakalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-xs text-muted-foreground mt-1">Çözüm bekleniyor</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">En Çok Ziyaret</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mostVisitedDepartment}</div>
                <p className="text-xs text-muted-foreground mt-1">Departmanı</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Ziyaret grafikleri */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Günlük Ziyaretler</CardTitle>
                <CardDescription>Günlere göre vatandaş ziyaret sayısı</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitStats} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        formatter={(value) => [`${value} ziyaret`]}
                      />
                      <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Departman Dağılımı</CardTitle>
                <CardDescription>Departmanlara göre ziyaretler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} ziyaret`]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6 mt-6">
          {/* Etkinlik istatistik kartları */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Etkinlik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalEvents}</div>
                <p className="text-xs text-muted-foreground mt-1">Bu hafta</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Günlük Ortalama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageEventsPerDay}</div>
                <p className="text-xs text-muted-foreground mt-1">Etkinlik / gün</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Bugünkü Etkinlikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">Planlanmış etkinlik</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">En Sık Etkinlik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mostCommonEventType}</div>
                <p className="text-xs text-muted-foreground mt-1">Türü</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Etkinlik grafikleri */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Günlük Etkinlikler</CardTitle>
                <CardDescription>Günlere göre etkinlik sayısı</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={upcomingEvents} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        formatter={(value) => [`${value} etkinlik`]}
                      />
                      <Bar dataKey="events" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Etkinlik Türleri</CardTitle>
                <CardDescription>Etkinlik türlerine göre dağılım</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} etkinlik`]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
