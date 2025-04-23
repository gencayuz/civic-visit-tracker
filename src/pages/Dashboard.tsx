
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data for dashboard statistics
const visitStats = [
  { name: 'Mon', visits: 24 },
  { name: 'Tue', visits: 18 },
  { name: 'Wed', visits: 32 },
  { name: 'Thu', visits: 20 },
  { name: 'Fri', visits: 28 },
  { name: 'Sat', visits: 12 },
  { name: 'Sun', visits: 5 },
];

const departmentData = [
  { name: 'Housing', value: 35 },
  { name: 'Taxes', value: 25 },
  { name: 'Utilities', value: 20 },
  { name: 'Permits', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Generate some stats based on mock data
  const totalVisits = visitStats.reduce((sum, day) => sum + day.visits, 0);
  const averageVisitsPerDay = Math.round(totalVisits / visitStats.length);
  const mostVisitedDepartment = departmentData.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  ).name;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.username}!</h1>
        <p className="text-muted-foreground">Here's an overview of citizen visit activity.</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Daily Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageVisitsPerDay}</div>
            <p className="text-xs text-muted-foreground mt-1">Per day this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting resolution</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Visited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mostVisitedDepartment}</div>
            <p className="text-xs text-muted-foreground mt-1">Department</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Visits</CardTitle>
            <CardDescription>Number of citizen visits per day</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitStats} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                  <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Visits by department</CardDescription>
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
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
