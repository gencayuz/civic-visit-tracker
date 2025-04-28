
export interface DirectorateType {
  id: number;
  name: string;
  username: string;
  password: string;
}

export type Task = {
  id: number;
  visitId: number;
  citizenName: string;
  description: string;
  date: Date;
  status: 'Beklemede' | 'İşlemde' | 'Tamamlandı';
};

export const directorates: DirectorateType[] = [
  { id: 1, name: 'Afet İşleri Müdürlüğü', username: 'Afet İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 2, name: 'Bilgi İşlem Müdürlüğü', username: 'Bilgi İşlem Müdürlüğü', password: 'Belediye22' },
  { id: 3, name: 'Destek Hizmetleri Müdürlüğü', username: 'Destek Hizmetleri Müdürlüğü', password: 'Belediye22' },
  { id: 4, name: 'Emlak İstimlak Müdürlüğü', username: 'Emlak İstimlak Müdürlüğü', password: 'Belediye22' },
  { id: 5, name: 'Fen İşleri Müdürlüğü', username: 'Fen İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 6, name: 'Hukuk İşleri Müdürlüğü', username: 'Hukuk İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 7, name: 'İklim Değişikliği Sıfır Atık Müdürlüğü', username: 'İklim Değişikliği Sıfır Atık Müdürlüğü', password: 'Belediye22' },
  { id: 8, name: 'İmar ve Şehircilik Müdürlüğü', username: 'İmar ve Şehircilik Müdürlüğü', password: 'Belediye22' },
  { id: 9, name: 'İnsan Kaynakları ve Eğitim Müdürlüğü', username: 'İnsan Kaynakları ve Eğitim Müdürlüğü', password: 'Belediye22' },
  { id: 10, name: 'İtfaiye Müdürlüğü', username: 'İtfaiye Müdürlüğü', password: 'Belediye22' },
  { id: 11, name: 'Kültür ve Sosyal İşler Müdürlüğü', username: 'Kültür ve Sosyal İşler Müdürlüğü', password: 'Belediye22' },
  { id: 12, name: 'Makine İkmal Bakım ve Onarım Müdürlüğü', username: 'Makine İkmal Bakım ve Onarım Müdürlüğü', password: 'Belediye22' },
  { id: 13, name: 'Mali Hizmetler Müdürlüğü', username: 'Mali Hizmetler Müdürlüğü', password: 'Belediye22' },
  { id: 14, name: 'Park Bahçeler Müdürlüğü', username: 'Park Bahçeler Müdürlüğü', password: 'Belediye22' },
  { id: 15, name: 'Sosyal Destek Hizmetleri Müdürlüğü', username: 'Sosyal Destek Hizmetleri Müdürlüğü', password: 'Belediye22' },
  { id: 16, name: 'Su ve Kanalizasyon Müdürlüğü', username: 'Su ve Kanalizasyon Müdürlüğü', password: 'Belediye22' },
  { id: 17, name: 'Temizlik İşleri Müdürlüğü', username: 'Temizlik İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 18, name: 'Veteriner İşleri Müdürlüğü', username: 'Veteriner İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 19, name: 'Yazı İşleri Müdürlüğü', username: 'Yazı İşleri Müdürlüğü', password: 'Belediye22' },
  { id: 20, name: 'Zabıta Müdürlüğü', username: 'Zabıta Müdürlüğü', password: 'Belediye22' }
];

// Sample tasks for testing
export const sampleTasks: Task[] = [
  {
    id: 1,
    visitId: 2,
    citizenName: 'Ayşe Kaya',
    description: 'Su faturası ödemesinde sorun yaşadı',
    date: new Date(2023, 3, 16),
    status: 'Beklemede'
  },
  {
    id: 2,
    visitId: 3,
    citizenName: 'Mehmet Demir',
    description: 'İnşaat ruhsatı talebi',
    date: new Date(2023, 3, 17),
    status: 'İşlemde'
  }
];
