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
import { Link, useNavigate } from "react-router-dom";
import { getIdToken } from "../../util/getIdToken";

export default function Main() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams.get("id"));
  const navigate = useNavigate();
  const tripId = queryParams.get("id");
  const idToken = getIdToken();
  const [subtripData, setSubtripData] = useState([]);
  const [tripData, setTripData] = useState([]);

  const [subTripDate, setSubTripDate] = React.useState("");
  const [subTripSeats, setSubTripSeats] = React.useState(0);

  const [seats, setSeats] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [maxSeats, setMaxSeats] = useState(0);

  const handleDate = (event) => {
    setSubTripDate(event.target.value);
    for (const subTripEach of subtripData) {
      if (subTripEach.date === event.target.value) {
        setSubTripSeats(subTripEach.availableCapacity);
      }
    }
  };

  // handle the maximum value for redeem
  const handleCapacity = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value > subTripSeats) {
      value = subTripSeats;
    }

    if (value < 0) {
      value = 0;
    }

    setSeats(value);
    setTotalAmount(value*tripData.tripPrice);
  };

  const toPayment = () => {
    console.log(subTripDate);
    console.log(seats);
    let paymentData = {}
    for (const subTripEach of subtripData) {
      if (subTripEach.date === subTripDate) {
        paymentData['subTripId'] = subTripEach.subTripId;
        paymentData['date'] = subTripEach.date;
        paymentData['tripName'] = tripData.tripName;
        paymentData['noOfPersonInTrip'] = seats;
        paymentData['totalAmount'] = totalAmount;
        paymentData['tripName'] = tripData.tripName;
      }
    }
    console.log(paymentData)
    navigate("/payment",{state : paymentData})
  }

  const bodyContent = JSON.stringify({
    tripId: tripId,
  });

  const Divider1 = styled(Divider)(({ theme }) => ({
    "&.MuiDivider-root": {
      "&::before": {
        borderTop: `2px solid ${theme.palette.primary.main}`,
      },
      "&::after": {
        borderTop: `2px solid ${theme.palette.primary.main}`,
      },
    },
  }));

  const Divider2 = styled(Divider)(({ theme }) => ({
    "&.MuiDivider-root": {
      borderColor: `${theme.palette.primary.main}`,
      width: "70%",
      borderWidth: "1px",
      borderRadius: "10px",
    },
  }));

  const Divider3 = styled(Divider)(({ theme }) => ({
    "&.MuiDivider-root": {
      borderColor: `${theme.palette.primary.main}`,
      borderWidth: "1px",
      borderRadius: "10px",
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: idToken },
    body: bodyContent,
  };

  const fetchSubTripUrl =
    "https://wdwdl60f52.execute-api.us-east-1.amazonaws.com/getDetailedTrip";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(fetchSubTripUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        // console.log(res.trips[0]);
        // console.log(typeof res.trips[0]);
        // console.log(res.trip);
        console.log(res.subTrips);
        setTripData(res.trip);
        setSubtripData(res.subTrips);
      });
    });
  }, []);

  return (
    <div>
      {tripId === undefined || tripId === null ? (
        <div>No id given so no subtrip to show</div>
      ) : (
        <div>
          <Container sx={{ mb: "30px" }}>
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              sx={{ my: 9, mx: "auto", pb: 4, width: "100%" }}
              className="elevation-4"
              spacing={2}
            >
              <Grid item xs={12}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" pt={2} align="center">
                    Back To Home
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography pt={2} align="center" variant="h5">
                  Trip Booking
                </Typography>
                <hr className="hr-fancy1" />
              </Grid>
              <Grid
                item
                xl={7}
                lg={7}
                md={11}
                sm={11}
                xs={11}
                alignItems="center"
                pr="16px"
              >
                <img
                  id="tripImage"
                  alt="File to upload see here"
                  src={tripData.tripImageUrl}
                  className="trip-img rounded-1"
                />
                {/*<img alt="complex" className="profile-img" src="https://source.unsplash.com/random/?portrait,men" />*/}
              </Grid>

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid
                  container
                  maxWidth
                  rowSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
                  columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
                  sx={{ p: { xl: 2, lg: 2, md: 2, sm: 2, xs: "20px 20px" } }}
                >
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    wrap="nowrap"
                  >
                    <Typography
                      variant="h5"
                      textAlign="center"
                      className="hr-primary"
                    >
                      {tripData.tripName}
                    </Typography>
                    <Divider3 />
                  </Grid>

                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Organizer</Typography>
                    <Typography variant="body1">
                      {tripData.organizer}
                    </Typography>
                  </Grid>

                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Trip Duration</Typography>
                    <Typography variant="body1">
                      {tripData.tripDuration}
                    </Typography>
                  </Grid>

                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Trip Price</Typography>
                    <Typography variant="body1" color="primary">
                      CA$ {tripData.tripPrice} / person
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Travel Information</Typography>
                    <Typography variant="body1">
                      {tripData.tripTravelInformation}
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Travel Accomodation</Typography>
                    <Typography variant="body1">
                      {tripData.tripAccomodation}
                    </Typography>
                  </Grid>
                  <Grid item xl={12} lg={12} md={6} sm={12} xs={12}>
                    <Typography variant="h6">Trip Extra Charges</Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                      {tripData.tripExtraCharges}
                    </Typography>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h6">Travel Itenerary</Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                      {tripData.tripItinerary}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid
                  container
                  maxWidth
                  rowSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
                  columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
                  sx={{ p: { xl: 2, lg: 2, md: 2, sm: 2, xs: "20px 20px" } }}
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="dateHandle">Available Date</InputLabel>
                      <Select
                        labelId="dateHandle"
                        id="date-select"
                        value={subTripDate}
                        label="Available Date"
                        onChange={handleDate}
                      >
                        {subtripData.map((subTrip) => {
                          return (
                            <MenuItem value={subTrip.date} key={subTrip.index}>
                              {subTrip.date}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Typography id="availability" variant="body2">
                      Available Seats : {subTripSeats}
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      type="number"
                      inputProps={{ min: 0, max: subTripSeats }}
                      value={seats}
                      onChange={(e) => handleCapacity(e)}
                      label="Select Seats"
                      fullWidth
                    />
                    <Typography variant="body2">
                      Total Bill Amount : CA$ {totalAmount}
                    </Typography>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button
                      variant="contained"
                      sx={{ display: "flex", mx: "auto" }}
                      onClick={toPayment}
                    >
                      Checkout
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}
