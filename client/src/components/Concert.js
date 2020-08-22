import React from "react";


function Concert(props) {

  return (
    <div>
      <ol style={{ fontSize: '40px',
    color: 'green', margin: '0px', padding:'0px'}}>
        <img src={props.photoArtist1} style={{ height: 150 }} /> 
        <p>{props.topArtist[0]}</p>
        <img src={props.photoArtist2} style={{ height: 150 }} /> 
        <p>{props.topArtist[1]}</p>
        <img src={props.photoArtist3} style={{ height: 150 }} /> 
        <p>{props.topArtist[2]}</p>
      </ol>
    </div>
  );
}

export default Concert;

