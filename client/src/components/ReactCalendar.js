import React, { useState } from "react";
import Calendar from "react-calendar";
import style from "./ReactCalendar.css";

function ReactCalendar(props) {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
    console.log(date);
  }

  // function onClickHandler(){
  //   console.log(props.topArtist)
  // }

  // const tileContent = ({ date, view }) =>
  //   view === "month" && date.getDay() === 1 ? <p>{props.topArtist}</p> : null;

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        className='calendar'
        tileContent={props.tileContent}
        tileDisabled={({ date }) => date.getDay() === 0}
        onClickDay={props.handleClick}
      />
        {props.loggedIn ? <p>Date: {date.toString()}</p> : null}
    </div>
  );
}

export default ReactCalendar;
