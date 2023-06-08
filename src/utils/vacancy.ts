import { IVacancy } from "../types/vacancy.interface";

export const findVacancy = (
  vacancy: IVacancy,
  storedValue: IVacancy[]
): IVacancy | undefined => {
  return storedValue.find(
    (vl) => vacancy.id === vl.id && vacancy.profession === vl.profession
  );
};
