import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Example icon
import buildingData from "../administrator/building_data.json";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export default function AdministratorMyBookingSubmit() {
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00 a.m.");
  const [endTime, setEndTime] = useState("11:30 a.m.");

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
    setFloor("");
    setRoom("");
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
    setRoom("");
  };

  const handleRoomChange = (event) => setRoom(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);

  const selectedBuilding = buildingData.buildings.find(
    (bldg) => bldg.id === building
  );
  const selectedFloor = selectedBuilding?.floors.find(
    (flr) => flr.id === floor
  );

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <CenteredBox>
        {/* Box containing the icon in the top-right corner */}
        <Box
          sx={{
            position: "relative", // Parent box set to relative
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "24px",
            textAlign: "left",
          }}
        >
          {/* IconButton for the top-right corner */}
          <IconButton
            sx={{
              position: "absolute",
              top: 16, // Distance from the top of the box
              right: 16, // Distance from the right edge
              color: "#864E41",
            }}
            onClick={() => navigate("/security/administrator/mybookinglist")}
          >
            <MoreVertIcon />
          </IconButton>

          {/* Main content of the form */}
          <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
            My Booking Form
          </Typography>
          <Typography sx={{ mt: "-12px" }} variant="subtitle1">
            Detailed Information
          </Typography>

          <Divider sx={{ width: "100%", mt: 2, mb: 3 }} />

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: 500,
            }}
          >
            {/* Form Fields */}
            <FormControl fullWidth>
              <InputLabel id="building-label">Building</InputLabel>
              <Select
                labelId="building-label"
                id="building"
                value={building}
                label="Building"
                onChange={handleBuildingChange}
              >
                {buildingData.buildings.map((bldg) => (
                  <MenuItem key={bldg.id} value={bldg.id}>
                    {bldg.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Floor Dropdown */}
            <FormControl fullWidth disabled={!building}>
              <InputLabel id="floor-label">Floor</InputLabel>
              <Select
                labelId="floor-label"
                id="floor"
                value={floor}
                label="Floor"
                onChange={handleFloorChange}
              >
                {selectedBuilding?.floors.map((flr) => (
                  <MenuItem key={flr.id} value={flr.id}>
                    {flr.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Room No. Dropdown */}
            <FormControl fullWidth disabled={!floor}>
              <InputLabel id="room-label">Room No.</InputLabel>
              <Select
                labelId="room-label"
                id="room"
                value={room}
                label="Room No."
                onChange={handleRoomChange}
              >
                {selectedFloor?.rooms.map((rm) => (
                  <MenuItem key={rm.id} value={rm.id}>
                    {rm.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date Picker */}
            <TextField
              fullWidth
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Time Range */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl sx={{ width: "48%" }}>
                <InputLabel id="start-time-label">Start Time</InputLabel>
                <Select
                  labelId="start-time-label"
                  id="start-time"
                  value={startTime}
                  label="Start Time"
                  onChange={handleStartTimeChange}
                >
                  <MenuItem value="08:00 a.m.">08:00 a.m.</MenuItem>
                  <MenuItem value="09:00 a.m.">09:00 a.m.</MenuItem>
                  <MenuItem value="10:00 a.m.">10:00 a.m.</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: "48%" }}>
                <InputLabel id="end-time-label">End Time</InputLabel>
                <Select
                  labelId="end-time-label"
                  id="end-time"
                  value={endTime}
                  label="End Time"
                  onChange={handleEndTimeChange}
                >
                  <MenuItem value="11:00 a.m.">11:00 a.m.</MenuItem>
                  <MenuItem value="11:30 a.m.">11:30 a.m.</MenuItem>
                  <MenuItem value="12:00 p.m.">12:00 p.m.</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#864E41",
                "&:hover": {
                  backgroundColor: "#6e3f35", // Optional: Darker shade for hover
                },
                color: "#fff", // Ensure the text is readable (white in this case)
              }}
              onClick={() => navigate("/security/administrator/mybookinglist")}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </CenteredBox>
    </ThemeProvider>
  );
}
