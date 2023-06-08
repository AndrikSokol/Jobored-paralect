import { IVacancy } from "../types/vacancy.interface";

export function toogleFavorites(
  vacancy: IVacancy,
  storedValue: IVacancy[],
  setValue: (value: IVacancy[]) => void
): void {
  if (vacancy.isFavorite) {
    setValue([...storedValue, vacancy]);
  } else {
    setValue(storedValue.filter((value: IVacancy) => value.id !== vacancy.id));
  }
}
