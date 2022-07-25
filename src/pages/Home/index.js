import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(tripsUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        console.log(res.trips[0]);
        console.log(typeof(res.trips[0]));
        setTripData(res.trips);
      });
    });
  }, []);

  return (
    <div>
      <Container maxWidth="xl" sx={{ mb: "45px" }}>
        <Typography variant="h3" align="center" sx={{ mb: 3, mt: 2 }}>
          Trips to explore
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {tripData.map(trip => {
            return (
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={10}
                xs={11}
                key={trip.tripId+"grid"}
              >
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
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            component="div"
                          >
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
                          <Button
                            id={trip.tripId}
                            variant="text"
                            href={"/trip-book?id="+trip.tripId}
                            endIcon={
                              <ChevronRightOutlinedIcon
                                sx={{ marginBottom: "3px" }}
                              />
                            }
                          >
                            View More
                          </Button>
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
        </Grid>
      </Container>
    </div>
  );
}
