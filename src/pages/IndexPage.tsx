import React, { FC, MouseEvent } from "react";
import { TextInput, Button, Pagination } from "@mantine/core";
import FilterForm from "../components/FilterForm";
import VacanciesList from "../components/VacanciesList";
import { getPages } from "../utils/pages";
import { IFilter } from "../types/filter.interface";

const IndexPage: FC = () => {
  const [activePage, setActivePage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filter, setFilter] = React.useState<IFilter>({} as IFilter);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(20);
  const [isFirstShowForm, SetIsFirstShow] = React.useState<boolean>(false);
  let search: string;

  function findSearchingVacancies(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setSearchQuery(search);
  }

  React.useEffect(() => {
    SetIsFirstShow(true);
  }, []);

  return (
    <div className=" py-10 max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] mx-auto">
      <div className="grid md:flex  mx-auto justify-center gap-[28px] ">
        <div className="mx-auto  ">
          <FilterForm setFilter={setFilter} isFirstShowForm={isFirstShowForm} />
        </div>
        <div className="w-full ">
          <TextInput
            data-elem="search-input"
            className={`"relative transition-all  duration-1000 z-[9] ${
              isFirstShowForm
                ? " opacity-full"
                : "translate-y-[-200%] opacity-0 "
            }`}
            onChange={(event) => (search = event.target.value)}
            size="md"
            radius="lg"
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
                data-elem="search-button"
                onClick={findSearchingVacancies}
                className="bg-[#5E96FC] mr-[50px] sm:h-[28px] rounded-lg "
              >
                Поиск
              </Button>
            }
          />
          <VacanciesList
            searchQuery={searchQuery}
            filter={filter}
            activePage={activePage}
            setTotalCount={setTotalCount}
            limit={limit}
          />

          <div className="mt-10 flex justify-center">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={getPages(totalCount, limit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
