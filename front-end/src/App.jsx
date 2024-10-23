import { Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import CarInfo from "./components/CarInfo";
import ServicesList from "./components/ServicesList";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={"busqueda"} element={<Home />} />
        <Route path={"busqueda/:id"} element={<CarInfo />} />
        <Route path={"cars"} element={<CarList />} />
        <Route path={'/services'} element={<ServicesList />} />
      </Route>
    </Routes>
  )
}

export default App;
