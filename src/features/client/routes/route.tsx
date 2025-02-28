import { Home, Weather, Map, Sensors, Sensor ,Settings} from "../pages";

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
        path:"settings",
        element: <Settings/>
      }
    ],
  },

  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
];
