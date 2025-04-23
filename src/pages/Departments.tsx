
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock department data
const departmentsData = [
  { 
    id: 1, 
    name: 'Housing', 
    description: 'Handles housing permits, registrations, and related inquiries.',
    activeVisits: 12,
    resolvedVisits: 28,
    totalVisits: 40
  },
  { 
    id: 2, 
    name: 'Taxes', 
    description: 'Manages tax payments, exemptions, and property assessments.',
    activeVisits: 8,
    resolvedVisits: 32,
    totalVisits: 40
  },
  { 
    id: 3, 
    name: 'Utilities', 
    description: 'Oversees water, electricity, and waste management services.',
    activeVisits: 5,
    resolvedVisits: 15,
    totalVisits: 20
  },
  { 
    id: 4, 
    name: 'Permits', 
    description: 'Processes building permits, business licenses, and other municipal permits.',
    activeVisits: 15,
    resolvedVisits: 10,
    totalVisits: 25
  },
  { 
    id: 5, 
    name: 'General Inquiries', 
    description: 'Handles general questions and directs citizens to appropriate departments.',
    activeVisits: 3,
    resolvedVisits: 17,
    totalVisits: 20
  },
];

const Departments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">Manage departments and view their current workloads.</p>
        </div>
        <Button>Add Department</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departmentsData.map((department) => (
          <Card key={department.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{department.name}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {department.activeVisits} active
                </Badge>
              </div>
              <CardDescription className="mt-2">{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Resolved rate</span>
                  <span className="font-medium">
                    {Math.round((department.resolvedVisits / department.totalVisits) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(department.resolvedVisits / department.totalVisits) * 100}
                  className="h-2"
                />
              </div>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span>Total visits: {department.totalVisits}</span>
                  <span>Resolved: {department.resolvedVisits}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
