import React, { Component } from "react";

class ConcertCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div class='card'>
        <div class='card-header'>{this.props.concert.displayName}</div>
        <div class='card-body'>
          <h5 class='card-title'>
            {this.props.concert.performance.map((event) => {
              if (this.props.artistToConcerts.has(event.displayName)) {
                return <p key={event.displayName}>{event.displayName}</p>;
              }
            })}
          </h5>
          <p class='card-text'>{this.props.concert.location.city}</p>
          <a href='#' class='btn btn-primary'>
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
}

export default ConcertCard;
