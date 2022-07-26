import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Button,
  Container,
  Input,
  InputAdornment,
  MenuItem,
  Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { EditTextField } from "../../components/TextfieldCustom";

export default function Main() {
  const location = useLocation();

  const tripTypes = [
    {
      value: "Trip",
    },
    {
      value: "Cruise",
    },
  ];

  let imageUrl = "";
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpenEditForm = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let uploadingFileName = "";

  let finalFileUrl = "";

  let getSignedURL =
    "https://66lfk8xs6h.execute-api.us-east-1.amazonaws.com/default/s3FileUpload";

  function imageUriToBlob(imageUri) {
    let binary = atob(imageUri.split(",")[1]);
    let array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    let blobData = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    return blobData;
  }

  const fileChange = (event) => {
    let files = event.target.files || event.dataTransfer.files;
    console.log(files[0]);
    uploadingFileName = files[0]["name"];
    console.log(uploadingFileName);
    let reader = new FileReader();
    reader.onload = (event) => {
      console.log(event);
      imageUrl = event.target.result;
    };
    reader.readAsDataURL(files[0]);
    console.log(imageUrl);
  };

  const uploadFile = async () => {
    getSignedURL += "?filename=" + uploadingFileName;
    console.log(getSignedURL);
    fetch(getSignedURL)
      .then(async (response1) => {
        const dataSignedUrl = await response1.json();
        const uploadUrl = dataSignedUrl.uploadURL;
        console.log(uploadUrl);
        // check for error response
        if (!response1.ok) {
          // get error message from body or default to response statusText
          const error =
            (dataSignedUrl && dataSignedUrl.message) || response1.statusText;
          return Promise.reject(error);
        }
        console.log(imageUrl);

        const blobData = imageUriToBlob(imageUrl);
        console.log(blobData);

        const uploadedFileUrl = await fetch(uploadUrl, {
          method: "PUT",
          body: blobData,
        });
        console.log("Result: ", uploadedFileUrl);
        finalFileUrl = uploadedFileUrl.url.split("?")[0];
        console.log(finalFileUrl);
        document.getElementById("tripImage").src = finalFileUrl;
        document.getElementById("fileuploadmsg").innerHTML =
          "File uploaded successfully";
        document.getElementById("fileInputForUpload").style.display = "none";
        document.getElementById("uploadFileBtn").style.display = "none";
      })
      .catch((error) => {
        console.error("There was an error in file uploading!", error);
      });
  };

  const validations = Yup.object({
    firstName: Yup.string("Enter first name")
      .min(3, "Minimum 3 characters needed")
      .required("First name is required"),
    lastName: Yup.string("Enter first name")
      .min(3, "Minimum 3 characters needed")
      .required("First name is required"),
    email: Yup.string("Enter your email")
      .email("Enter valid email like abc@xyz.com")
      .required("Email is required"),
    contactNo: Yup.string("Enter your contact number")
      .matches(
        "^[+]{1}\\d{1}[\\s]{1}\\(\\d{3}\\)[\\s]{1}\\d{3}[-]{1}\\d{4}$",
        "Enter valid contact number"
      )
      .required("Contact number is required"),
    address: Yup.string("Enter address")
      .matches(
        "(([A-Za-z0-9 \\S]+),([A-Za-z0-9 ]+),([A-Za-z0-9 ]+),([A-Za-z0-9 ]+))",
        "Enter valid address"
      )
      .required("Address is required"),
  });

  const notify = () => {
    toast.success("Your details updated successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify2 = () => {
    console.log("Delete profile");
    toast.success("Your account deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify3 = () => {
    console.log("Signout user");
    toast.success("Your successfully logged out", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [tripType, setTripType] = React.useState("");

  const handleTrip = (event) => {
    setTripType(event.target.value);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     contactNo: "",
  //     address: "",
  //   },
  //   validationSchema: validations,
  //   enableReinitialize: true,
  //   onSubmit: (values) => {
  //     // alert(JSON.stringify(formik.values, null, 2));
  //     console.log("Update profile");
  //     notify();
  //     handleClose();
  //   },
  // });
  const todayDate = new Date().toISOString().slice(0, 10);
  const [subTrip, setSubTrip] = useState([{ date: todayDate, totalCapcity: "" }]);

  let handleChange = (index, event) => {
    let newSubtrip = [...subTrip];
    newSubtrip[index][event.target.name] = event.target.value;
    setSubTrip(newSubtrip);
    console.log(subTrip);
  };

  let addSubtrip = () => {
    setSubTrip([...subTrip, { date: todayDate, totalCapcity: "" }]);
  };

  let removeSubtrip = (i) => {
    let newSubtrip = [...subTrip];
    newSubtrip.splice(i, 1);
    setSubTrip(newSubtrip);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(subTrip));
  };

  let handleFormSubmit = (event) => {
    const createTripUrl = "https://jjf5i5v234.execute-api.us-east-1.amazonaws.com/default/createTrip"
    event.preventDefault();
    console.log(event);
    console.log(document.getElementById("tripImage").src);
    const tripDetails = {
      tripImageUrl: document.getElementById("tripImage").src,
      tripName: event.target.tripName.value,
      organizer: event.target.organizer.value,
      tripDuration: event.target.tripDuration.value,
      tripPrice: event.target.tripPrice.value,
      type: event.target.tripType.value,
      tripTravelInformation: event.target.travelInformation.value,
      tripAccomodation: event.target.travelAccomodation.value,
      tripItinerary: event.target.travelItinerary.value,
      tripExtraCharges: event.target.extraCharges.value,
    };
    console.log(tripDetails);
    const subTripDetails = subTrip;
    console.log(subTripDetails);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ "trip": tripDetails,"subTrip":subTripDetails }),
    };

    fetch(createTripUrl, requestOptions)
        .then((response) => {
          response.json().then((res) => {
            const responseData = res;
            console.log(responseData);
            toast.success("Trip added successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            window.location.reload();
          });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  };
 

  return (
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
          <Typography pt={2} align="center" variant="h5">
            Create Trip
          </Typography>
          <hr className="hr-fancy1" />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={11} xs={11} alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", height: "auto" }}>
              <img
                id="tripImage"
                alt="File to upload see here"
                src="#"
                className="trip-img rounded-1"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "auto",
              }}
            >
              <label
                id="fileInputForUpload"
                htmlFor="file-upload"
                style={{ padding: "10px" }}
              >
                <Input
                  accept="image/jpeg"
                  id="file-upload"
                  type="file"
                  onChange={fileChange}
                />
              </label>
              <Typography id="fileuploadmsg" variant="span">
                &nbsp;
              </Typography>
              <Button
                variant="contained"
                id="uploadFileBtn"
                component="span"
                onClick={uploadFile}
                style={{ margin: "0 auto 0 auto", display: "inline-flex" }}
              >
                Upload
              </Button>
            </Box>
          </Box>
          {/*<img alt="complex" className="profile-img" src="https://source.unsplash.com/random/?portrait,men" />*/}
        </Grid>
        <Grid item xl={12}>
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
            columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
            sx={{ p: { xl: 2, lg: 2, md: 2, sm: 2, xs: "20px 20px" } }}
          >
            <form onSubmit={handleFormSubmit}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
              >
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <EditTextField
                    name="tripName"
                    fullWidth
                    helperText="Trip name"
                    label="Trip Name"
                    type="text"
                    variant="filled"
                    placeholder="Enter trip name"
                    required
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <EditTextField
                    name="organizer"
                    fullWidth
                    helperText="Organizer of the trip"
                    label="Organizer"
                    type="text"
                    variant="filled"
                    placeholder="Enter organizer of trip"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <EditTextField
                    name="tripDuration"
                    fullWidth
                    label="Trip Duration*"
                    helperText="Like 5 Nights - 5 ,Days - 6"
                    type="text"
                    variant="filled"
                    placeholder="Enter trip days"
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <EditTextField
                    name="tripPrice"
                    fullWidth
                    helperText="Please enter trip price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    label="Trip Price"
                    type="number"
                    variant="filled"
                    placeholder="Enter trip price"
                    required
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <EditTextField
                    id="tripType"
                    select
                    name="tripType"
                    label="Type of Travel"
                    variant="filled"
                    fullWidth
                    value={tripType}
                    onChange={handleTrip}
                    helperText="Please Select travel type"
                  >
                    {tripTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </EditTextField>
                </Grid>
                <Grid item xs={12}>
                  <EditTextField
                    name="travelInformation"
                    fullWidth
                    helperText="Like flight ticket with class of coach"
                    label="Travel Information*"
                    type="text"
                    variant="filled"
                    placeholder="Enter flight information"
                  />
                </Grid>
                <Grid item xs={12}>
                  <EditTextField
                    name="travelAccomodation"
                    fullWidth
                    helperText="Like hotel name or similar"
                    label="Travel Accomodation*"
                    type="text"
                    variant="filled"
                    placeholder="Enter stay information"
                  />
                </Grid>
                <Grid item xs={12}>
                  <EditTextField
                    name="travelItinerary"
                    fullWidth
                    helperText="Write whole itenerary"
                    label="Travel Itinerary*"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={Infinity}
                    variant="filled"
                    placeholder="Enter your contact number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <EditTextField
                    name="extraCharges"
                    fullWidth
                    label="Extra Charges*"
                    type="text"
                    variant="filled"
                    placeholder="If any extra charge "
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: "0px" }}>
                  {subTrip.map((element, index) => (
                    <Stack
                      sx={{ mt: "15px" }}
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      id={index}
                      key={index}
                    >
                      <EditTextField
                        type="date"
                        name="date"
                        label="Date"
                        variant="filled"
                        fullWidth
                        id={index + "date"}
                        defaultValue={todayDate}
                        // value={new Date().toISOString().slice(0, 10)}
                        inputProps={{ min: todayDate }}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                      <EditTextField
                        type="number"
                        name="totalCapcity"
                        label="Total Capacity"
                        variant="filled"
                        fullWidth
                        id={index + "cap"}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                      {index ? (
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: "115px!important",
                            height: "40px",
                            alignSelf: "center",
                          }}
                          id={index + "remove"}
                          size="medium"
                          color="error"
                          startIcon={<RemoveCircleOutlineIcon />}
                          onClick={() => removeSubtrip()}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            minWidth: "115px!important",
                            height: "40px",
                            alignSelf: "center",
                          }}
                          color="primary"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={() => addSubtrip()}
                        >
                          Add
                        </Button>
                      )}
                    </Stack>
                  ))}
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onSubmit={handleFormSubmit}
                startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                sx={{ mt: "15px" }}
                // disabled={!formik.isValid}
              >
                Create Trip
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
