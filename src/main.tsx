import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { RouterProvider } from "react-router-dom";

import router from "./routes/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
