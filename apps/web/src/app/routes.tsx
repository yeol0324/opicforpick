import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@pages/home";
import AboutPage from "@pages/About";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);
