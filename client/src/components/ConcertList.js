import React, { useState, useEffect } from "react";
import ConcertCard from "../components/ConcertCard";
import "./ConcertList.css";

function ConcertList(props) {
  console.log(props.artistToConcerts);

  // create map
  // for each current day concert
  // create array of artists
  // for each value in artistToConcerts
  // if concert is in ar
  return (
    <div class='concert-list'>
      {props.concerts
        ? props.concerts.map((concert, index) => {
            //iterate over values of concerts and make array of artists for that concert
            console.log(concert);

            return (
              <ConcertCard
                concert={concert}
                artistToConcerts={props.artistToConcerts}
              />
            );
          })
        : ""}
    </div>
  );
}

export default ConcertList;
