import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/uselocalStorage";
import Loader from "../components/UI/Loader/Loader";
import { Link } from "react-router-dom";
import VacanciesItem from "../components/VacanciesItem";
import { toogleFavorites } from "../components/utils/favorites";
import { findVacancy } from "../components/utils/vacancy";
const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = React.useState({});
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [isVacanciesLoading, setIsVacanciesLoading] = React.useState(false);
  React.useEffect(() => {
    async function fetchVacancy() {
      try {
        setIsVacanciesLoading(true);
        const { data } = await axios.get(
          "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/" + id,
          {
            headers: {
              "x-secret-key": " GEU4nvd3rej*jeh.eqp",
              "X-Api-App-Id":
                "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
            },
          }
        );
        if (findVacancy(data, storedValue) === undefined) {
          setVacancy({ ...data, isFavorite: false });
        } else {
          setVacancy({ ...data, isFavorite: true });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsVacanciesLoading(false);
      }
    }
    fetchVacancy();
  }, []);

  return (
    <div className="max-w-[80%]  mx-auto py-10">
      {isVacanciesLoading ? (
        <Loader />
      ) : (
        <div className="mt-[-16px]">
          <VacanciesItem
            data-elem={`vacancy-${vacancy.id}`}
            vacancy={vacancy}
            toogleFavorites={() =>
              toogleFavorites(vacancy, storedValue, setValue)
            }
          />
          <div className=" bg-white p-6 rounded-lg mt-5  border border-gray-300">
            <div
              dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacancyPage;
