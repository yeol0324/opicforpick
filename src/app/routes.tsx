import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "@pages/home";
import { Login } from "@pages/login";
import { MyNotes } from "@pages/myNotes";
import { Sentences } from "@pages/sentences";
import { Paragraphs } from "@pages/paragraphs";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/login", element: <Login /> },
      { path: "/myNotes", element: <MyNotes /> },
      { path: "/sentences", element: <Sentences /> },
      { path: "/paragraphs", element: <Paragraphs /> },
    ],
  },
]);
