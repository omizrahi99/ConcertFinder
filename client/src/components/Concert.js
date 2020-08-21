import React from "react";


function Concert(props) {


  return (
    <div>
      <ul>
        <li>{props.topArtist[0]}</li>
        <li>{props.topArtist[1]}</li>
        <li>{props.topArtist[2]}</li>
      </ul>
    </div>
  );
}

export default Concert;

