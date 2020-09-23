import React, { useState, useEffect } from "react";
import ConcertCard from "../components/ConcertCard";

function ConcertList(props) {
  console.log(props.artistToConcerts);

  // create map
  // for each current day concert
  // create array of artists
  // for each value in artistToConcerts
  // if concert is in ar
  return (
    <div class='concert-list d-flex justify-content-center'>
      <ul>
        {props.concerts
          ? props.concerts.map((concert, index) => {
              //iterate over values of concerts and make array of artists for that concert
              console.log(concert);
              return (
                <li key={index}>
                  {/* <h1>{concert.displayName}</h1>
              {concert.performance.map((event) => {
                if (props.artistToConcerts.has(event.displayName)) {
                  return <p>{event.displayName}</p>;
                }
              })} */}
                  <ConcertCard
                    concert={concert}
                    artistToConcerts={props.artistToConcerts}
                  />
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default ConcertList;
