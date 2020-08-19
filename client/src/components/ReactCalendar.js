import React, { useState } from "react";
import Calendar from "react-calendar";
import "./ReactCalendar.css";

function ReactCalendar() {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }
  const tileContent = ({ date, view }) =>
    view === "month" && date.getDay() === 1 ? <p>Monday!</p> : null;

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className='calendar'
        tileContent={tileContent}
        tileDisabled={({ date }) => date.getDay() === 0}
      />
      {console.log(value)}
    </div>
  );
}

export default ReactCalendar;

