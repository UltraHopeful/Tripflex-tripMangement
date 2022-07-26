import * as React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function Index() {
  return (
    <Container maxWidth="xl" sx={{ mb: "45px" }}>
      <Typography variant="h3" align="center" sx={{ mb: 3, mt: 2 }}>
        Select Table
      </Typography>
      <Stack spacing={2} sx={{ width: "50%", mx: "auto" }}>
        <Button
          id="trip"
          variant="contained"
          color="primary"
          href={"/tripTable"}
        >
          Trip Table
        </Button>
        <Button
          id="subTrip"
          variant="contained"
          color="primary"
          href={"/subTripTable"}
        >
          Sub-Trip Table
        </Button>
        <Button
          id="payment"
          variant="contained"
          color="primary"
          href={"/paymentTable"}
        >
          Payment Table
        </Button>
      </Stack>
    </Container>
  );
}
