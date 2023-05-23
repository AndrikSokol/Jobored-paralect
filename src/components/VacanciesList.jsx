import React from "react";
import axios from "axios";
import VacanciesItem from "./VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
const VacanciesList = ({
  searchQuery,
  findTotalPage,
  filter,
  filterVacancies,
}) => {
  const { setValue, storedValue } = useLocalStorage("favorite", "");
  const [vacancies, setVacancies] = React.useState([]);

  React.useEffect(() => {
    findTotalPage(vacancies);
  }, [vacancies.length]);

  React.useEffect(() => {
    setVacancies(filterVacancies);
  }, [filterVacancies]);

  if (storedValue.length > 0) {
  }
  React.useEffect(() => {
    const vac = [...vacancies, ...storedValue];

    vac.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.id === value.id && t.profession === value.profession
        )
    );
    setVacancies(vac);
  }, [storedValue]);
  console.log(vacancies);
  if (vacancies.length == 0) {
    async function fetchVacancies() {
      try {
        const { data } = await axios.get(
          "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/",
          {
            headers: {
              "x-secret-key": " GEU4nvd3rej*jeh.eqp",
              "X-Api-App-Id":
                "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
            },
          }
        );

        data.objects.map((object) => {
          setVacancies((prev) => [...prev, { ...object, isFavorite: false }]);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchVacancies();
  }

  function getSearchedVacancies() {
    if (searchQuery) {
      return vacancies.filter((vacancy) =>
        vacancy.profession.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return vacancies;
  }
  const searchedVacancies = getSearchedVacancies();

  function findFavorites() {
    setValue(vacancies.filter((vacancy) => vacancy.isFavorite === true));
  }
  return (
    <>
      {searchedVacancies?.length > 0 &&
        searchedVacancies.map((vacancy) => (
          <VacanciesItem
            key={v4()}
            vacancy={vacancy}
            findFavorites={findFavorites}
          />
        ))}
    </>
  );
};

export default VacanciesList;
