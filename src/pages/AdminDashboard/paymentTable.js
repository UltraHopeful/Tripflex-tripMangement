import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function PaymentTable() {
  const tripsUrl =
    "https://wdwdl60f52.execute-api.us-east-1.amazonaws.com/getPayment";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    fetch(tripsUrl, requestOptions).then((response) => {
      response.json().then((res) => {
        console.log(res.payment[0]);
        setTripData(res.payment);
      });
    });
  }, []);

  const columns = [
    { field: "email", headerName: "User Id", width: 200 },
    { field: "paymentId", headerName: "Payment Id", width: 130 },
    {
      field: "noOfPersonInTrip",
      headerName: "Available Capacity",
      width: 200,
    },
    { field: "orderStatus", headerName: "Order Status", width: 150 },
    { field: "paymentCard", headerName: "Card Number", width: 200 },
    { field: "paymentDate", headerName: "Payment Date", width: 200 },
    { field: "subTripId", headerName: "Sub-Trip Id", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 200 },
  ];
  const [finalClickInfo, setFinalClickInfo] = useState(null);
  const rows = tripData;

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: "45px" }}>
      <Typography variant="h3" align="center" sx={{ mb: 3, mt: 2 }}>
        Payment Table
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ backgroundColor: "white" }}
          columns={columns}
          rows={rows}
          getRowId={(row) => row.paymentId}
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
