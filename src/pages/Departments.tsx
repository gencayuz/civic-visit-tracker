
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { departments } from '@/types/visit';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock department statistics data
const departmentStats = [
  { 
    id: 1, 
    activeVisits: 12,
    resolvedVisits: 28,
    totalVisits: 40
  },
  { 
    id: 2, 
    activeVisits: 8,
    resolvedVisits: 32,
    totalVisits: 40
  },
  { 
    id: 3, 
    activeVisits: 5,
    resolvedVisits: 15,
    totalVisits: 20
  },
  { 
    id: 4, 
    activeVisits: 15,
    resolvedVisits: 10,
    totalVisits: 25
  },
  { 
    id: 5, 
    activeVisits: 3,
    resolvedVisits: 17,
    totalVisits: 20
  },
];

const getDepartmentStats = (departmentId: number) => {
  return departmentStats.find(stat => stat.id === departmentId) || {
    activeVisits: 0,
    resolvedVisits: 0,
    totalVisits: 0
  };
};

const Departments: React.FC = () => {
  const { isAdmin } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewDetails = (departmentId: number) => {
    setSelectedDepartment(departmentId);
    setOpenDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departmanlar</h1>
          <p className="text-muted-foreground">Departmanları yönetin ve iş yüklerini görüntüleyin.</p>
        </div>
        {isAdmin() && <Button>Departman Ekle</Button>}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => {
          const stats = getDepartmentStats(department.id);
          return (
            <Card key={department.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{department.name}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {stats.activeVisits} aktif
                  </Badge>
                </div>
                <CardDescription className="mt-2">
                  {department.name} departmanına ait ziyaret ve işlem kayıtları
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tamamlanma oranı</span>
                    <span className="font-medium">
                      {Math.round((stats.resolvedVisits / stats.totalVisits) * 100 || 0)}%
                    </span>
                  </div>
                  <Progress
                    value={(stats.resolvedVisits / stats.totalVisits) * 100 || 0}
                    className="h-2"
                  />
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Toplam ziyaret: {stats.totalVisits}</span>
                    <span>Tamamlanan: {stats.resolvedVisits}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewDetails(department.id)}
                >
                  Detayları Görüntüle
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDepartment && departments.find(d => d.id === selectedDepartment)?.name} Detayları
            </DialogTitle>
            <DialogDescription>
              Bu departman ile ilgili ziyaret detayları ve istatistikler.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedDepartment && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Toplam Ziyaret</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {getDepartmentStats(selectedDepartment).totalVisits}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {getDepartmentStats(selectedDepartment).activeVisits}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Tamamlanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {getDepartmentStats(selectedDepartment).resolvedVisits}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ziyaretçi Adı</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Durum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Ali Yılmaz</TableCell>
                      <TableCell>10.04.2023</TableCell>
                      <TableCell>Tamamlandı</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ayşe Demir</TableCell>
                      <TableCell>11.04.2023</TableCell>
                      <TableCell>Aktif</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mehmet Öz</TableCell>
                      <TableCell>12.04.2023</TableCell>
                      <TableCell>Aktif</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;
