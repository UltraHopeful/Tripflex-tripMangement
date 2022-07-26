import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// all pages import
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoHeader from "./components/NoHeader";
// import ProtectedRoute from "./components/ProtectedRoute";
import WithHeader from "./components/WithHeader";
import AdminDashboard from "./pages/AdminDashboard/index";
import AdminLogin from "./pages/AdminLogin/index";
import CreateTrip from "./pages/CreateTrip/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Profile from "./pages/Profile/index";
import Signup from "./pages/Signup/index";
import TripBook from "./pages/TripBook/index";
import VerifyUser from "./pages/VerifyUser/index";
import TripTable from "./pages/AdminDashboard/tripTable";
import SubTripTable from "./pages/AdminDashboard/subTripTable";
import PaymentTable from "./pages/AdminDashboard/paymentTable";

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#326dd9" },
  },
});

const ProtectedRoute = ({ isAllow, redirectPath = "/", children }) => {
  if (!isAllow()) {
    return <Navigate to={redirectPath} replace />;
  }
  console.log(children);
  return children ? children : <Outlet />;
};

function checkUser() {
  const isLogin = localStorage.getItem("isLogin");
  const profile = localStorage.getItem("profile");
  // console.log("check user");
  if (isLogin === "true" && profile === "user") {
    // console.log("user true");
    return true;
  }
  console.log("user false");
  return false;
}

function checkAdmin() {
  const isLogin = localStorage.getItem("isLogin");
  const profile = localStorage.getItem("profile");
  // console.log("check admin");
  if (isLogin === "true" && profile === "admin") {
    // console.log("admin true");
    return true;
  }
  console.log("admin false");

  return false;
}

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<WithHeader />}>
            <Route path="/" element={<Home />} exact />
            <Route element={<ProtectedRoute isAllow={checkUser} />}>
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/trip-book" element={<TripBook />} />
            </Route>
            <Route element={<ProtectedRoute isAllow={checkAdmin} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/create-trip" element={<CreateTrip />} />
              <Route path="/tripTable" element={<TripTable />} />
              <Route path="/subTripTable" element={<SubTripTable />} />
              <Route path="/paymentTable" element={<PaymentTable />} />
            </Route>
          </Route>
          <Route element={<NoHeader />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-user" element={<VerifyUser />} />
          </Route>
          {/* <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} /> */}
        </Routes>
        <ToastContainer />
      </ThemeProvider>
      {/* <Outlet></Outlet> */}
    </div>
  );
}

export default App;
