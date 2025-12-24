import { lazy, Suspense } from "react";

import { AuthGuard } from "@app/providers/auth-guard";
import { createBrowserRouter } from "react-router-dom";

import { Spinner } from "@shared/ui";

const Layout = lazy(() =>
  import("@app/layout").then((m) => ({ default: m.Layout }))
);
const RouteErrorBoundary = lazy(() =>
  import("@pages/error/route-error-boundary").then((m) => ({
    default: m.RouteErrorBoundary,
  }))
);

const HomePage = lazy(() =>
  import("@pages/home").then((m) => ({ default: m.Home }))
);
const LoginPage = lazy(() =>
  import("@pages/login").then((m) => ({ default: m.Login }))
);
const MyRecordsPage = lazy(() =>
  import("@pages/my-records").then((m) => ({ default: m.MyRecords }))
);
const PracticePage = lazy(() =>
  import("@pages/practice").then((m) => ({ default: m.Practice }))
);
const WordbookPage = lazy(() =>
  import("@pages/wordbook/ui/wordbook.page").then((m) => ({
    default: m.Wordbook,
  }))
);
const DemoLoginRedirectPage = lazy(() =>
  import("@features/auth-demo/ui/demo-login-redirect").then((m) => ({
    default: m.DemoLoginRedirect,
  }))
);

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <RouteErrorBoundary />
      </Suspense>
    ),
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/demo-login", element: <DemoLoginRedirectPage /> },
      {
        element: <AuthGuard isAuthed={true} />,
        children: [
          { index: true, path: "/", element: <HomePage /> },
          { path: "/my-record", element: <MyRecordsPage /> },
          { path: "/wordbook", element: <WordbookPage /> },
          { path: "/practice", element: <PracticePage /> },
        ],
      },
    ],
  },
]);
