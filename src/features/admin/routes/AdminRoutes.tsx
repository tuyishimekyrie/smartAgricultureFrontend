import { Home, Weather,Map,Sensors,Sensor,Users } from "../pages/index";

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
        path:"sensor",
        element:<Sensors/>
      },
      {
        path:"sensor/:id",
        element: <Sensor/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        future: {
          v7_startTransition: true,
        },
      }
    ],
  },
];
