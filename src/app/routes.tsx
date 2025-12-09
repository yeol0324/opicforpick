import { ProtectedRoute } from "@app/providers/protected-route";
import { createBrowserRouter } from "react-router-dom";


import { RouteErrorBoundary } from "@pages/error/route-error-boundary";
import { Home } from "@pages/home";
import { Login } from "@pages/login";
import { MyRecords } from "@pages/my-records";
import { Practice } from "@pages/practice";
import { Wordbook } from "@pages/wordbook/ui/wordbook.page";

import { DemoLoginRedirect } from "@features/auth-demo/ui/demo-login-redirect";

import { Layout } from "./layout";

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
      {
        path: "/my-record",
        element: <ProtectedRoute children={<MyRecords />} />,
      },
      {
        path: "/wordbook",
        element: <ProtectedRoute children={<Wordbook />} />,
      },
      {
        path: "/practice",
        element: <ProtectedRoute children={<Practice />} />,
      },
      { path: "/demo-login", element: <DemoLoginRedirect /> },
    ],
  },
]);
