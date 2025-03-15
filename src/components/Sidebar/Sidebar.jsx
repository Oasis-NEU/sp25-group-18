import React from 'react';
import { Typography, Autocomplete, TextField, FormControlLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import styles from './Sidebar.module.css';

const courses = ["CS2500", "CS3000", "MATH1234", "PHIL1101", "BIO1103", "ECON2001"];

const Sidebar = ({ filters, setFilters }) => {
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
      <RadioGroup value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })}>
        <FormControlLabel value={new Date().toISOString().split('T')[0]} control={<Radio />} label="Today" />
        <FormControlLabel 
          value={new Date(Date.now() + 86400000).toISOString().split('T')[0]} 
          control={<Radio />} 
          label="Tomorrow" 
        />
        <FormControlLabel 
          value="weekend" 
          control={<Radio />} 
          label="This Weekend" 
        />
        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
      </RadioGroup>
      
      <Typography variant="h6" className={styles.filterTitle}>Format</Typography>
      <RadioGroup value={filters.format} onChange={(e) => setFilters({ ...filters, format: e.target.value })}>
        <FormControlLabel value="offline" control={<Radio />} label="Offline" />
        <FormControlLabel value="online" control={<Radio />} label="Online" />
      </RadioGroup>

      <Typography variant="h6" className={styles.filterTitle}>Group Size</Typography>
      <FormControlLabel 
        control={<Checkbox 
          checked={filters.groupSize?.includes("small") || false} 
          onChange={(e) => {
            const newGroupSize = e.target.checked 
              ? [...(filters.groupSize || []), "small"] 
              : filters.groupSize.filter(size => size !== "small");
            setFilters({ ...filters, groupSize: newGroupSize });
          }} 
        />} 
        label="2-5 people" 
      />
      <FormControlLabel 
        control={<Checkbox 
          checked={filters.groupSize?.includes("medium") || false} 
          onChange={(e) => {
            const newGroupSize = e.target.checked 
              ? [...(filters.groupSize || []), "medium"] 
              : filters.groupSize.filter(size => size !== "medium");
            setFilters({ ...filters, groupSize: newGroupSize });
          }} 
        />} 
        label="6-10 people" 
      />
      <FormControlLabel 
        control={<Checkbox 
          checked={filters.groupSize?.includes("large") || false} 
          onChange={(e) => {
            const newGroupSize = e.target.checked 
              ? [...(filters.groupSize || []), "large"] 
              : filters.groupSize.filter(size => size !== "large");
            setFilters({ ...filters, groupSize: newGroupSize });
          }} 
        />} 
        label="10+ people" 
      />
    </aside>
  );
};

export default Sidebar;