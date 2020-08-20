import React, { useState } from "react";
import "./ReactCalendar.css";

function Concert(props) {
 

  return (
    <div>
      <ol>
        <li>{props.topArtist[0]}</li>
        <li>{props.topArtist[1]}</li>
        <li>{props.topArtist[2]}</li>
      </ol>
    </div>
  );
}

export default Concert;

