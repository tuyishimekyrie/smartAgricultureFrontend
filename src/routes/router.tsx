import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "../features/home/HomeRoutes";
import ErrorPage from "./ErrorPage";
import { authRoutes } from "../features/auth";
import { AdminRoutes } from "../features/admin";
import { clientRoutes } from "../features/client";

const router = createBrowserRouter([
  ...homeRoutes,
  ...authRoutes,
  ...AdminRoutes,
  ...clientRoutes,
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default router;
