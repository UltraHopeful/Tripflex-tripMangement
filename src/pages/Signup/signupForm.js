import React, { useState } from "react";
import { Button, Grid, InputAdornment } from "@mui/material";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ValidationTextField } from "../../components/TextfieldCustom";

// cite : https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h
// I used some of the code from article, but I change as per my preferences

export const SignupForm = (props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const showPassword = () => setVisiblePassword(!visiblePassword);
  const hiddenPassword = () => setVisiblePassword(!visiblePassword);

  const [visibleCPassword, setVisibleCPassword] = useState(false);
  const showCPassword = () => setVisibleCPassword(!visibleCPassword);
  const hiddenCPassword = () => setVisibleCPassword(!visibleCPassword);

  const {
    values: {
      firstName,
      lastName,
      email,
      contactNo,
      address,
      password,
      confirmPassword,
    },
    errors,
    handleSubmit,
    handleChange,
    isValid,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        rowGap={0}
        columnSpacing={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 0 }}
      >
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <ValidationTextField
            name="firstName"
            helperText={errors.firstName ? errors.firstName : " "}
            error={Boolean(errors.firstName)}
            label="First Name"
            type="text"
            value={firstName}
            variant="filled"
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <ValidationTextField
            name="lastName"
            helperText={errors.lastName ? errors.lastName : " "}
            error={Boolean(errors.lastName)}
            label="Last Name"
            type="text"
            value={lastName}
            variant="filled"
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </Grid>
      </Grid>
      <ValidationTextField
        name="email"
        helperText={errors.email ? errors.email : " "}
        error={Boolean(errors.email)}
        label="Email*"
        type="email"
        value={email}
        variant="filled"
        placeholder="Enter your email"
        onChange={handleChange}
      />

      <ValidationTextField
        name="address"
        helperText={errors.address ? errors.address : " "}
        error={Boolean(errors.address)}
        label="Address*"
        type="text"
        value={address}
        variant="filled"
        placeholder="Enter your address"
        onChange={handleChange}
      />

      <ValidationTextField
        name="contactNo"
        helperText={errors.contactNo ? errors.contactNo : " "}
        error={Boolean(errors.contactNo)}
        label="Contact Number*"
        type="text"
        value={contactNo}
        variant="filled"
        placeholder="Enter your contact number"
        onChange={handleChange}
      />

      <ValidationTextField
        name="password"
        helperText={errors.password ? errors.password : " "}
        error={Boolean(errors.password)}
        label="Password*"
        type={visiblePassword ? "text" : "password"}
        value={password}
        variant="filled"
        placeholder="Enter your password"
        onChange={handleChange}
        InputProps={{
          // <-- This is where the toggle button is added.
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle show password"
                onClick={showPassword}
                onMouseDown={hiddenPassword}
              >
                {visiblePassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <ValidationTextField
        name="confirmPassword"
        helperText={errors.confirmPassword ? errors.confirmPassword : " "}
        error={Boolean(errors.confirmPassword)}
        label="Confirm Password*"
        type={visibleCPassword ? "text" : "password"}
        value={confirmPassword}
        variant="filled"
        placeholder="Enter your password again"
        InputProps={{
          // <-- This is where the toggle button is added.
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle show password"
                onClick={showCPassword}
                onMouseDown={hiddenCPassword}
              >
                {visibleCPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className="flex-center"
        startIcon={<AppRegistrationOutlinedIcon />}
        disabled={!isValid}
      >
        Signup
      </Button>
    </form>
  );
};
