import React, { useState } from "react";
import { CalendarEvent } from "../../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newEvent: CalendarEvent) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    summary: "",
    description: "",
    start: { date: "" },
    end: { date: "" },
  });
  const [newEventErrorMessage, setNewEventErrorMessage] = useState<String>("");

  const handleChange = (field: keyof CalendarEvent, value: any) => {
    setNewEvent({
      ...newEvent,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (
      newEvent.start &&
      newEvent.start.date &&
      newEvent.end &&
      newEvent.end.date &&
      newEvent.summary
    ) {
      onSave(newEvent as CalendarEvent);
      setNewEvent({
        summary: "",
        description: "",
        start: { date: "" },
        end: { date: "" },
      });
      setNewEventErrorMessage("");
      onClose();
    } else {
      setNewEventErrorMessage(
        "Please populate all required fields: Summary, Start date, End date"
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="summary"
          label="Summary*"
          type="text"
          fullWidth
          value={newEvent.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={newEvent.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <TextField
          margin="dense"
          id="startDate"
          label="Start Date*"
          type="date"
          fullWidth
          value={newEvent.start?.date || ""}
          onChange={(e) =>
            handleChange("start", { ...newEvent.start, date: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="endDate"
          label="End Date*"
          type="date"
          fullWidth
          value={newEvent.end?.date || ""}
          onChange={(e) =>
            handleChange("end", { ...newEvent.end, date: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        {newEventErrorMessage && (
          <p style={{ color: "red" }}>{newEventErrorMessage}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
