import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./ReactCalendar.css";

function ReactCalendar(props) {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
    props.myCallback(date);
  }

  useEffect(() => {
    props.myCallback(new Date());
  }, []);

  function dateToObject(dateString) {
    const dateArr = dateString.split("-");
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];
    return new Date(year, month, day);
  }

  let keys = [...props.datesToConcerts.keys()];

  const disabledDates = keys.map((key) => {
    return dateToObject(key);
  });

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        className='react-calendar'
        tileDisabled={({ date, view }) =>
          view === "month" && // Block day tiles only
          !disabledDates.some(
            (disabledDate) =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
          )
        }
        tileContent={props.tileContent}
        onClickDay={props.handleClick}
      />
    </div>
  );
}

export default ReactCalendar;
