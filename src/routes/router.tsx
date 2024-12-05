import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "../features/home/HomeRoutes";
import ErrorPage from "./ErrorPage";
import { authRoutes } from "../features/auth";

const router = createBrowserRouter([
    ...homeRoutes,
    ...authRoutes,
    {
        path:"*",
        element:<ErrorPage/>
    }
])

export default router;