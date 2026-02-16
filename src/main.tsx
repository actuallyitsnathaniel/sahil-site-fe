import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createHead, UnheadProvider } from "@unhead/react/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
  },
]);

const head = createHead();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UnheadProvider head={head}>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </UnheadProvider>
  </React.StrictMode>
);
