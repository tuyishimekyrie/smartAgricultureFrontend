import Register from "./pages/Register"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NewCredentials from "./pages/NewCredentials";
import Otp from "./pages/Otp";

export const authRoutes = [
    {
        path:"/auth/register",
        element: <Register/>
    },
    {
        path:"/auth/login",
        element: <Login/>
    },{
        path:"/auth/forgot",
        element:<ForgotPassword/>
    },{
        path:"/auth/otp",
        element:<Otp/>
    },{
        path:"/auth/new-credentials",
        element:<NewCredentials/>
    }
]