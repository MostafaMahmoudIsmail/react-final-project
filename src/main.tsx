import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import App from "./App";
import ProtectedPage from "./ProtectedPage";
import DashboardPage from "./pages/DashboardPage";
import UserProvider from "./tools/UserContext";
import UserInfo from "./pages/UserInfo";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App/>,
    children : [
      {
        index : true,
        element : <Navigate to="/dashboard" replace />
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        element: <ProtectedPage/>,
        children:[
          {
            path: "dashboard",
            element: <DashboardPage/>
          },
          {
            path: "user/:id",
            element: <UserInfo/>
          }
        ]
      },

    ]
  }
])


createRoot(document.getElementById("root")!).render(
  <UserProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </UserProvider>
);