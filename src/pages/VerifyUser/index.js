import { Button, Card, Grid, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ToastContainer } from 'react-toastify';
import { ValidationTextField } from "../../components/TextfieldCustom";

import useValidation from "./validation";

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const main = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { handleChange, handleSubmit, inputValues, inputErrors, isValid } = useValidation();

    return (
        <Grid container id="signupPage"
            justifyContent="center"
            alignItems="center"
            className="loginSide1"
            sx={{ padding: "35px 0", minheight: '100vh', height: '100vh' }}
        >
            <Grid item xl={3} lg={5} md={7} sm={7} xs={11}>
                <Card sx={{ p: '1.5rem' }} elevation={5}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{ display: 'flex', mb: '10px' }}
                    >
                        <img
                            src='/tripflex.png'
                            alt="Tripflex"
                            loading="lazy"
                            className="logo-img"
                        />
                    </Typography>
                    <Typography align="center"
                        variant="h4"
                        fontWeight='medium'
                        color="black" marginBottom="20px">
                        Verify User
                    </Typography>

                    <Box sx={{ m: 4 }}></Box>
                    <form onSubmit={handleSubmit}>
                        <ValidationTextField
                            name="authCode"
                            helperText={inputErrors.authCode ? inputErrors.authCode : " "}
                            error={Boolean(inputErrors.authCode)}
                            label="Verification Code"
                            type="tel"
                            variant="filled"
                            // value={inputValues.authCode}
                            onChange={handleChange}
                            placeholder="Enter your verification code"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!isValid}
                            startIcon={<VerifiedUserOutlinedIcon />}
                            style={{ display: 'flex', margin: '0 auto 0 auto' }}
                        >
                            Verify
                        </Button>
                    </form>
                    <Box component="div"
                        sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Link display='flex' marginBottom={1} href="/" underline="none">
                            {'Back to Home'}
                        </Link>
                    </Box>
                </Card>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default main;
