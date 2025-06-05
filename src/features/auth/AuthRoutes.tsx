import { Register, Login, ForgotPassword, Otp, NewCredentials } from "./pages";

export const authRoutes = [
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/otp",
    element: <Otp />,
  },
  {
    path: "/auth/new-credentials",
    element: <NewCredentials />,
  },
  {
    future: {
     v7_fetcherPersist: true,
          v7_startTransition:true,
          v7_relativeSplatPath:true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
    },
  },
];
