import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isLogin = localStorage.getItem("isLogin");
  console.log("this", isLogin);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}

export default ProtectedRoute;