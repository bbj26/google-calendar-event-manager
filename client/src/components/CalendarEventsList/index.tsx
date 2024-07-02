import React from "react";

function CalendarEventsList({ events }: any) {
  return (
    <div>
      <h1>CalendarEventsList</h1>
      <p>{JSON.stringify(events)}</p>
    </div>
  );
}

export default CalendarEventsList;
