import React, { useState } from "react";
import { CalendarEvent } from "../../types";
import { Grid } from "@mui/material";
import EventCard from "../EventCard/index";
import DeleteEventModal from "../DeleteEventModal/index";
import EditEventModal from "../EditEventModal/index";
import "./styles.css";

interface CalendarEventsProps {
  events: CalendarEvent[];
}

const CalendarEvents: React.FC<CalendarEventsProps> = ({ events }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handleDelete = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      console.log("Deleting event:", selectedEvent.id);
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    console.log("Updating event:", updatedEvent);
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="scrollable-container">
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {selectedEvent && (
        <>
          <DeleteEventModal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
          />
          <EditEventModal
            open={showEditModal}
            event={selectedEvent}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdateEvent}
          />
        </>
      )}
    </div>
  );
};

export default CalendarEvents;
