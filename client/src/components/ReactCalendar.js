import React, { useState } from "react";
import Calendar from "react-calendar";
import "./ReactCalendar.css";

function ReactCalendar(props) {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
  }


  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        className='react-calendar'
        tileContent={props.tileContent}
        tileDisabled={({ date }) => date.getDay() === 0}
        onClickDay={props.handleClick}
      />
        {props.loggedIn ? <h1 className='dateStyle'>Date: {date.toDateString()}</h1> : null}
    </div>
  );
}

export default ReactCalendar;
