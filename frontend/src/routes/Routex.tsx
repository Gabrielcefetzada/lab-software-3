import { createBrowserRouter } from "react-router-dom";
import  Home from "../pages/Home/HomePage"
import  UsuarioListagem from "../pages/Users/Users"

import { App } from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "users", element: <UsuarioListagem /> },
    ],
  },
]);