import React, { useContext } from "react";
import { Formik } from "formik";
import { LoginForm } from "./loginForm";
import * as Yup from "yup";
import { Card, Grid, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Logo from "/tripflex.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loginAdmin,
  loginUser,
  userLoginCheck,
} from "../../util/AuthFunctions";

// cite : https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h
// I used some of the code from article, but I change as per my preferences

const validations = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter valid email like abc@xyz.com")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Minimum 8 characters needed for password")
    .matches("[a-z]", "Must contain one lowercase letter")
    .matches("[A-Z]", "Must contain one uppercase letter")
    .matches("[0-9]", "Must contain one number character")
    .matches(/[\W]/, "Must contain one special character")
    .max(25, "Maximum 25 characters allowed for password")
    .required("Password is required"),
});

export default function InputForm(props) {
  const navigate = useNavigate();
  const values = { email: "", password: "" };

  const signinUserWithAuth = (values) => {
    // console.log(values);
    loginAdmin(values.email, values.password, (err, result) => {
      if (err) {
        toast.error(err.message, { position: toast.POSITION.TOP_RIGHT });
        console.log(err);
        return;
      }
      console.log(result);
      const profileType = result.idToken.payload.profile;
      //   console.log(userInfo.profile);
      if (profileType === "admin") {
        toast.success("Admin Login Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/admin-dashboard");
      } else {
        toast.success(
          "Sorry you are not admin, but you are login Successfully",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        navigate("/my-profile");
      }
      // console.log(setUserInfo(...userInfo,{userEmail:values.email}));

      userLoginCheck((err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  };

  return (
    <React.Fragment>
      <Grid
        container
        id="loginPage"
        height="100%"
        justifyContent="center"
        alignItems="center"
        className="loginSide1"
      >
        <Grid item xl={3} lg={4} md={5} sm={7} xs={11}>
          <Card sx={{ p: "1.5rem" }} elevation={5}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{ display: "flex", mb: "10px" }}
            >
              <img
                src="/tripflex.png"
                alt="Tripflex"
                loading="lazy"
                className="logo-img"
                width="100%"
              />
            </Typography>
            {/*<Divider variant="middle"></Divider>*/}
            <Typography
              align="center"
              variant="h4"
              fontWeight="medium"
              color="black"
              marginBottom="20px"
            >
              Admin Login
            </Typography>
            <Box sx={{ m: 4 }}></Box>
            <Formik
              initialValues={values}
              validationSchema={validations}
              onSubmit={(values) => {
                // alert("Login Successfully");
                console.log(values);
                signinUserWithAuth(values);
              }}
            >
              {(props) => <LoginForm {...props} />}
            </Formik>
            <Box
              component="div"
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Link display="flex" marginBottom={1} href="/" underline="none">
                {"Back to Home"}
              </Link>
            </Box>
          </Card>
        </Grid>
        <ToastContainer />
      </Grid>
    </React.Fragment>
  );
}
