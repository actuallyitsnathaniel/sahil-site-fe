import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createHead, UnheadProvider } from "@unhead/react/client";
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

const head = createHead();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UnheadProvider head={head}>
      <RouterProvider router={router} />
    </UnheadProvider>
  </React.StrictMode>
);
