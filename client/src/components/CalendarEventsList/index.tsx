import React, { useState } from "react";
import { CalendarEvent } from "../../types";
import { Button, Grid } from "@mui/material";
import EventCard from "../EventCard/index";
import DeleteEventModal from "../DeleteEventModal/index";
import EditEventModal from "../EditEventModal/index";
import "./styles.css";
import AddEventModal from "../AddEventModal";
import { createCalendarEvent } from "../../api/auth";
import { showToastifySuccess } from "../../utils/toastify";

interface CalendarEventsProps {
  events: CalendarEvent[];
}

const CalendarEvents: React.FC<CalendarEventsProps> = ({ events }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventList, setEventList] = useState<CalendarEvent[]>(events);

  const handleDelete = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
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

  const handleSaveNewEvent = (newEvent: CalendarEvent) => {
    createCalendarEvent(newEvent);
    setEventList([...eventList, { ...newEvent, id: `${Date.now()}` }]);
    showToastifySuccess("Event successfully created!");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Event
      </Button>
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

      <AddEventModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewEvent}
      />
    </div>
  );
};

export default CalendarEvents;
