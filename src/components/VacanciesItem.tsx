import React, { memo, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/uselocalStorage";
import { IVacancy } from "../types/vacancy.interface";

type VacanciesItemProps = {
  vacancy: IVacancy;
  toogleFavorites: (
    vacancy: IVacancy,
    storedValue: IVacancy[],
    setValue: (value: IVacancy[]) => void
  ) => void;
};

const VacanciesItem: FC<VacanciesItemProps> = ({
  vacancy,
  toogleFavorites,
}) => {
  const { setValue, storedValue } = useLocalStorage("favorites", []);
  const [isFavotire, setIsFavorite] = React.useState<boolean>(
    vacancy.isFavorite
  );
  const { pathname } = useLocation();
  let subpage: string | undefined;
  if (pathname.includes("/vacancy/")) subpage = "vacancy";

  function handleFavorite(vacancy: IVacancy) {
    setIsFavorite((prev) => !prev);
    vacancy.isFavorite = !vacancy.isFavorite;
    toogleFavorites(vacancy, storedValue, setValue);
  }

  return (
    <div className=" bg-white p-6 rounded-lg mt-4 border border-gray-300">
      <div className="flex items-center gap-1 justify-between">
        {subpage ? (
          <h1 className="font-bold text-xl "> {vacancy.profession}</h1>
        ) : (
          <Link
            to={"/vacancy/" + vacancy.id}
            className="font-bold text-xl text-[#5E96FC] hover:scale-[101%] easy-in-out active:hover:text-[#2d74f8] duration-100 "
          >
            {vacancy.profession}
          </Link>
        )}

        <button
          data-elem={`vacancy-${vacancy.id}-shortlist-button`}
          onClick={() => handleFavorite(vacancy)}
        >
          {isFavotire ? (
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                fill="#5E96FC"
                stroke="#5E96FC"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              className="stroke-[#ACADB9] hover:stroke-[#5E96FC]"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="py-3 flex flex-col lg:flex-row items-start lg:items-center gap-3">
        <p className=" font-medium">
          з/п{" "}
          {vacancy.payment_to - vacancy.payment_from <= 0
            ? "Не указана"
            : vacancy.payment_from +
              " - " +
              vacancy.payment_to +
              " " +
              vacancy.currency}
        </p>

        <svg
          width="5"
          height="6"
          viewBox="0 0 5 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:flex"
        >
          <path
            d="M2.47891 5.78C3.85891 5.78 4.95891 4.7 4.95891 3.34C4.95891 1.96 3.85891 0.879999 2.47891 0.879999C1.11891 0.879999 0.0389063 1.96 0.0389063 3.34C0.0389063 4.7 1.11891 5.78 2.47891 5.78Z"
            fill="#7B7C88"
          />
        </svg>

        <p> {vacancy?.type_of_work?.title}</p>
      </div>
      <div className="flex gap-2">
        <svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6569 14.6569C13.7202 15.5935 11.7616 17.5521 10.4138 18.8999C9.63275 19.681 8.36768 19.6814 7.58663 18.9003C6.26234 17.576 4.34159 15.6553 3.34315 14.6569C0.218951 11.5327 0.218951 6.46734 3.34315 3.34315C6.46734 0.218951 11.5327 0.218951 14.6569 3.34315C17.781 6.46734 17.781 11.5327 14.6569 14.6569Z"
            stroke="#ACADB9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z"
            stroke="#ACADB9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {vacancy?.town?.title}
      </div>
    </div>
  );
};

export default memo(VacanciesItem);
