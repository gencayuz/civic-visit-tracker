import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginLogsTable from '@/components/reports/LoginLogsTable';
import { useAuth } from '@/contexts/AuthContext';

const Reports = () => {
  const { loginLogs } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Giriş Kayıtları</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginLogsTable logs={loginLogs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
