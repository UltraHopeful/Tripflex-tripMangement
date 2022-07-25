import { Button, Container, Divider, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getIdToken } from "../../util/getIdToken";

export default function Main() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams.get("id"));
  const tripId = queryParams.get("id");
  const idToken = getIdToken();
  const [subtripData, setSubtripData] = useState([]);
  const [tripData, setTripData] = useState([]);

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
        console.log(res.trip);
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
          <Container>
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              sx={{ my: 4, mx: "auto", width: "100%" }}
              className="elevation-4"
              spacing={2}
            >
              <Grid item xs={12}>
                <Link to="/" style={{textDecoration:'none'}}>
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
            </Grid>
          </Container>
        </div>
      )}
      <div>Trip booking</div>
    </div>
  );
}
