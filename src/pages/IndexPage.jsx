import React from "react";
import { TextInput, Button, Pagination } from "@mantine/core";
import axios from "axios";
import FilterForm from "../components/FilterForm";
import VacanciesList from "../components/VacanciesList";

const IndexPage = () => {
  const [activePage, setActivePage] = React.useState(1);
  const [pages, setPages] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState({});
  const [vacancies, setVacancies] = React.useState([]);
  function findSearchingVacancies(event) {
    event.preventDefault();
    setSearchQuery(search);
  }
  let search;
  function findTotalPage(vacancies) {
    setPages(vacancies / 5);
  }

  return (
    <div className=" py-10 max-w-[80%] mx-auto">
      <div className=" flex mx-auto justify-center gap-[28px] ">
        <div>
          <FilterForm
            searchQuery={searchQuery}
            setFilter={setFilter}
            setVacancies={setVacancies}
          />
        </div>
        <div className="w-full">
          <TextInput
            onChange={(event) => (search = event.target.value)}
            size="md"
            raduis="lg"
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.468 10.468L13.5714 13.5714M12.0924 6.54622C12.0924 9.60931 9.60931 12.0924 6.54622 12.0924C3.48313 12.0924 1 9.60931 1 6.54622C1 3.48313 3.48313 1 6.54622 1C9.60931 1 12.0924 3.48313 12.0924 6.54622Z"
                  stroke="#ACADB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            placeholder="Введите название вакансии"
            withAsterisk
            rightSection={
              <Button
                onClick={findSearchingVacancies}
                className="bg-[#5E96FC] mr-[50px] h-[28px] rounded-lg "
              >
                Поиск
              </Button>
            }
          />
          <VacanciesList
            findTotalPage={findTotalPage}
            searchQuery={searchQuery}
            filter={filter}
            filterVacancies={vacancies}
          />

          <div className="mt-10 flex justify-center">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
