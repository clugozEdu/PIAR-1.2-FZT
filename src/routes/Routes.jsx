import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectRoutes";
import MainLayout from "../App";
import AddPlanning from "../pages/planning/AddPlanning";
import AddVisits from "../pages/visits/AddVisits";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import TasksPage from "../pages/clickupFZT/TasksPage";
import CalendarPage from "../pages/clickupFZT/CalendarPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "planning/pedagogic", element: <AddPlanning /> },
          { path: "planning/workshop", element: <AddPlanning /> },
          { path: "planning/technology", element: <AddPlanning /> },
          { path: "visit/pedagogic", element: <AddVisits /> },
          { path: "visit/workshop", element: <AddVisits /> },
          { path: "clickup/tasks", element: <TasksPage /> },
          { path: "clickup/calendar", element: <CalendarPage /> },
        ],
      },
    ],
  },
]);

export default router;
