import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// all pages import
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import VerifyUser from "./pages/VerifyUser/index";
import Profile from "./pages/Profile/index";
import AdminLogin from "./pages/AdminLogin/index"
import AdminDashboard from "./pages/AdminDashboard/index"
import CreateTrip from "./pages/CreateTrip/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import NoHeader from "./components/NoHeader";
import WithHeader from "./components/WithHeader";

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#326dd9" },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<WithHeader />}>
            <Route path="/" element={<Home />} exact />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-trip" element={<CreateTrip />} />
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
