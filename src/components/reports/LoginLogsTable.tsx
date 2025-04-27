
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { LoginLog } from '@/types/loginLog';

interface LoginLogsTableProps {
  logs: LoginLog[];
}

const LoginLogsTable: React.FC<LoginLogsTableProps> = ({ logs }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kullanıcı Adı</TableHead>
            <TableHead>Giriş Tarihi</TableHead>
            <TableHead>Giriş Saati</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.username}</TableCell>
              <TableCell>
                {format(new Date(log.loginDate), 'dd MMMM yyyy', { locale: tr })}
              </TableCell>
              <TableCell>
                {format(new Date(log.loginDate), 'HH:mm')}
              </TableCell>
              <TableCell>
                {log.role === 'admin' ? 'Yönetici' : 'Personel'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoginLogsTable;
