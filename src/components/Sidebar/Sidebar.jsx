import React from 'react';
import { Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import styles from './Sidebar.module.css';

const Sidebar = ({ filters, setFilters }) => {
  const today = new Date().toISOString().split('T')[0]; // Get "YYYY-MM-DD" format
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow's date

  return (
    <aside className={styles.sidebar}>
      <Typography variant="h6" className={styles.filterTitle}>Course Code</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search course (e.g., CS2500)"
        value={filters.course || ''}
        onChange={(e) => setFilters({ ...filters, course: e.target.value })}
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