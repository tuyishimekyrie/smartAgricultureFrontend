import { Home, Weather,Map,Sensors,Sensor } from "../pages/index";

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
        future: {
          v7_startTransition: true,
        },
      }
    ],
  },
];
