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
            path: '',
            element: <Users />,
          },
          {
            path: ":id",
            element: <User />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings/>
      },
      {
        future: {
          v7_relativeSplatPath: true,
        },
      },
    ],
  },
];
