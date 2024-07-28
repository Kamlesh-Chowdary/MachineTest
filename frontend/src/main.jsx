import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Dashboard.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/employee-list",
        element: <EmployeeList />,
      },
      {
        path: "/create-employee",
        element: <CreateEmployee />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
