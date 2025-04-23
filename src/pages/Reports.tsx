
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for reports
const monthlyData = [
  { month: 'Jan', visits: 65, resolved: 52 },
  { month: 'Feb', visits: 72, resolved: 65 },
  { month: 'Mar', visits: 80, resolved: 76 },
  { month: 'Apr', visits: 95, resolved: 80 },
  { month: 'May', visits: 105, resolved: 90 },
  { month: 'Jun', visits: 92, resolved: 85 },
];

const departmentPerformance = [
  { department: 'Housing', resolved: 87, pending: 13, averageTime: '2.3 days' },
  { department: 'Taxes', resolved: 92, pending: 8, averageTime: '1.8 days' },
  { department: 'Utilities', resolved: 78, pending: 22, averageTime: '3.1 days' },
  { department: 'Permits', resolved: 65, pending: 35, averageTime: '4.7 days' },
  { department: 'General Inquiries', resolved: 95, pending: 5, averageTime: '1.2 days' },
];

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view reports on citizen visits and department performance.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Parameters</CardTitle>
          <CardDescription>
            Select the type of report and date range to generate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="report-type" className="block text-sm font-medium mb-2">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="monthly">Monthly Overview</SelectItem>
                    <SelectItem value="department">Department Performance</SelectItem>
                    <SelectItem value="visits">Visit Analysis</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
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
                      format(dateRange.from, "PPP")
                    ) : (
                      <span>Pick a date</span>
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
              <label className="block text-sm font-medium mb-2">End Date</label>
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
                      format(dateRange.to, "PPP")
                    ) : (
                      <span>Pick a date</span>
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
            <Button>Generate Report</Button>
          </div>
        </CardContent>
      </Card>
      
      {reportType === 'monthly' && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Visit Overview</CardTitle>
            <CardDescription>
              Total visits and resolved cases by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#8b5cf6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#10b981" 
                    strokeWidth={2}
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
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Resolution rate and average response time by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Resolution Rate</TableHead>
                  <TableHead>Pending Cases</TableHead>
                  <TableHead>Avg. Resolution Time</TableHead>
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
      
      {reportType === 'visits' && (
        <Card>
          <CardHeader>
            <CardTitle>Visit Analysis</CardTitle>
            <CardDescription>
              Breakdown of visits by reason category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Select date range and generate report to view visit analysis data.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;
