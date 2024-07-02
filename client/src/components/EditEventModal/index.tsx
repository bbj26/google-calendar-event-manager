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

interface EditEventModalProps {
  open: boolean;
  event: CalendarEvent;
  onClose: () => void;
  onSave: (updatedEvent: CalendarEvent) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  event,
  onClose,
  onSave,
}) => {
  const [updatedEvent, setUpdatedEvent] = useState<CalendarEvent>(event);

  const handleChange = (field: keyof CalendarEvent, value: any) => {
    setUpdatedEvent({
      ...updatedEvent,
      [field]: value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="summary"
          label="Summary"
          type="text"
          fullWidth
          defaultValue={updatedEvent.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          defaultValue={updatedEvent.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <TextField
          margin="dense"
          id="startDate"
          label="Start Date"
          type="date"
          fullWidth
          defaultValue={updatedEvent.start.date}
          onChange={(e) =>
            handleChange("start", {
              ...updatedEvent.start,
              date: e.target.value,
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="endDate"
          label="End Date"
          type="date"
          fullWidth
          defaultValue={updatedEvent.end.date}
          onChange={(e) =>
            handleChange("end", { ...updatedEvent.end, date: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSave(updatedEvent)} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventModal;
