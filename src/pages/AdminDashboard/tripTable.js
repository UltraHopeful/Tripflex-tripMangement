import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function TripTable() {
  const tripsUrl =
    "https://wdwdl60f52.execute-api.us-east-1.amazonaws.com/getTrips";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    fetch(tripsUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        console.log(res.trips[0]);
        setTripData(res.trips);
      });
    });
  }, []);

  const columns = [
    { field: "tripId", headerName: "ID", width: 130 },
    { field: "tripName", headerName: "Trip Name", width: 200 },
    { field: "organizer", headerName: "Organizer", width: 150 },
    { field: "tripAccomodation", headerName: "Accomodation", width: 200 },
    { field: "tripDuration", headerName: "Duration", width: 200 },
    { field: "tripExtraCharges", headerName: "Extra Charges", width: 150 },
    { field: "tripItinerary", headerName: "Itinerary", width: 200 },
    { field: "tripPrice", headerName: "Trip Price", width: 130 },
    { field: "type", headerName: "Trip Type", width: 130 },
  ];
  const [finalClickInfo, setFinalClickInfo] = useState(null);
  const rows = tripData;

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: "45px" }}>
      <Typography variant="h3" align="center" sx={{ mb: 3, mt: 2 }}>
        Trip Table
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ backgroundColor: "white" }}
          columns={columns}
          rows={rows}
          getRowId={(row) => row.tripId}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleOnCellClick}
        />
        <Paper sx={{ mt: "15px", width: "auto", mx: "auto", p: "15px" }}>
          <Box
            sx={{
              mx: "auto",
              width: "auto",
              height: "auto",
              backgroundColor: "white",
            }}
          >
            {finalClickInfo && `${finalClickInfo.value}`}
          </Box>
        </Paper>
      </div>
    </Container>
  );
}
