
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toast } from 'sonner';
import { directorates, Task, sampleTasks } from '@/types/directorate';
import { useAuth } from '@/contexts/AuthContext';

const Directorates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirectorate, setSelectedDirectorate] = useState<string | null>(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  
  const { user, isDirectorate, getCurrentDirectorate } = useAuth();
  
  // Get the current directorate name if the user is a directorate
  const currentDirectorate = getCurrentDirectorate();
  
  // Filter directorates based on search term and user role
  const filteredDirectorates = directorates.filter(directorate => {
    // First apply search filter
    const matchesSearch = directorate.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If user is a directorate, only show their own directorate
    if (isDirectorate()) {
      return matchesSearch && directorate.name === currentDirectorate;
    }
    
    // For admin and staff users, show all directorates that match the search
    return matchesSearch;
  });
  
  // Filter tasks for the current directorate
  const directorateTasks = tasks.filter(task => {
    // If user is a directorate, only show their tasks
    if (isDirectorate()) {
      return task.forwardedTo === currentDirectorate;
    }
    
    // For admin users, show all tasks or filtered by selected directorate
    return selectedDirectorate ? task.forwardedTo === selectedDirectorate : true;
  });
  
  const handleViewDetails = (directorate: string) => {
    setSelectedDirectorate(directorate);
    setOpenDetailsDialog(true);
  };
  
  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Tamamlandı' as const } : task
    ));
    
    toast.success('Görev başarıyla tamamlandı');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return <Badge className="bg-blue-100 text-blue-800">Beklemede</Badge>;
      case 'İşlemde':
        return <Badge className="bg-yellow-100 text-yellow-800">İşlemde</Badge>;
      case 'Tamamlandı':
        return <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isDirectorate() ? currentDirectorate : 'Müdürlükler'}
        </h1>
      </div>
      
      {/* Only show search if user is not a directorate */}
      {!isDirectorate() && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Müdürlük Ara</CardTitle>
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
                placeholder="Müdürlük ismine göre ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue={isDirectorate() ? "tasks" : "directorates"}>
        <TabsList>
          {!isDirectorate() && (
            <TabsTrigger value="directorates">Müdürlük Listesi</TabsTrigger>
          )}
          <TabsTrigger value="tasks">Yapılacak Görevler</TabsTrigger>
        </TabsList>
        
        {!isDirectorate() && (
          <TabsContent value="directorates" className="mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Müdürlük Adı</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDirectorates.length > 0 ? (
                      filteredDirectorates.map((directorate) => (
                        <TableRow key={directorate.id}>
                          <TableCell>{directorate.id}</TableCell>
                          <TableCell className="font-medium">{directorate.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(directorate.name)}
                            >
                              Detaylar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          Müdürlük bulunamadı.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="tasks" className="mt-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vatandaş</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {directorateTasks.length > 0 ? (
                    directorateTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell className="font-medium">{task.citizenName}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{format(task.date, 'd MMMM yyyy', { locale: tr })}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell className="text-right">
                          {task.status !== 'Tamamlandı' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              Tamamla
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Yapılacak görev bulunamadı.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedDirectorate && (
        <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Müdürlük Detayları</DialogTitle>
              <DialogDescription>
                Müdürlük bilgileri ve atanan görevler.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedDirectorate}</h3>
                <p className="text-muted-foreground text-sm">
                  Kullanıcı Adı: {selectedDirectorate}
                </p>
                <p className="text-muted-foreground text-sm">
                  Şifre: ********
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Atanan Görevler</h4>
                <div className="mt-2 space-y-2">
                  {tasks.filter(t => t.forwardedTo === selectedDirectorate).length > 0 ? (
                    tasks
                      .filter(t => t.forwardedTo === selectedDirectorate)
                      .map(task => (
                        <div key={task.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{task.citizenName}</span>
                            {getStatusBadge(task.status)}
                          </div>
                          <p className="text-sm mt-1">{task.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(task.date, 'dd MMMM yyyy', { locale: tr })}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Bu müdürlüğe atanmış görev bulunmamaktadır.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Directorates;
