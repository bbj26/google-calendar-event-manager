import React, { useEffect, useState } from "react";
import { getCalendarEvents } from "../../api/auth";
import CalendarEvents from "../../components/CalendarEventsList/index";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./styles.css";
import { showToastifyError } from "../../utils/toastify";

function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetEvents = async () => {
      try {
        const response = await getCalendarEvents();
        setEvents(response);
      } catch (error: any) {
        showToastifyError(error);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    handleGetEvents();
  }, [navigate]);

  return (
    <div className="homepage-container">
      <Typography variant="h4">Google Calendar Events Manager</Typography>

      {events.length ? (
        <CalendarEvents events={events} />
      ) : (
        <p>Loading events</p>
      )}
    </div>
  );
}

export default Home;
