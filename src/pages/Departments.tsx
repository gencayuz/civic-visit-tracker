
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { departments } from '@/types/visit';
import { useAuth } from '@/contexts/AuthContext';

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
                <Button variant="ghost" size="sm" className="w-full">
                  Detayları Görüntüle
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Departments;
