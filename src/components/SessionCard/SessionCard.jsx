import React from 'react';
import styles from './SessionCard.module.css';
import { Button, Card, CardContent, Typography, Chip } from '@mui/material';
import { AccessTime as TimeIcon, LocationOn as LocationIcon, PeopleAlt as PeopleIcon, Link as LinkIcon } from '@mui/icons-material';

const SessionCard = ({ session, onJoin }) => {
  let formattedTime = "Time not specified";
  if (session.time) {
    try {
      formattedTime = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(session.time));
    } catch (error) {
      console.error("Error formatting time:", error);
    }
  }


  return (
    <Card className={styles.card} elevation={3}>
      <CardContent>
        <div className={styles.header}>
          <Typography variant="h6" className={styles.title}>
            {session.title}
          </Typography>
          <Chip label={session.format === "online" ? "Online" : "Offline"} size="small" color="primary" />
        </div>

        {/* Time */}
        <div className={styles.details}>
          <Typography variant="body2" className={styles.detailItem}>
            <TimeIcon fontSize="small" /> {formattedTime}
          </Typography>

          {/* Show location if offline, meeting link if online */}
          {session.format === "offline" ? (
            <Typography variant="body2" className={styles.detailItem}>
              <LocationIcon fontSize="small" /> {session.location || "Location not specified"}
            </Typography>
          ) : (
            <Typography variant="body2" className={styles.detailItem}>
              <LinkIcon fontSize="small" /> 
              <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                Join Meeting
              </a>
            </Typography>
          )}
        </div>

        <div className={styles.footer}>
          <Typography variant="body2" className={styles.participants}>
            <PeopleIcon fontSize="small" /> {session.participant_count || 0}/{session.max_participants}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => onJoin(session.id)}
            disabled={session.participants?.length >= session.max_participants}
          >
            {session.participants?.length >= session.max_participants ? "Full" : "Join/Leave"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;