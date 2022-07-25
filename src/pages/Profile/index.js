import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  styled,
  TextField
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { userLoginCheck } from "../../util/AuthFunctions";

import { logoutUser } from "../../util/AuthFunctions";

const ReadOnlyTextField = styled((props) => (
  <TextField
    InputProps={{ readOnly: true, disableUnderline: true }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "2px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      border: "2px solid #e2e2e1",
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.main,
    },
  },
  "& fieldset": {
    borderRadius: "30px",
  },
}));

const EditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "2px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      border: "2px solid #e2e2e1",
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.main,
    },
  },
  "& fieldset": {
    borderRadius: "30px",
  },
}));

export default function Main() {
  const location = useLocation();

  const [userDetails, setUserDetails] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log("user profile page")
    userLoginCheck((err,info) => {
      console.log(info);
      setUserDetails({fname: info[6].Value,
        lname: info[7].Value,
        email: info[8].Value,
        phone: info[5].Value,
        address: info[1].Value,
        profile: info[3].Value});
    });
  }, []);

  let userMail = "";
  if (location.state !== null) {
    userMail = location.state.email;
  }
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpenEditForm = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const validations = Yup.object({
    firstName: Yup.string("Enter first name")
      .min(3, "Minimum 3 characters needed")
      .required("First name is required"),
    lastName: Yup.string("Enter first name")
      .min(3, "Minimum 3 characters needed")
      .required("First name is required"),
    email: Yup.string("Enter your email")
      .email("Enter valid email like abc@xyz.com")
      .required("Email is required"),
    contactNo: Yup.string("Enter your contact number")
      .matches(
        "^[+]{1}\\d{1}[\\s]{1}\\(\\d{3}\\)[\\s]{1}\\d{3}[-]{1}\\d{4}$",
        "Enter valid contact number"
      )
      .required("Contact number is required"),
    address: Yup.string("Enter address")
      .matches(
        "(([A-Za-z0-9 \\S]+),([A-Za-z0-9 ]+),([A-Za-z0-9 ]+),([A-Za-z0-9 ]+))",
        "Enter valid address"
      )
      .required("Address is required"),
  });

  const notify = () => {
    toast.success("Your details updated successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify2 = () => {
    console.log("Delete profile");
    toast.success("Your account deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify3 = () => {
    console.log("Signout user");
    toast.success("Your successfully logged out", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: userDetails.fname,
      lastName: userDetails.lname,
      email: userDetails.email,
      contactNo: userDetails.phone,
      address: userDetails.address,
    },
    validationSchema: validations,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(formik.values, null, 2));
      console.log("Update profile");
      notify();
      handleClose();
    },
  });

  return (
    <Grid
      container
      maxWidth="lg"
      justifyContent="center"
      alignContent="center"
      sx={{ my: 4, mx: "auto" }}
      className="elevation-4"
    >
      <Grid item xs={12}>
        <Typography pt={2} align="center" variant="h5">
          User Profile
        </Typography>
        <hr className="hr-fancy1" />
      </Grid>
      <Grid item xl={4} lg={4} md={4} sm={4} xs={10} alignItems="center">
        <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center", height: "100%" }}>
          <Avatar alt={localStorage.getItem("userFName")} src="#" className="profile-img" />
        </Box>
        {/*<img alt="complex" className="profile-img" src="https://source.unsplash.com/random/?portrait,men" />*/}
      </Grid>
      <Grid item xl={8} lg={8} md={8} sm={8} xs={10}>
        <Grid
          container
          rowSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
          columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
          sx={{ p: { xl: 2, lg: 2, md: 2, sm: 2, xs: "20px 0" } }}
        >
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <ReadOnlyTextField
              fullWidth
              label="First Name"
              variant="filled"
              defaultValue=" "
              value={userDetails.fname}
            ></ReadOnlyTextField>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <ReadOnlyTextField
              fullWidth
              label="Last Name"
              variant="filled"
              defaultValue=" "
              value={userDetails.lname}
            ></ReadOnlyTextField>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyTextField
              fullWidth
              label="Email"
              value={userDetails.email}
              variant="filled"
              defaultValue=" "
            ></ReadOnlyTextField>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyTextField
              fullWidth
              label="Contact No"
              variant="filled"
              defaultValue=" "
              value={userDetails.phone}
            ></ReadOnlyTextField>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyTextField
              fullWidth
              label="Address"
              variant="filled"
              defaultValue="  "
              value={userDetails.address}
            ></ReadOnlyTextField>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Button
                variant="contained"
                onClick={handleOpenEditForm}
                startIcon={<DriveFileRenameOutlineOutlinedIcon />}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClickOpenDelete}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete Profile
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  logoutUser(userMail);
                  notify3();
                }}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Logout
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
            >
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <EditTextField
                  name="firstName"
                  fullWidth
                  helperText={
                    formik.errors.firstName ? formik.errors.firstName : " "
                  }
                  error={Boolean(formik.errors.firstName)}
                  label="First Name"
                  type="text"
                  value={formik.values.firstName}
                  variant="filled"
                  onChange={formik.handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <EditTextField
                  name="lastName"
                  fullWidth
                  helperText={
                    formik.errors.lastName ? formik.errors.lastName : " "
                  }
                  error={Boolean(formik.errors.lastName)}
                  label="Last Name"
                  type="text"
                  value={formik.values.lastName}
                  variant="filled"
                  onChange={formik.handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  name="email"
                  fullWidth
                  helperText={formik.errors.email ? formik.errors.email : " "}
                  error={Boolean(formik.errors.email)}
                  label="Email*"
                  type="email"
                  value={formik.values.email}
                  variant="filled"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  name="contactNo"
                  fullWidth
                  helperText={
                    formik.errors.contactNo ? formik.errors.contactNo : " "
                  }
                  error={Boolean(formik.errors.contactNo)}
                  label="Contact Number*"
                  type="text"
                  value={formik.values.contactNo}
                  variant="filled"
                  placeholder="Enter your contact number"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  name="address"
                  fullWidth
                  helperText={
                    formik.errors.address ? formik.errors.address : " "
                  }
                  error={Boolean(formik.errors.address)}
                  label="Address*"
                  type="text"
                  value={formik.values.address}
                  variant="filled"
                  placeholder="Enter your contact number"
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={formik.handleSubmit}
              startIcon={<DriveFileRenameOutlineOutlinedIcon />}
              disabled={!formik.isValid}
            >
              Update
            </Button>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", pl: "25px" }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigate("/signup");
              notify2();
            }}
            variant="contained"
            color="error"
            startIcon={<DeleteForeverOutlinedIcon />}
          >
            Delete
          </Button>
          <Button onClick={handleCloseDelete} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
