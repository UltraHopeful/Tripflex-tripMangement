import {
  Card, Container,
  Grid,
  Paper, Typography
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Index() {
  const tripsUrl =
    "https://wdwdl60f52.execute-api.us-east-1.amazonaws.com/getTrips";

  // const tripData = [];

  const [tripData, setTripData] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(tripsUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        console.log(res.trips[0]);
        setTripData(res.trips);
      });
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" align="center" sx={{mb:3,mt:2}}>Trips to explore</Typography>
      <div>
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            {tripData.map((trip, index) => {
              return (
                <Grid item xl={6} lg={6} md={6} sm={10} xs={11} key={index}>
                  <Card
                    sx={{
                      p: "10px 10px 10px 10px",
                    }}
                    elevation={3}
                  >
                    <Grid container spacing={2}>
                      <Grid item xl={5} lg={6} md={12} sm={12} xs={12}>
                        {/* <CardMedia
                          component="img"
                          src="https://source.unsplash.com/collection/9263865/1280x720"
                          alt="green iguana"
                          className="rounded-1 img-responsive"
                        /> */}
                        <img
                          alt="random"
                          src={trip.tripImageUrl}
                          className="img-responsive rounded-1"
                        />
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography variant="subtitle1" color="primary" component="div">
                            CA$ {trip.tripPrice}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              {trip.tripName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {trip.tripDuration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Organizer : {trip.organizer}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body2"
                            >
                              Remove
                            </Typography>
                          </Grid>
                        </Grid>
                        {/* <Grid item>
                          <Typography variant="subtitle1" color="primary" component="div">
                            CA$ {trip.tripPrice}
                          </Typography>
                        </Grid> */}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
            <Grid item xl={6} lg={6} md={6} sm={10} xs={11}>
              <Paper
                sx={{
                  p: "10px 10px 10px 10px",
                }}
                elevation={3}
              >
                <Grid container spacing={2}>
                  <Grid item xl={3} lg={4} md={6} sm={10} xs={11}>
                    <img
                      alt="random"
                      src="https://source.unsplash.com/random/"
                      className="img-responsive rounded-1"
                    />
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          Standard license
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Full resolution 1920x1080 • JPEG
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: 1030114
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ cursor: "pointer" }} variant="body2">
                          Remove
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        $19.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
