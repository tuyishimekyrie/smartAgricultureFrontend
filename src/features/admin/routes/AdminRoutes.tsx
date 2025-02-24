import { Home, Weather } from "../pages/index";

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
        future: {
          v7_startTransition: true,
        },
      }
    ],
  },
];
