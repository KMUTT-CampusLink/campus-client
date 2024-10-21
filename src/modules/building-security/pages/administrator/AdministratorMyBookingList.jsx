import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";
import bookingData from './booking_list.json';

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export default function AdministratorMyBookingList() {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // Load booking data from the imported JSON file
    setBookings(bookingData.bookings);
  }, []);

  // Handle opening the dialog
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  // Handle confirming deletion
  const handleConfirmDelete = () => {
    setBookings(bookings.filter((b) => b !== selectedBooking));
    handleCloseDialog();
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <CenteredBox>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "24px",
            textAlign: "left",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
            My Booking List
          </Typography>

          <Divider sx={{ width: "100%", mt: 2, mb: 3 }} />

          {/* Add new booking button (top-right corner) */}
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#864E41",
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => navigate("/security/administrator/mybooking")}
          >
            <AddCircleIcon />
          </IconButton>

          {/* Table Headers */}
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "600px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "8px", marginBottom: "10px" }}>
            <Typography sx={{ flex: 1, fontWeight: "bold" }}>Room</Typography>
            <Typography sx={{ flex: 1, fontWeight: "bold" }}>Date</Typography>
            <Typography sx={{ flex: 1, fontWeight: "bold" }}>Time</Typography>
            <Box sx={{ width: "40px" }} /> {/* Placeholder for the delete icon */}
          </Box>

          {/* Scrollable list of bookings */}
          <Box sx={{ width: "100%", maxWidth: "600px", maxHeight: "400px", overflowY: "auto" }}>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#fff",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography sx={{ flex: 1 }}>{booking.room}</Typography>
                  <Typography sx={{ flex: 1 }}>{booking.date}</Typography>
                  <Typography sx={{ flex: 1 }}>{booking.time}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(booking)}
                    sx={{
                      color: "#d32f2f",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography>No bookings available</Typography>
            )}
          </Box>
        </Box>
      </CenteredBox>

      {/* Dialog for confirming deletion */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography sx={{ fontWeight: "bold" }}>Cancel Booking</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <Typography sx={{ flex: 1 }}>{selectedBooking.room}</Typography>
                <Typography sx={{ flex: 1 }}>{selectedBooking.date}</Typography>
                <Typography sx={{ flex: 1 }}>{selectedBooking.time}</Typography>
              </Box>
              <Typography align="center">Are you sure?</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "#d32f2f",
              '&:hover': {
                backgroundColor: "#c62828",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
