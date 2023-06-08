export interface IVacancy {
  id: number;
  payment_from: number;
  payment_to: number;
  profession: string;
  currency: string;
  town: { title: string };
  type_of_work: { title: string };
  isFavorite: boolean;
  vacancyRichText: string;
}

export interface IVacanciesData {
  objects: IVacancy[];
  total: number;
}
