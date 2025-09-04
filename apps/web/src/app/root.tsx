import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
// import { Header } from "@shared/ui";

export function App() {
  return <RouterProvider router={router} />;
}
