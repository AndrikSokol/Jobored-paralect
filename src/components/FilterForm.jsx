import React from "react";
import { useForm } from "@mantine/form";
import { NumberInput, Button, CloseButton, MultiSelect } from "@mantine/core";
import axios from "axios";

const FilterForm = ({ searchQuery, setFilter, setVacancies }) => {
  const [industries, setIndustries] = React.useState([]);
  async function fetchVacancies(event) {
    try {
      event.preventDefault();
      const { payment_from, payment_to, industry } = form.values;
      setFilter({ payment_from, payment_to, industry, searchQuery });
      let query = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&${
        searchQuery ? "keyword=" + searchQuery + "&" : ""
      }${payment_from ? "payment_from=" + payment_from + "&" : ""}${
        payment_to ? "payment_to=" + payment_to + "&" : ""
      }${industry.length > 0 ? "catalogues=" + industry + "&" : ""}`;
      query = query.slice(0, -1);
      console.log(query);
      const { data } = await axios.get(query, {
        headers: {
          "x-secret-key": " GEU4nvd3rej*jeh.eqp",
          "X-Api-App-Id":
            "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
        },
      });
      setVacancies(data.objects);
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
        console.log(data);
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
    <form className="bg-white p-5 rounded-lg border border-gray-200 w-[300px]">
      <div className="flex justify-between gap-2 items-center ">
        <h1 className="font-bold text-xl">Фильтры</h1>
        <div className="flex items-center gap-1">
          <h2 className="text-sm text-gray-300">Сбросить всё</h2>
          <CloseButton
            onClick={() => {
              form.setValues({
                industry: "",
                payment_from: "",
                payment_to: "",
              });
              setVacancies([]);
            }}
            title="Close popover"
            size="lg"
            iconSize={12}
          />
        </div>
      </div>
      <div className="py-5">
        <h2 className="font-bold py-[6px]">Отрасль</h2>
        <MultiSelect
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
        mt="sm"
        placeholder="От"
        min={0}
        {...form.getInputProps("payment_from")}
      />
      <NumberInput
        mt="sm"
        placeholder="До"
        min={1}
        {...form.getInputProps("payment_to")}
      />
      <Button
        onClick={fetchVacancies}
        className="text-center bg-[#5E96FC] rounded-lg w-full mt-5"
      >
        Применить
      </Button>
    </form>
  );
};

export default FilterForm;
