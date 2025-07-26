import {
  Home,
  Weather,
  Map,
  Sensors,
  Sensor,
  Users,
  User,
  Settings,
} from "../pages/index";
import SensorTypes from "../pages/SensorTypes";

export const AdminRoutes = [
  {
    path: "admin",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "weather",
        element: <Weather />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "sensor",
        element: <Sensors />,
      },
      {
        path: "sensor/:id",
        element: <Sensor />,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <Users />,
          },
          {
            path: ":id",
            element: <User />,
          },
        ],
      },
      {
        path: "sensor-type",
        element: <SensorTypes />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        future: {
          v7_fetcherPersist: true,
          v7_startTransition: true,
          v7_relativeSplatPath: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        },
      },
    ],
  },
];
