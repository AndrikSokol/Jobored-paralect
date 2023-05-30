import React, { useContext } from "react";
import axios from "axios";
import VacanciesItem from "./VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
import HumanIcon from "./UI/HumanIcon";
import Loader from "./UI/Loader/Loader";
import { toogleFavorites } from "./utils/favorites";
import { findVacancy } from "./utils/vacancy";
const VacanciesList = ({ searchQuery, filter, activePage }) => {
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [vacancies, setVacancies] = React.useState([]);
  const [isVacanciesLoading, setIsVacanciesLoading] = React.useState(false);
  const vacanciesFromAPI = [];
  React.useEffect(() => {
    function fetchVacancies() {
      try {
        setIsVacanciesLoading(true);
        setVacancies([]);
        axios
          .get(
            `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/`,
            {
              params: {
                published: 1,
                page: activePage,
                keyword: searchQuery,
                payment_from: filter?.payment_from,
                payment_to: filter?.payment_to,
                catalogues: filter?.industy,
              },

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
          });
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

  return (
    <>
      {isVacanciesLoading && <Loader />}
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
