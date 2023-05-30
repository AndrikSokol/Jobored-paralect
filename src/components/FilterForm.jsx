import React from "react";
import { useForm } from "@mantine/form";
import { NumberInput, Button, CloseButton, MultiSelect } from "@mantine/core";
import axios from "axios";

const FilterForm = ({ setFilter }) => {
  const [industries, setIndustries] = React.useState([]);
  function addFilter(event) {
    try {
      event.preventDefault();
      setFilter(form.values);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    async function fetchIndustries() {
      try {
        const { data } = await axios.get(
          "https://startup-summer-2023-proxy.onrender.com/2.0/catalogues",
          {
            headers: {
              "x-secret-key": " GEU4nvd3rej*jeh.eqp",
              "X-Api-App-Id":
                "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
            },
          }
        );
        data.map((industry) => {
          setIndustries((prev) => [
            ...prev,
            { title_rus: industry.title_rus, key: industry.key },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchIndustries();
  }, []);

  const form = useForm({
    initialValues: {
      industry: [],
      payment_from: "",
      payment_to: "",
    },
  });

  return (
    <form className="bg-white p-5 rounded-lg border border-gray-200 w-full sm:w-[300px]">
      <div className="flex justify-between gap-2 items-center ">
        <h1 className="font-bold text-xl">Фильтры</h1>
        <div
          onClick={() => {
            form.setValues({
              industry: [],
              payment_from: "",
              payment_to: "",
            });
          }}
          className="flex items-center gap-1"
        >
          <h2
            onClick={addFilter}
            className="text-sm text-gray-300 hover:text-[#92C1FF] active:text-[#5E96FC] cursor-pointer"
          >
            Сбросить всё
          </h2>
          <CloseButton
            onClick={addFilter}
            title="Close popover"
            size="lg"
            iconSize={12}
          />
        </div>
      </div>
      <div className="py-5">
        <h2 className="font-bold py-[6px]">Отрасль</h2>
        <MultiSelect
          className="hover:bg-[#C9E0FF]"
          data-elem="industry-select"
          placeholder="Выберете отрасль"
          data={industries.map((industry) => ({
            value: industry.key,
            label: industry.title_rus,
          }))}
          {...form.getInputProps("industry")}
        />
      </div>
      <h2 className="font-bold">Оклад</h2>
      <NumberInput
        data-elem="salary-from-input"
        mt="sm"
        placeholder="От"
        min={0}
        {...form.getInputProps("payment_from")}
      />
      <NumberInput
        data-elem="salary-to-input"
        mt="sm"
        placeholder="До"
        min={1}
        {...form.getInputProps("payment_to")}
      />
      <Button
        data-elem="search-button"
        onClick={addFilter}
        className="text-center bg-[#5E96FC] rounded-lg w-full mt-5"
      >
        Применить
      </Button>
    </form>
  );
};

export default FilterForm;
