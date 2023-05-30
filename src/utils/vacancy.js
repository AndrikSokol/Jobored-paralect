export const findVacancy = (vacancy, storedValue) => {
  return storedValue.find(
    (vl) => vacancy.id === vl.id && vacancy.profession === vl.profession
  );
};
