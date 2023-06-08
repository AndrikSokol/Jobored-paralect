import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: FC = () => {
  const { pathname } = useLocation();

  let subpage: string | undefined;
  if (pathname === "/") subpage = "home";
  else if (pathname === "/favorites") subpage = "favorites";

  return (
    <header className="bg-white p-6">
      <div className="max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] mx-auto flex">
        <Link to="/" className="flex gap-4 sm:gap-2 items-center">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.039 4.81473C9.08945 0.423546 3.45945 -1.27661 1.13587 1.02923C-1.18771 3.33507 0.469263 8.97794 4.81473 14.961C0.423547 20.9105 -1.27661 26.5405 1.02923 28.8641C3.33507 31.1877 8.97793 29.5307 14.9609 25.1852C20.9105 29.5764 26.5405 31.2766 28.8641 28.9708C31.1877 26.6649 29.5307 21.022 25.1852 15.039C29.5764 9.08944 31.2766 3.45942 28.9708 1.13584C26.6649 -1.18775 21.022 0.469237 15.039 4.81473Z"
              fill="#5E96FC"
            />
          </svg>
          <h1 className="font-bold  text-2xl">Jabored</h1>
        </Link>

        <div className="w-full flex justify-center gap-[60px] items-center">
          <Link to="/" className={subpage === "home" ? " text-[#5E96FC]" : ""}>
            <div className="hidden sm:flex">Поиск Вакансий</div>
            <svg
              className={
                subpage === "home"
                  ? "sm:hidden stroke-[#5E96FC] "
                  : "sm:hidden stroke-[#ACADB9] hover:stroke-[#5E96FC]"
              }
              width="22"
              height="22"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.468 10.468L13.5714 13.5714M12.0924 6.54622C12.0924 9.60931 9.60931 12.0924 6.54622 12.0924C3.48313 12.0924 1 9.60931 1 6.54622C1 3.48313 3.48313 1 6.54622 1C9.60931 1 12.0924 3.48313 12.0924 6.54622Z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <Link
            to="/favorites"
            className={subpage === "favorites" ? " sm:text-[#5E96FC]" : ""}
          >
            <div className="hidden sm:flex">Избранное</div>
            <div className="sm:hidden relative">
              {/* {subpage !== "favorites" && (
                <div className="absolute top-[-10px] right-[-5px] text-white font-bold rounded-md px-[2px]   bg-[#5E96FC]">
                  {numberOfFavorites}
                </div>
              )} */}
              <svg
                className={
                  subpage === "favorites"
                    ? "sm:hidden fill-[#5E96FC] stroke-[#5E96FC] "
                    : "sm:hidden stroke-[#ACADB9] hover:stroke-[#5E96FC]"
                }
                width="26"
                height="26"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
