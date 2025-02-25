import { Home, Weather,Map } from "../pages/index";

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
        element: <Map/>
      },
      {
        future: {
          v7_startTransition: true,
        },
      }
    ],
  },
];
