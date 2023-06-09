import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../hooks/uselocalStorage";
import Loader from "../components/UI/Loader/Loader";
import VacanciesItem from "../components/VacanciesItem";
import { toogleFavorites } from "../utils/favorites";
import { findVacancy } from "../utils/vacancy";
import { IVacancy } from "../types/vacancy.interface";
import { getVacancy } from "../services/vacanciesService";

const VacancyPage: FC = () => {
  const { id } = useParams<string>();
  const [vacancy, setVacancy] = React.useState<IVacancy>({} as IVacancy);
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [isVacanciesLoading, setIsVacanciesLoading] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchVacancy() {
      try {
        setIsVacanciesLoading(true);
        const data = await getVacancy(id);
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
