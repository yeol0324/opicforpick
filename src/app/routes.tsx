import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "@pages/home";
import { Login } from "@pages/login";
import { MyNotes } from "@pages/myNotes";
import { Sentences } from "@pages/sentences";
import { Paragraphs } from "@pages/paragraphs";
import { ProtectedRoute } from "@app/providers/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, path: "/", element: <HomePage /> },
          { path: "/myNotes", element: <MyNotes /> },
          { path: "/sentences", element: <Sentences /> },
          { path: "/paragraphs", element: <Paragraphs /> },
        ],
      },
    ],
  },
]);
