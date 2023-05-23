import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import { UserContextProvider } from "./context/UserContext";
import FavoritePage from "./pages/FavoritePage";
import VacancyPage from "./pages/VacancyPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/favorite" element={<FavoritePage />}></Route>
          <Route path="/vacancy/:id" element={<VacancyPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
