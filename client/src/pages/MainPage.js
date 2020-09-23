import React, { Component } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import logo from "../logo.svg";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import ReactCalendar from "../components/ReactCalendar";
import Concert from "../components/Concert";
import ConcertList from "../components/ConcertList";
import "../components/MainPage.css";
const spotifyApi = new SpotifyWebApi();

class MainPage extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "", albumArt: "" },
      myToken: token,
      favoriteArtists: [],
      favoriteArtistIDs: new Map(),
      concerts: new Map(),
      datesToConcerts: new Map(),
      currentConcerts: [],
      ready: false,
      clicked: false,
      tileContent: null,
      location: "",
      concertInfo: {
        time: ["5:00", "6:00", "7:00"],
        venue: ["HOLLYWOOD BOWL", "WELLS FARGO CENTER", "BARCLAY CENTER"],
        price: ["50$", "60$", "70$"],
        link: [
          "www.ticketmaster.com",
          "www.stubhub.com",
          "www.ticketmaster.com",
        ],
      },
    };
    this.getHashParams = this.getHashParams.bind(this);
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    await this.getTopArtists();
    await this.getArtistIDs();
    await this.getConcerts();
    this.setState(
      {
        datesToConcerts: this.removeDuplicatesAndSort(this.getConcertDates()),
      },
      () => console.log(this.state.datesToConcerts)
    );
    this.setState({ ready: true });
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  URLify = (string) => {
    return string.trim().replace(/\s/g, "%20");
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
          },
        });
      })
      .catch(() => {
        this.setState({
          nowPlaying: {
            name: "",
            albumArt: null,
          },
        });
      });
  }

  getArtistIDs = async () => {
    const table = new Map();
    await Promise.all(
      this.state.favoriteArtists.map(async (artist) => {
        const response = await axios.get(
          `https://api.songkick.com/api/3.0/search/artists.json?apikey=${
            process.env.REACT_APP_API_KEY
          }&query=${this.URLify(artist.name)}`
        );

        if (response.data.resultsPage.results.artist) {
          table.set(
            artist.name,
            response.data.resultsPage.results.artist[0].id.toString()
          );
        }
      })
    );
    this.setState({ favoriteArtistIDs: table });
  };

  getConcerts = async () => {
    let map1 = new Map();
    await Promise.all(
      this.state.favoriteArtists.map(async (artist) => {
        const response = await axios.get(
          `https://api.songkick.com/api/3.0/artists/${this.state.favoriteArtistIDs.get(
            artist.name
          )}/calendar.json?apikey=${process.env.REACT_APP_API_KEY}`
        );
        map1.set(artist.name, response.data.resultsPage.results.event);
      })
    );
    this.setState({ concerts: map1 });
  };

  async getTopArtists() {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${this.state.myToken}`,
        },
        params: {
          limit: 50,
        },
      }
    );
    this.setState({ favoriteArtists: response.data.items });
  }

  getConcertDates = () => {
    let datesToConcerts = new Map();
    this.state.concerts.forEach((value) => {
      if (value) {
        value.forEach((concert) => {
          // if it's a multi-day festival
          // then get the dates and add the dates to map with festival as values
          if (concert.end && concert.start.date !== concert.end.date) {
            const allDates = this.getDates(
              concert.start.date,
              concert.end.date
            );
            allDates.forEach((date) => {
              // if date is already in map then just add the concert to the value array
              if (
                datesToConcerts.has(date) &&
                !datesToConcerts.get(date).includes(concert)
              ) {
                datesToConcerts.set(date, [
                  ...datesToConcerts.get(date),
                  concert,
                ]);
                // else, make a new key-value pair
              } else {
                // console.log(date);
                // console.log(concert);
                datesToConcerts.set(date, [concert]);
              }
            });
            // else if its a single day concert/festival and the date is already in the map
            // then just add the concert to the value array
          } else if (datesToConcerts.has(concert.start.date)) {
            datesToConcerts.set(concert.start.date, [
              ...datesToConcerts.get(concert.start.date),
              concert,
            ]);
          } else {
            datesToConcerts.set(concert.start.date, [concert]);
          }
        });
      }
    });
    return datesToConcerts;
  };

  getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  };

  removeDuplicatesBy = (keyFn, array) => {
    var mySet = new Set();
    return array.filter(function (x) {
      var key = keyFn(x),
        isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  };

  dateToObject = (dateString) => {
    const dateArr = dateString.split("-");
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];
    return new Date(year, month, day);
  };

  objectToDate = (dateString) => {
    const year = dateString.getFullYear();
    const month = dateString.getMonth();
    let monthString = "";
    if (month <= 8) {
      monthString = `0${month + 1}`;
    } else {
      monthString = `${month + 1}`;
    }
    const day = dateString.getDate();
    let dayString = "";
    if (day <= 9) {
      dayString = `0${day}`;
    } else {
      dayString = `${day}`;
    }
    const date = `${year}-${monthString}-${dayString}`;
    return date;
  };

  removeDuplicatesAndSort = (table) => {
    let b = new Map();
    for (let [key, value] of table) {
      b.set(
        key,
        this.removeDuplicatesBy((x) => x.id, table.get(key))
      );
    }
    return new Map([...b.entries()].sort());
  };

  doStuffWithDate = async (date) => {
    const x = await this.state.datesToConcerts.get(this.objectToDate(date));
    this.setState({ currentConcerts: x });
  };

  render() {
    return (
      <div className='main-page'>
        <Navbar />
        <div className='App' style={{ backgroundColor: "" }}>
          <div>
            {this.state.ready == true ? (
              <ReactCalendar
                datesToConcerts={this.state.datesToConcerts}
                handleClick={this.handleClick}
                loggedIn={this.state.loggedIn}
                myCallback={this.doStuffWithDate}
              />
            ) : (
              ""
            )}
          </div>
          <div className='concert-list-wrapper'>
            {this.state.ready == true ? (
              <ConcertList
                concerts={this.state.currentConcerts}
                artistToConcerts={this.state.concerts}
              />
            ) : (
              ""
            )}
          </div>

          {/* <p id={"after"}></p>
        <div>
          {this.state.loggedIn ? (
            <Concert
              photoArtist1={this.state.artistPhoto[0]}
              photoArtist2={this.state.artistPhoto[1]}
              photoArtist3={this.state.artistPhoto[2]}
              topArtist={this.state.artistNames}
              time={this.state.concertInfo.time}
              venue={this.state.concertInfo.venue}
              price={this.state.concertInfo.price}
              link={this.state.concertInfo.link}
              clicked={this.state.clicked}
            />
          ) : null}
        </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
