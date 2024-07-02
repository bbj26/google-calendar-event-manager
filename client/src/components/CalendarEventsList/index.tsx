import React, { useEffect, useState } from "react";
import { CalendarEvent } from "../../types";
import { Button, Grid } from "@mui/material";
import EventCard from "../EventCard";
import DeleteEventModal from "../DeleteEventModal";
import EditEventModal from "../EditEventModal";
import AddEventModal from "../AddEventModal";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from "../../api/calendar";
import { showToastifySuccess, showToastifyError } from "../../utils/toastify";
import "./styles.css";

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

  const handleConfirmDelete = async () => {
    if (selectedEvent) {
      try {
        await deleteCalendarEvent(selectedEvent.id);
        setEventList(
          eventList.filter((event) => event.id !== selectedEvent.id)
        );
        setShowDeleteModal(false);
        setSelectedEvent(null);
        showToastifySuccess("Event successfully deleted!");
      } catch (error) {
        showToastifyError("Failed to delete event.");
      }
    }
  };

  const handleUpdateEvent = async (updatedEvent: CalendarEvent) => {
    try {
      await updateCalendarEvent(updatedEvent.id, updatedEvent);
      setEventList(
        eventList.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      setShowEditModal(false);
      setSelectedEvent(null);
      showToastifySuccess("Event successfully updated!");
    } catch (error) {
      showToastifyError("Failed to update event.");
    }
  };

  const handleSaveNewEvent = async (newEvent: CalendarEvent) => {
    try {
      const createdEvent = await createCalendarEvent(newEvent);
      const updatedEventList = [...eventList, createdEvent].sort((a, b) => {
        return (
          new Date(a.start.date).getTime() - new Date(b.start.date).getTime()
        );
      });
      setEventList(updatedEventList);
      setShowAddModal(false);
      showToastifySuccess("Event successfully created!");
    } catch (error) {
      showToastifyError("Failed to create event.");
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Event
      </Button>
      <div className="scrollable-container">
        <Grid container spacing={2}>
          {eventList.map((event) => (
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
