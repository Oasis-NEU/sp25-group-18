import React from 'react';
import styles from './SessionCard.module.css';
import { Button, Card, CardContent, Typography, Chip } from '@mui/material';
import { AccessTime as TimeIcon, LocationOn as LocationIcon, PeopleAlt as PeopleIcon } from '@mui/icons-material';

const SessionCard = ({ session, onJoin }) => {
  let formattedTime = "Time is not right";
  if (session.time) {
    try {
      formattedTime = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(session.time));
    } catch (error) {
      console.error("Wrong format", error);
    }
  }

  return (
    <Card className={styles.card} elevation={3}>
      <CardContent>
        <div className={styles.header}>
          <Typography variant="h6" className={styles.title}>
            {session.title}
          </Typography>
          <Chip label={session.subject} size="small" color="primary" />
        </div>

        <div className={styles.details}>
          <Typography variant="body2" className={styles.detailItem}>
            <TimeIcon fontSize="small" /> {formattedTime}
          </Typography>
          <Typography variant="body2" className={styles.detailItem}>
            <LocationIcon fontSize="small" /> {session.location || "No Place"}
          </Typography>
        </div>

        <div className={styles.footer}>
          <Typography variant="body2" className={styles.participants}>
            <PeopleIcon fontSize="small" /> {session.participants ? session.participants.length : 0}/{session.max_participants}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => onJoin(session.id)}
            disabled={session.participants?.length >= session.maxParticipants}
          >
            {session.participants?.length >= session.maxParticipants ? "Full" : "Join"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;