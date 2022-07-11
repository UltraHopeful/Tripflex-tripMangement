import React,{useState} from "react";
import {Button, InputAdornment} from "@mui/material";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ValidationTextField } from "../../components/TextfieldCustom";


// cite : https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h
// I used some of the code from article, but I change as per my preferences

// @ts-ignore
export const LoginForm = props => {

    const [visiblePassword, setVisiblePassword] = useState(false);
    const showPassword = () => setVisiblePassword(!visiblePassword);
    const hiddenPassword = () => setVisiblePassword(!visiblePassword);

    const {
        values: {email, password},
        errors,
        handleSubmit,
        handleChange,
        isValid
    } = props;

    return (
        <form onSubmit={handleSubmit}>
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
                name="password"
                helperText={errors.password ? errors.password : " "}
                error={Boolean(errors.password)}
                label="Password*"
                type={visiblePassword ? "text" : "password"}
                value={password}
                variant="filled"
                placeholder="Enter your password"
                InputProps={{ // <-- This is where the toggle button is added.
                    disableUnderline: true
                    ,endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle show password"
                                onClick={showPassword}
                                onMouseDown={hiddenPassword}
                            >
                                {visiblePassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                onChange={handleChange}
            />
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" sx={{marginBottom:"10px"}} /> */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="flex-center"
                startIcon={<LoginOutlinedIcon/>}
                disabled={!isValid}
            >
                Login
            </Button>
        </form>

    );
};
