import React, { Dispatch, FC, useContext } from "react";
import axios from "axios";
import VacanciesItem from "./VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
import HumanIcon from "./UI/HumanIcon";
import Loader from "./UI/Loader/Loader";
import { toogleFavorites } from "../utils/favorites";
import { findVacancy } from "../utils/vacancy";
import { IVacancy, IVacanciesData } from "../types/vacancy.interface";
import { IFilter } from "../types/filter.interface";
import { getVacancies } from "../services/vacanciesService";

type VacanciesListProps = {
  searchQuery: string;
  filter: IFilter;
  activePage: number;
  setTotalCount: Dispatch<React.SetStateAction<number>>;
  limit: number;
};

const VacanciesList: FC<VacanciesListProps> = ({
  searchQuery,
  filter,
  activePage,
  setTotalCount,
  limit,
}) => {
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [vacancies, setVacancies] = React.useState<IVacancy[]>([]);
  const [isVacanciesLoading, setIsVacanciesLoading] =
    React.useState<boolean>(true);
  const vacanciesFromAPI: IVacancy[] = [];

  React.useEffect(() => {
    async function fetchVacancies() {
      try {
        setIsVacanciesLoading(true);
        const data = await getVacancies(activePage, limit, searchQuery, filter);
        data.objects.map((object: IVacancy) => {
          vacanciesFromAPI.push({ ...object, isFavorite: false });
        });
        if (data.objects.length !== 0) {
          setTotalCount(data.total);
        }
        concatVacanciesAndStoredValue();
      } catch (error) {
        console.log(error);
      } finally {
        setIsVacanciesLoading(false);
      }
    }
    fetchVacancies();
  }, [activePage, filter, searchQuery]);

  function concatVacanciesAndStoredValue() {
    if (storedValue.length > 0) {
      const newVacancies = vacanciesFromAPI.map((vacancy) => {
        if (findVacancy(vacancy, storedValue) != undefined) {
          vacancy.isFavorite = true;
        }
        return vacancy;
      });
      setVacancies(newVacancies);
    } else {
      setVacancies(vacanciesFromAPI);
    }
  }

  // React.useMemo(() => {}, [filter, searchQuery]);

  if (isVacanciesLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (vacancies?.length === 0 && !isVacanciesLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center my-10">
        <HumanIcon />
        <h1 className="font-bold text-xl">Упс, здесь ещё ничего нет!</h1>
      </div>
    );
  }
  return (
    <>
      {vacancies?.length > 0 &&
        vacancies.map((vacancy) => (
          <VacanciesItem
            key={v4()}
            data-elem={`vacancy-${vacancy.id}`}
            vacancy={vacancy}
            toogleFavorites={() =>
              toogleFavorites(vacancy, storedValue, setValue)
            }
          />
        ))}
    </>
  );
};

export default VacanciesList;
