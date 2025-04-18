import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SIgnUp/SignUp";
import PrivetRoute from "./PrivetRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Layout/AddItems/AddItems";
import AdminRoute from "./AdminRoute";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "menu",
          element: <Menu></Menu>
        },
        {
          path: "order/:category",
          element: <Order></Order>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "signup",
          element: <SignUp></SignUp>
        },
        {
          path: "secret",
          element: <PrivetRoute><Secret></Secret></PrivetRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children: [
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        // admin routes
        {
            path: 'addItems',
            element: <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);