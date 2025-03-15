import React, { useState } from "react";
import "./CreateEvent.css";
import "../../index.css";

const CreateEventForm = () => {
  // Existing state for the other inputs
  const [classCode, setClassCode] = useState("");
  const [location, setLocation] = useState("online");
  const [time, setTime] = useState("");
  const [userCount, setUserCount] = useState("Attendees");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      classCode,
      location,
      time,
      userCount,
    };
    console.log(eventData); // Handle submission logic
  };

  // Prevent negative user count
  const handleUserCountChange = (e) => {
    const value = Number(e.target.value);
    // Only update if the value is non-negative
    if (value >= 0) {
      setUserCount(value);
    }
  };

  return (
    <div className="create-container">
      <div className="create-event-form">
        <h2 className="Create-Events">Create Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Class Code */}
          <input
            type="text"
            placeholder="Class Code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value.toUpperCase())} // Convert to uppercase
          />
          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="zoom">Zoom</option>
          </select>
          {/* Event Time */}
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {/* User Count */}
          <input
            type="number"
            value={userCount}
            onChange={handleUserCountChange} // Custom handler for input change
            min="0" // Prevent negative numbers
            placeholder="User Count"
          />
          {/* Submit Button */}
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
