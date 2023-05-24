import React from "react";
import axios from "axios";
import VacanciesItem from "./VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
import HumanIcon from "./UI/HumanIcon";
import Loader from "./UI/Loader/Loader";
const VacanciesList = ({
  searchQuery,
  filter,
  filterVacancies,
  activePage,
}) => {
  const { setValue, storedValue } = useLocalStorage("favorites", "");
  const [vacancies, setVacancies] = React.useState([]);
  const [isVacanciesLoading, setIsVacanciesLoading] = React.useState(false);
  console.log(storedValue);
  const vacanciesFromAPI = [];
  React.useEffect(() => {
    if (filter.length > 0) {
      setVacancies(filterVacancies);
    }
  }, [filterVacancies]);

  React.useEffect(() => {
    function fetchVacancies() {
      try {
        setIsVacanciesLoading(true);
        setVacancies([]);
        axios
          .get(
            `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?page=${activePage}`,
            {
              headers: {
                "x-secret-key": " GEU4nvd3rej*jeh.eqp",
                "X-Api-App-Id":
                  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
              },
            }
          )
          .then(({ data }) => {
            data.objects.map((object) => {
              vacanciesFromAPI.push({ ...object, isFavorite: false });
            });
            concatVacanciesAndStoredValue();
            setIsVacanciesLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchVacancies();
  }, [activePage]);

  function concatVacanciesAndStoredValue() {
    if (storedValue.length > 0) {
      const newVacancies = vacanciesFromAPI.map((vacancy) => {
        const index = storedValue.find(
          (vl) => vacancy.id === vl.id && vacancy.profession === vl.profession
        );
        console.log(index);
        if (index != undefined) {
          vacancy.isFavorite = true;
        }
        return vacancy;
      });
      setVacancies(newVacancies);
    } else {
      setVacancies(vacanciesFromAPI);
    }
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

  function addFavorites() {
    setValue(vacancies.filter((vacancy) => vacancy.isFavorite === true));
  }

  return (
    <>
      {isVacanciesLoading && <Loader />}
      {searchedVacancies?.length > 0 &&
        searchedVacancies.map((vacancy) => (
          <VacanciesItem
            key={v4()}
            data-elem={`vacancy-${vacancy.id}`}
            vacancy={vacancy}
            addFavorites={addFavorites}
          />
        ))}
    </>
  );
};

export default VacanciesList;
