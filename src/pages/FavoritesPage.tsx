import React, { FC } from "react";
import HumanIcon from "../components/UI/HumanIcon";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import VacanciesItem from "../components/VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
import { toogleFavorites } from "../utils/favorites";
import { IVacancy } from "../types/vacancy.interface";

const FavoritesPage: FC = () => {
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [favorities, setFavorities] = React.useState<IVacancy[]>(storedValue);

  React.useEffect(() => {
    setFavorities(storedValue);
  }, [storedValue]);

  return (
    <div className="max-w-[80%]  mx-auto">
      {favorities.length == 0 ? (
        <div className=" mt-[120px]">
          <div className=" flex flex-col gap-8 justify-center items-center">
            <HumanIcon />
            <h1 className="font-bold text-xl">Упс, здесь ещё ничего нет!</h1>

            <Link to="/">
              <Button className="bg-[#DEECFF] text-[#5E96FC] hover:text-[white]">
                Поиск Вакансий
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        favorities.map((favorite: IVacancy) => (
          <VacanciesItem
            data-elem={`vacancy-${favorite.id}`}
            key={v4()}
            vacancy={favorite}
            toogleFavorites={() =>
              toogleFavorites(favorite, storedValue, setValue)
            }
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
