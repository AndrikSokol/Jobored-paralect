import { instance } from "../api/api";
import { IFilter } from "../types/filter.interface";
import { IVacanciesData, IVacancy } from "../types/vacancy.interface";

export const getVacancies = async (
  activePage: number,
  limit: number,
  searchQuery: string,
  filter: IFilter
): Promise<IVacanciesData> => {
  const { data } = await instance.get<IVacanciesData>("vacancies/", {
    params: {
      published: 1,
      page: activePage,
      count: limit,
      keyword: searchQuery,
      payment_from: filter?.payment_from,
      payment_to: filter?.payment_to,
      catalogues: filter?.industry,
    },
  });
  return data;
};

export const getVacancy = async (id: string | undefined): Promise<IVacancy> => {
  const { data } = await instance.get<IVacancy>("vacancies/" + id);
  return data;
};
