import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("../mocks/browser");
  worker.start();
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "#home",
      },
      {
        path: "#credits",
      },
      {
        path: "#music",
      },
      {
        path: "#about-me",
      },
      {
        path: "#connect",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
