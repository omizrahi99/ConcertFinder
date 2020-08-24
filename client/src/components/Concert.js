import React from "react";
import "./Concert.css"


function Concert(props) {

  return (
    <div className="wrapper">
      <ol style={{ fontSize: '40px', color: 'green', fontStyle: 'oblique'}}>
        <p>{props.topArtist[0]}: </p>
        <img src={props.photoArtist1} style={{ height: 150 }} /> 
        <p>{props.topArtist[1]}: </p>
        <img src={props.photoArtist2} style={{ height: 150 }} /> 
        <p>{props.topArtist[2]}: </p>
        <img src={props.photoArtist3} style={{ height: 150 }} /> 
      </ol>
    </div>
  );
}

export default Concert;

