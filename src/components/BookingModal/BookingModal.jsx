import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";

export default function BookingModal({
  setOpen,
  open,
  bookingDetails,
  showSuccessMessage,
}) {
  const [email, setEmail] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    triggerEvent();

    const bookings = localStorage.getItem("bookings") || "[]";

    const oldBookings = JSON.parse(bookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify([
        ...oldBookings,
        { ...bookingDetails, bookingEmail: email },
      ])
    );
    showSuccessMessage(true);
    setEmail("");
    setOpen(false);
  };

  const triggerEvent = () => {
    // Ensure dataLayer is defined
    window.dataLayer = window.dataLayer || [];

    // Function to push the first_visit event to the dataLayer
    function triggerFirstVisitEvent() {
      window.dataLayer.push({
        event: "first_visit",
        eventDate: new Date().toISOString(), // Optional: track the exact time of the event
      });
    }

    triggerFirstVisitEvent();
  };

  const formatDate = (day) => {
    if (day) {
      const date = new Date(day);
      return format(date, "E, d LLL");
    } else {
      return null;
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: "95%",
          maxWidth: 600,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          p: { xs: 3, md: 4 },
          outline: 0,
          bgcolor: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography component="h3" variant="h3">
          Confirm booking
        </Typography>
        <Box mb={3}>
        <p>Today</p>
        <p>
        {formatDate(bookingDetails.bookingDate)}
        </p>
        <p>Morning</p>
        <p>Afternoon</p>
        <p>Evening</p>
        <p>{bookingDetails.bookingTime}</p>
        </Box>
        <Typography fontSize={14} mb={3}>
        Please enter your email to confirm booking for{" "}
        <strong>{`${bookingDetails.bookingTime} on ${formatDate(
        bookingDetails.bookingDate
        )}`}</strong>
        </Typography>
        <form onSubmit={handleBooking}>
          <Stack alignItems="flex-start" spacing={2}>
            <TextField
              type="email"
              label="Enter your email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disableElevation
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                size="large"
                disableElevation
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
