import React from "react";
import axios from "axios";
import VacanciesItem from "./VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
const VacanciesList = ({
  searchQuery,
  filter,
  filterVacancies,
  activePage,
}) => {
  const { setValue, storedValue } = useLocalStorage("favorites", "");
  const [vacancies, setVacancies] = React.useState([]);

  React.useEffect(() => {
    console.log("ef0");
    setVacancies(filterVacancies);
  }, [filterVacancies]);

  React.useEffect(() => {
    console.log("ef1");
    setVacancies([]);
    async function fetchVacancies() {
      try {
        const { data } = await axios.get(
          `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?page=${activePage}`,
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
  }, [activePage]);

  React.useEffect(() => {
    console.log("ef2");

    if (storedValue.length > 0) {
      const vac = [...vacancies, ...storedValue];
      storedValue.map((vl) => {
        const index = vac.findIndex(
          (vacancy) =>
            vacancy.profession === vl.profession && vacancy.isFavorite == false
        );
        console.log(index);
        if (index != -1) {
          vac.splice(index, 1);
        }
      });
      setVacancies(vac);
    }
  }, [storedValue]);

  // function meshVacanciesAndStoredValue() {
  //   if (storedValue.length > 0) {
  //     const filtered = storedValue.map((vl) => {
  //       const index = vacancies.findIndex(
  //         (vac) => vac.id === vl.id && vac.profession === vl.profession
  //       );
  //       vacancies.splice(index, 1);
  //     });
  //     setVacancies(filtered);
  //   }
  // }

  console.log(vacancies);

  // if (vacancies.length == 0) {
  //   async function fetchVacancies() {
  //     try {
  //       const { data } = await axios.get(
  //         `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?page=${activePage}`,
  //         {
  //           headers: {
  //             "x-secret-key": " GEU4nvd3rej*jeh.eqp",
  //             "X-Api-App-Id":
  //               "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  //           },
  //         }
  //       );

  //       data.objects.map((object) => {
  //         setVacancies((prev) => [...prev, { ...object, isFavorite: false }]);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchVacancies();
  // }

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
