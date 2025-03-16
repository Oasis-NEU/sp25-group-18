import React from 'react';
import { Typography, Autocomplete, TextField, FormControlLabel, Checkbox } from '@mui/material';
import styles from './Sidebar.module.css';

const courses = ["CS2500", "CS3000", "MATH1234", "PHIL1101", "BIOL1111", "ECON2001"];

const Sidebar = ({ filters, setFilters }) => {
  const today = new Date().toISOString().split('T')[0]; // Get "YYYY-MM-DD" format
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow's date

  return (
    <aside className={styles.sidebar}>
      <Typography variant="h6" className={styles.filterTitle}>Course Code</Typography>
      <Autocomplete
        options={courses}
        getOptionLabel={(option) => option}
        value={filters.course || null}
        onChange={(event, newValue) => setFilters({ ...filters, course: newValue })}
        renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Search course (e.g., CS2500)" />}
      />

      <Typography variant="h6" className={styles.filterTitle}>Date</Typography>
      {[
        { label: "Today", value: today },
        { label: "Tomorrow", value: tomorrow },
        { label: "This Weekend", value: "weekend" },
        { label: "Custom", value: "custom" }
      ].map(({ label, value }) => (
        <FormControlLabel
          key={value}
          control={
            <Checkbox
              checked={filters.date === value}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  date: prev.date === value ? "" : value, // Toggle date correctly
                }))
              }
            />
          }
          label={label}
        />
      ))}

      <Typography variant="h6" className={styles.filterTitle}>Format</Typography>
      {["offline", "online"].map((format) => (
        <FormControlLabel
          key={format}
          control={
            <Checkbox
              checked={filters.format === format}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  format: prev.format === format ? "" : format, // Toggle selection
                }))
              }
            />
          }
          label={format === "offline" ? "Offline" : "Online"}
        />
      ))}

      <Typography variant="h6" className={styles.filterTitle}>Group Size</Typography>
      {["small", "medium", "large"].map((size, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={filters.groupSize?.includes(size) || false}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  groupSize: e.target.checked
                    ? [...(prev.groupSize || []), size]
                    : prev.groupSize.filter((s) => s !== size),
                }));
              }}
            />
          }
          label={
            size === "small" ? "2-5 people" :
            size === "medium" ? "6-10 people" :
            "10+ people"
          }
        />
      ))}
    </aside>
  );
};

export default Sidebar;
