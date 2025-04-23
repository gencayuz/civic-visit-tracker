import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VisitType {
  id: number;
  citizenName: string;
  date: Date;
  reasonCategory: string;
  description: string;
  departmentId: string;
  status: string;
}

const departments = [
  { id: 1, name: 'Housing' },
  { id: 2, name: 'Taxes' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Permits' },
  { id: 5, name: 'General Inquiries' },
];

const visitReasons = [
  'Document Submission',
  'Information Request',
  'Service Registration',
  'Complaint Filing',
  'Permit Application',
  'Payment',
  'Consultation',
  'Other',
];

const formSchema = z.object({
  citizenName: z.string().min(2, { message: 'Citizen name is required' }),
  date: z.date({ required_error: 'Visit date is required' }),
  reasonCategory: z.string({ required_error: 'Please select a reason category' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  departmentId: z.string({ required_error: 'Please select a department' }),
  status: z.string().default('Open'),
});

const initialVisits: VisitType[] = [
  {
    id: 1,
    citizenName: 'John Smith',
    date: new Date(2023, 3, 15),
    reasonCategory: 'Document Submission',
    description: 'Submitted building permit documents',
    departmentId: '4',
    status: 'Resolved',
  },
  {
    id: 2,
    citizenName: 'Maria Garcia',
    date: new Date(2023, 3, 16),
    reasonCategory: 'Information Request',
    description: 'Inquired about property tax exemptions',
    departmentId: '2',
    status: 'In Progress',
  },
  {
    id: 3,
    citizenName: 'Ahmed Hassan',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Service Registration',
    description: 'Registered for water utility service',
    departmentId: '3',
    status: 'Open',
  },
  {
    id: 4,
    citizenName: 'Emily Chen',
    date: new Date(2023, 3, 17),
    reasonCategory: 'Complaint Filing',
    description: 'Filed noise complaint regarding construction',
    departmentId: '1',
    status: 'In Progress',
  },
  {
    id: 5,
    citizenName: 'Robert Johnson',
    date: new Date(2023, 3, 18),
    reasonCategory: 'Payment',
    description: 'Made payment for property taxes',
    departmentId: '2',
    status: 'Resolved',
  },
];

const Visits: React.FC = () => {
  const [visits, setVisits] = useState<VisitType[]>(initialVisits);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<VisitType | null>(null);

  const form = useForm<VisitFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenName: '',
      reasonCategory: '',
      description: '',
      departmentId: '',
      status: 'Open',
    },
  });
  
  const filteredVisits = visits.filter(visit => 
    visit.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.reasonCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    departments.find(d => d.id.toString() === visit.departmentId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewVisit = (visit: VisitType) => {
    setSelectedVisit(visit);
    setOpenViewDialog(true);
  };

  const handleAddVisit = (data: VisitFormData) => {
    const newVisit: VisitType = {
      id: visits.length + 1,
      citizenName: data.citizenName,
      date: data.date,
      reasonCategory: data.reasonCategory,
      description: data.description,
      departmentId: data.departmentId,
      status: data.status,
    };
    
    setVisits([...visits, newVisit]);
    setOpenAddDialog(false);
    form.reset();
    toast.success('Visit record created successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Visit Management</h1>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>Record New Visit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Record New Citizen Visit</DialogTitle>
              <DialogDescription>
                Enter the details of the citizen visit. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddVisit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="citizenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Citizen Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter citizen's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Visit Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
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
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reasonCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {visitReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter detailed description of the visit"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign to Department</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {departments.map((department) => (
                              <SelectItem key={department.id} value={department.id.toString()}>
                                {department.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpenAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Visit Record</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search Visits</CardTitle>
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
              placeholder="Search visits by name, description, reason..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Citizen Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium">{visit.citizenName}</TableCell>
                    <TableCell>{format(visit.date, 'MMM d, yyyy')}</TableCell>
                    <TableCell>{visit.reasonCategory}</TableCell>
                    <TableCell>
                      {departments.find(d => d.id.toString() === visit.departmentId)?.name}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(visit.status)}>
                        {visit.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewVisit(visit)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No visits found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedVisit && (
        <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Visit Details</DialogTitle>
              <DialogDescription>
                Details of the citizen visit record.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Citizen</h4>
                  <p className="text-sm">{selectedVisit.citizenName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p className="text-sm">{format(selectedVisit.date, 'PPP')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Reason</h4>
                  <p className="text-sm">{selectedVisit.reasonCategory}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Department</h4>
                  <p className="text-sm">
                    {departments.find(d => d.id.toString() === selectedVisit.departmentId)?.name}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Status</h4>
                <Badge className={getStatusColor(selectedVisit.status)}>
                  {selectedVisit.status}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm whitespace-pre-line">{selectedVisit.description}</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenViewDialog(false)}>
                Close
              </Button>
              <Button>Update Status</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Visits;
