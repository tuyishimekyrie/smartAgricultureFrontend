import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "../features/home/HomeRoutes";
import ErrorPage from "./ErrorPage";
import { authRoutes } from "../features/auth";
import { AdminRoutes } from "../features/admin";

const router = createBrowserRouter([
    ...homeRoutes,
    ...authRoutes,
    ...AdminRoutes,
    {
        path:"*",
        element:<ErrorPage/>
    },{
        future: {
          v7_startTransition: true,
        },
      }
])

export default router;