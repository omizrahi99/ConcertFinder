import React, { useState } from "react";
import Calendar from "react-calendar";
import "./ReactCalendar.css";

function ReactCalendar(props) {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  function onClick(){
    console.log(props.topArtist)
  }

  const tileContent = ({ date, view }) =>
    view === "month" && date.getDay() === 1 ? <p>{props.topArtist}</p> : null;

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className='calendar'
        tileContent={tileContent}
        tileDisabled={({ date }) => date.getDay() === 0}
        onClickDay={onClick}
      />
      {console.log(value)}
    </div>
  );
}

export default ReactCalendar;

