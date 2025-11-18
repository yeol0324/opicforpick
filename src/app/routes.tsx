import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "@pages/home";
import { Login } from "@pages/login";
import { Notes } from "@pages/notes";
import { Practice } from "@pages/practice";
import { ProtectedRoute } from "@app/providers/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        index: true,
        path: "/",
        element: <ProtectedRoute children={<HomePage />} />,
      },
      { path: "/notes", element: <ProtectedRoute children={<Notes />} /> },
      {
        path: "/practice",
        element: <ProtectedRoute children={<Practice />} />,
      },
    ],
  },
]);
