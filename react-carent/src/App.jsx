import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import RegForm from "./components/RegForm";
import Contact from "./components/Contact";
import CarsList from "./components/CarsList";
import Dashboard from "./components/DashBoard";
import CarForm from "./components/CarForm";
import Faqs from "./components/Faqs";
import axios from "axios";
import getCookie from "./utils/getCookie";

export const defaultComponent = {
  login: false,
  home: false,
  regForm: false,
  contacts: false,
  cars: false,
  dashboard: false,
  addCars: false,
  faqs: false,
};

export const OptionsContext = React.createContext({
  component: {},
  setComponent: () => {},
  cars: [],
  setCars: () => {},
  logged: false,
  setLogged: () => {},
});

export function App() {
  const [component, setComponent] = useState({
    ...defaultComponent,
    home: true,
  });

  const [cars, setCars] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(
    () => async () => {
      await axios.get("http://localhost:8080/cars").then(
        (res) => {
          setCars(res.data);
        },
        (err) => console.log(err)
      );
    },
    [component]
  );

  useEffect(() => {
    if (getCookie("carent-session-token") !== "") {
      setLogged(true);
    }
  }, []);

  return (
    <OptionsContext.Provider
      value={{ component, setComponent, cars, setCars, logged, setLogged }}
    >
      <Navbar />
      {component.home && <Home />}
      {component.login && <Login />}
      {component.regForm && <RegForm />}
      {component.contacts && <Contact />}
      {component.cars && <CarsList />}
      {component.dashboard && <Dashboard />}
      {component.addCars && <CarForm/>}
      {component.faqs && <Faqs/>}
      <Footer />
    </OptionsContext.Provider>
  );
}
