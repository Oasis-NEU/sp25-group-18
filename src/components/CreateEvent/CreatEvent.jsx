import React, { useState } from "react";

const CreateEventForm = () => {
  // Existing state for the other inputs
  const [eventName, setEventName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [location, setLocation] = useState("online");
  const [time, setTime] = useState("");
  const [userCount, setUserCount] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect all data, including the new description field
    const eventData = {
      eventName,
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
    } else {
      setUserCount(value);
    }
  };

  // Apply a red border when the value is negative
  const userCountInputStyle = userCount < 0 ? { borderColor: "red" } : {};

  return (
    <div className="main-container">
      <h2 className="Create-Events">Create Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
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
            onChange={handleUserCountChange} // Updated to use custom handler
            style={userCountInputStyle} // Apply the custom style
          />
          {/* Submit Button */}
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
