import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "@pages/home";
import { MyNotes } from "@pages/myNotes";
import { Sentences } from "@pages/sentences";
import { Login } from "@pages/login";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/myNotes", element: <MyNotes /> },
      { path: "/sentences", element: <Sentences /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
