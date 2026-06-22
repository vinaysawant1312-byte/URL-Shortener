import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Button } from "@/components/ui/button";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/landing";
import Dashborad from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <Dashborad />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
