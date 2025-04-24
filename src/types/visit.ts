
export interface VisitType {
  id: number;
  citizenName: string;
  date: Date;
  reasonCategory: string;
  description: string;
  departmentId: string;
  status: string;
}

export interface Department {
  id: number;
  name: string;
}

export type VisitFormData = {
  citizenName: string;
  date: Date;
  time?: string;
  reasonCategory: string;
  description: string;
  departmentId: string;
  status: string;
};

export const departments: Department[] = [
  { id: 1, name: 'Housing' },
  { id: 2, name: 'Taxes' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Permits' },
  { id: 5, name: 'General Inquiries' },
];

export const visitReasons = [
  'Document Submission',
  'Information Request',
  'Service Registration',
  'Complaint Filing',
  'Permit Application',
  'Payment',
  'Consultation',
  'Other',
];
