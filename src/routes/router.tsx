import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "../features/home/HomeRoutes";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
    ...homeRoutes,
    {
        path:"*",
        element:<ErrorPage/>
    }
])

export default router;