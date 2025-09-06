import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@pages/home";
import { Layout } from "./Layout";
import { MyNotes } from "@pages/myNotes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/myNotes", element: <MyNotes /> },
    ],
  },
]);
