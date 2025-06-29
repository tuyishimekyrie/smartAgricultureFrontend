import { Home, Weather, Map, Sensors, Sensor, Settings } from "../pages";
import SensorReadings from "../pages/SensorReadings";

export const clientRoutes = [
  {
    path: "client",
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
        children: [
          {
            path: "",
            element: <Sensors />,
          },
          {
            path: ":id",
            element: <Sensor />,
          },
        ],
      },
      {
        path: "sensor-readings",
        element: <SensorReadings />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
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
];
