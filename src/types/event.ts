
export interface EventType {
  id: number;
  requestorName: string;
  companyName?: string;
  phoneNumber?: string;
  activityName: string;
  address: string;
  date: Date;
  attendees: string[];
  additionalInfo: string;
}

export type EventFormData = {
  requestorName: string;
  companyName?: string;
  phoneNumber?: string;
  activityName: string;
  address: string;
  date: Date;
  time?: string;
  attendees: string[];
  additionalInfo: string;
};

export const defaultAttendees = [
  "Başkan Mehmet Özcan",
  "Başkan Yardımcısı İsmail Büyükvarlık",
  "Başkan Yardımcısı Bilgin Atlı",
  "Diğer"
];

export const activityTypes = [
  'Açılış',
  'Toplantı',
  'Ziyaret',
  'Konferans',
  'Festival',
  'Sergi',
  'Diğer'
];
