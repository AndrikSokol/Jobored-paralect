export function toogleFavorites(vacancy, storedValue, setValue) {
  if (vacancy.isFavorite) {
    setValue([...storedValue, vacancy]);
  } else {
    setValue(storedValue.filter((value) => value.id !== vacancy.id));
  }
}
