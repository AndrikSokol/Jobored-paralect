import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import { UserContextProvider } from "./context/UserContext";
import FavoritesPage from "./pages/FavoritesPage";
import VacancyPage from "./pages/VacancyPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/favorites" element={<FavoritesPage />}></Route>
          <Route path="/vacancy/:id" element={<VacancyPage />}></Route>
          <Route path="*" element={<IndexPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
