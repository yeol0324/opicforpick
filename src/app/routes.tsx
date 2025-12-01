import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "@pages/home";
import { Login } from "@pages/login";
import { Notes } from "@pages/notes";
import { Practice } from "@pages/practice";
import { ProtectedRoute } from "@app/providers/ProtectedRoute";
import { DemoLoginRedirect } from "@features/auth-demo/ui/DemoLoginRedirect";
import { RouteErrorBoundary } from "@pages/error/RouteErrorBoundary";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        path: "/",
        element: <ProtectedRoute children={<Home />} />,
      },
      { path: "/notes", element: <ProtectedRoute children={<Notes />} /> },
      {
        path: "/practice",
        element: <ProtectedRoute children={<Practice />} />,
      },
      { path: "/demo-login", element: <DemoLoginRedirect /> },
    ],
  },
]);
