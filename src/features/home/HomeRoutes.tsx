import Home from "./pages/Home";


export const homeRoutes = [
  { path: "/", element: <Home /> },{
    future: {
      v7_startTransition: true,
    },
  }

];
