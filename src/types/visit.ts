
export interface VisitType {
  id: number;
  citizenName: string;
  date: Date;
  reasonCategory: string;
  description: string;
  departmentId: string;
  status: string;
  forwardedTo?: string;
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
  { id: 1, name: 'İskan' },
  { id: 2, name: 'Vergi' },
  { id: 3, name: 'Su ve Kanalizasyon' },
  { id: 4, name: 'İmar ve Ruhsat' },
  { id: 5, name: 'Genel Başvuru' },
];

export const visitReasons = [
  'Evrak Teslimi',
  'Bilgi Talebi',
  'Hizmet Kaydı',
  'Şikayet',
  'Ruhsat Başvurusu',
  'Ödeme',
  'Danışma',
  'Diğer',
];

export const visitStatuses = [
  'Açık',
  'İşlemde',
  'Tamamlandı',
  'İptal Edildi',
  'Gelmedi'
] as const;

export type VisitStatus = typeof visitStatuses[number];
