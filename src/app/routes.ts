import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import EnergyPovertyMap from "./pages/EnergyPovertyMap";
import TariffSimulator from "./pages/TariffSimulator";
import DataArchitecture from "./pages/DataArchitecture";
import SystemArchitecture from "./pages/SystemArchitecture";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/energy-poverty-map",
    Component: EnergyPovertyMap,
  },
  {
    path: "/tariff-simulator",
    Component: TariffSimulator,
  },
  {
    path: "/data-architecture",
    Component: DataArchitecture,
  },
  {
    path: "/system-architecture",
    Component: SystemArchitecture,
  },
]);
