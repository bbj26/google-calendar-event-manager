import React, { useEffect, useState } from "react";
import { getCalendarEvents } from "../../api/auth";
import CalendarEvents from "../../components/CalendarEventsList/index";
import { useNavigate } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetEvents = async () => {
      try {
        const response = await getCalendarEvents();
        setEvents(response);
      } catch (error: any) {
        setEventsError(error.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    handleGetEvents();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to homepage</h1>

      {events.length ? (
        <CalendarEvents events={events} />
      ) : (
        <p>Loading events</p>
      )}
      {eventsError && <p>{eventsError}</p>}
    </div>
  );
}

export default Home;
