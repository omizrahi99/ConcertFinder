import React from "react";
import ConcertCard from "./ConcertCard"
import "./Concert.css"




function Concert(props) {

  return (
    <div className="wrapper">
      <ol className='fontStyle'>
      <ConcertCard topArtist={props.topArtist[0]} photoArtist={props.photoArtist1} time={props.time[0]} venue={props.venue[0]} price={props.price[0]} link={props.link[0]}/>
      <ConcertCard topArtist={props.topArtist[1]} photoArtist={props.photoArtist2} time={props.time[1]} venue={props.venue[1]} price={props.price[1]} link={props.link[1]}/>
      <ConcertCard topArtist={props.topArtist[2]} photoArtist={props.photoArtist3} time={props.time[2]} venue={props.venue[2]} price={props.price[2]} link={props.link[2]}/>
      </ol>
    </div>
  );
}

export default Concert;