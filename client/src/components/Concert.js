import React from "react";
import "./Concert.css"


function Concert(props) {

  return (
    <div className="wrapper">
      <ol style={{ fontSize: '40px', color: 'green', fontStyle: 'oblique'}}>
        <div class="card" style={{backgroundColor: 'yellow'}}>
          <p>{props.topArtist[0]}: </p>
          <img src={props.photoArtist1} style={{ height: 150 }} />
          <p>Time: {props.time[0]}</p>
          <p>Venue: {props.venue[0]}</p>
          <p>Price: {props.price[0]}</p>
          <a href={props.link[0]}>More Info Here</a>
        </div> 
        <div class="card" style={{backgroundColor: 'yellow'}}>
          <p>{props.topArtist[1]}: </p>
          <img src={props.photoArtist2} style={{ height: 150 }} />
          <p>Time: {props.time[1]}</p>
          <p>Venue: {props.venue[1]}</p>
          <p>Price: {props.price[1]}</p>
          <a href={props.link[1]}>More Info Here</a>
        </div> 
        <div class="card" style={{backgroundColor: 'yellow'}}>
          <p>{props.topArtist[2]}: </p>
          <img src={props.photoArtist3} style={{ height: 150 }} />
          <p>Time: {props.time[2]}</p>
          <p>Venue: {props.venue[2]}</p>
          <p>Price: {props.price[2]}</p>
          <a href={props.link[2]}>More Info Here</a>
        </div> 
      </ol>
    </div>
  );
}

export default Concert;

