import React from "react";


function ConcertCard(props) {

  return (
        <div class="card" style={{backgroundColor: 'aqua'}}>
          <p>{props.topArtist}: </p>
          <img src={props.photoArtist} style={{ height: 150 }} />
          <p>Time: {props.time}</p>
          <p>Venue: {props.venue}</p>
          <p>Price: {props.price}</p>
          <a href={props.link}>More Info Here</a>
        </div> 
  );
}

export default ConcertCard;