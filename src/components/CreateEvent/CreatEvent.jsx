import React, { useState } from "react";
import supabase from "../../supabaseClient";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    format: "offline",
    location: "",
    meeting_link: "",
    time: "",
    max_participants: "10",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.title.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (!eventData.time) {
      alert("Please enter a valid date and time.");
      return;
    }
    if (eventData.format === "offline" && !eventData.location.trim()) {
      alert("Please enter a location for offline events.");
      return;
    }
    if (eventData.format === "online" && !eventData.meeting_link.trim()) {
      alert("Please enter a valid meeting link for online events.");
      return;
    }
    if (parseInt(eventData.max_participants) <= 0) {
      alert("Max participants must be at least 1.");
      return;
    }

    const newEvent = {
      id: uuidv4(),
      title: eventData.title,
      format: eventData.format,
      location: eventData.format === "offline" ? eventData.location : null,
      meeting_link:
        eventData.format === "online" ? eventData.meeting_link : null,
      time: eventData.time ? new Date(eventData.time).toISOString() : null,
      max_participants: parseInt(eventData.max_participants) || 10,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("studysessions")
      .insert([newEvent]);

    if (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } else {
      console.log("Event created:", data);
      alert("Event created successfully!");

      setEventData({
        title: "",
        format: "offline",
        location: "",
        meeting_link: "",
        time: "",
        max_participants: "10",
      });
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography variant="h4" className={styles.title} align="center">
        Create Event
      </Typography>

      <Box className={styles.formBox}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={styles.input}
          />

          <TextField
            select
            label="Format"
            name="format"
            value={eventData.format}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={styles.input}
          >
            <MenuItem value="offline">Offline</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </TextField>

          {eventData.format === "offline" && (
            <TextField
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              className={styles.input}
            />
          )}

          {eventData.format === "online" && (
            <TextField
              label="Meeting Link"
              name="meeting_link"
              value={eventData.meeting_link}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              className={styles.input}
            />
          )}

          <TextField
            type="datetime-local"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className={styles.input}
          />

          <TextField
            type="number"
            label="Max Participants"
            name="max_participants"
            value={eventData.max_participants}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ min: 1 }}
            className={styles.input}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
          >
            Create Event
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateEvent;
