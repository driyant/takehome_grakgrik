import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Logout from "../pages/Logout";
import PrivateLayout from "../components/PrivateLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Layout />
      </AppLayout>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        element: (
          <PrivateLayout>
            <Profile />
          </PrivateLayout>
        ),
      },
      { path: "arena", element: <div>Arena</div> },
      { path: "comment", element: <div>Comment</div> },
      { path: "share", element: <div>Share</div> },
    ],
  },
  {
    path: "/login",
    element: (
      <AppLayout>
        <Login />
      </AppLayout>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
