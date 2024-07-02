import React from "react";
import { CalendarEvent } from "../../types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EventCardProps {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {event.summary}
        </Typography>
        <Typography color="textSecondary">{event.description}</Typography>
        <Typography color="textSecondary">
          Start Date: {event.start.date}
        </Typography>
        <Typography color="textSecondary">
          End Date: {event.end.date}
        </Typography>
        <Typography color="primary">
          <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
            Event Link
          </a>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(event)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(event)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
