import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PlantDetails from "../pages/donation-details/DonationRequestDetails ";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import ManageUsers from "../pages/Dashboard/Admin/AllUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import { createBrowserRouter } from "react-router";
import DonationRequest from "../components/Shared/MenuLinks/DonationRequest";
import Blog from "../components/Shared/MenuLinks/Blog";
import MyDonationRequest from "../pages/Dashboard/Customer/MyDonationRequest";
import SearchPage from "../components/Shared/Navbar/SearchPage";
import DonationRequestDetails from "../components/Dashboard/DonationDetails/DonationRequestDetails";
import PaymentSuccess from "../components/Dashboard/Payment/PaymentSuccess";
import DetailsJust from "../components/Dashboard/DonationDetails/DetailsJust";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import Funding from "../pages/Dashboard/Common/Founding";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/search-page",
        element: <SearchPage></SearchPage>,
        loader: () => fetch("./Districts.json").then((res) => res.json()),
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/founding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "/plant/:id",
        element: <PlantDetails />,
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // loader: () => fetch("./Districts.json").then((res) => res.json()),
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: () => fetch("/Districts.json").then((res) => res.json()),
  },
  // ------- Dashboard Routes -------
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "funding",
        element: <Funding></Funding>,
      },
      {
        path: "all-users/donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users/details-just/:id",
        element: (
          <PrivateRoute>
            <DetailsJust></DetailsJust>
          </PrivateRoute>
        ),
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },

      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "my-donation-request",
        element: (
          <PrivateRoute>
            <MyDonationRequest></MyDonationRequest>
          </PrivateRoute>
        ),
      },

      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
