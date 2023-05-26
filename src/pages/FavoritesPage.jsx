import React from "react";
import HumanIcon from "../components/UI/HumanIcon";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import VacanciesItem from "../components/VacanciesItem";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/uselocalStorage";
const FavoritesPage = () => {
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [favorities, setFavorities] = React.useState(storedValue);
  function addFavorites() {
    setValue(favorities.filter((vacancy) => vacancy.isFavorite === true));
  }
  return (
    <div className="max-w-[80%]  mx-auto">
      {favorities.length < 1 && (
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
      )}
      {favorities.length > 0 &&
        favorities.map((favorite) => (
          <VacanciesItem
            data-elem={`vacancy-${favorite.id}`}
            key={v4()}
            vacancy={favorite}
            addFavorites={addFavorites}
          />
        ))}
    </div>
  );
};

export default FavoritesPage;
