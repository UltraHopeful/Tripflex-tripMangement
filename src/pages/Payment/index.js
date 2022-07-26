import {
  Button,
  Container,
  Divider,
  styled,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ValidationTextField,ReadOnlyTextField } from "../../components/TextfieldCustom";
import { toast } from "react-toastify";

export default function Main() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  const paymentDetails = location.state;
  paymentDetails['email'] = localStorage.getItem("userMail");
  const subTripId = paymentDetails['subTripId'];
  const [bookingAvailable, setBookingAvailable] = useState(false);

  const bodyContent = JSON.stringify({
    subTripId: subTripId,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: bodyContent,
  };

  const checkSubTripUrl =
    "https://wdwdl60f52.execute-api.us-east-1.amazonaws.com/checkSubtrip";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(checkSubTripUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        console.log(res.subTrip.availableCapacity)
        const availableSeat = res.subTrip.availableCapacity
        const isAvailable = (availableSeat > 0 ? true : false);
        console.log(isAvailable);
        if(!isAvailable){
          toast.success("Sorry no booking available", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setBookingAvailable(isAvailable);
      });
    });
  }, []);


  const bookOrderUrl =
  "https://4c06qzqrwk.execute-api.us-east-1.amazonaws.com/createPayment";
  const bookOrderRequest = () => {
    paymentDetails['paymentCard'] = (document.getElementById("paymentCardNo").value)
    console.log(paymentDetails)
    const requestContent = JSON.stringify({
      paymentDetails
    });
    const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestContent,
    };

    fetch(bookOrderUrl, requestOptions1).then((response) => {
      response.json().then((res) => {
        // console.log(res.trips[0]);
        // console.log(typeof res.trips[0]);
        // console.log(res.trip);
        console.log(res);
        toast.success(res, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      });
    });
  }


  return (
    <div>
        <div>
          <Container sx={{ mb: "30px" }}>
            <form>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                sx={{ my: 9, mx: "auto", pb: 4, width: "100%",p:"16px" }}
                className="elevation-4"
                spacing={2}
              >
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ReadOnlyTextField
                  name="email"
                  label="Email*"
                  type="email"
                  default=" "
                  value={paymentDetails.email}
                  variant="filled"
                  fullWidth
                  placeholder="Enter your email"
                />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ReadOnlyTextField
                  name="tripDate"
                  label="Trip date*"
                  type="text"
                  default=" "
                  value={paymentDetails.date}
                  variant="filled"
                  fullWidth
                  placeholder="Trip date"
                />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ReadOnlyTextField
                  name="tripName"
                  label="Trip Name*"
                  type="text"
                  default=" "
                  value={paymentDetails.tripName}
                  variant="filled"
                  fullWidth
                  placeholder="Enter your email"
                />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ReadOnlyTextField
                  name="totalAmount"
                  label="Trip total amount*"
                  type="text"
                  default=" "
                  value={paymentDetails.totalAmount}
                  variant="filled"
                  fullWidth
                  placeholder="Trip date"
                />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ReadOnlyTextField
                  name="noOfPersonInTrip"
                  label="Number of people in trip*"
                  type="text"
                  default=" "
                  value={paymentDetails.noOfPersonInTrip}
                  variant="filled"
                  fullWidth
                  placeholder="No of people in trip"
                />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ValidationTextField
                  id="paymentCardNo"
                  name="paymentCard"
                  label="Payment Card Number*"
                  type="text"
                  default=" "
                  variant="filled"
                  fullWidth
                  placeholder="Enter payment card number"
                />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Button variant="contained" sx={{mx:'auto',display:'flex'}} onClick={bookOrderRequest} disabled={!bookingAvailable}>
                    Book Now
                  </Button>
                </Grid>
                
              </Grid>
            </form>
          </Container>
        </div>
    </div>
  );
}
