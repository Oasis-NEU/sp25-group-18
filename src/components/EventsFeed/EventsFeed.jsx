import React from 'react';
import { Box, Container } from '@mui/material';
import SessionCard from '../SessionCard/SessionCard';
import styles from './EventsFeed.module.css';

const EventsFeed = ({ events, onJoin }) => {
  return (
    <Container className={styles.container}>
      <Box className={styles.eventsWindow}>
        <div className={styles.eventsGrid}>
          {events.map(event => (
            <SessionCard 
              key={event.id} 
              session={event} 
              onJoin={onJoin}   
            />
          ))}
        </div>
      </Box>
    </Container>
  );
};

export default EventsFeed;