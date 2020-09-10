import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import ReactCalendar from "./components/ReactCalendar";
import Concert from "./components/Concert";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
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
    this.setState({ datesToConcerts: this.getConcertDates() }, () => {
      console.log(this.state.datesToConcerts);
    });
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
    this.state.concerts.forEach((value, key) => {
      if (value) {
        value.forEach((concert) => {
          if (datesToConcerts.has(concert.start.date)) {
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

  render() {
    return (
      <div className='App' style={{ backgroundColor: "" }}>
        <div>
          {!this.state.loggedIn ? (
            <a href='http://localhost:8888'> Login with Spotify </a>
          ) : (
            <a href='http://localhost:8888'> Log out </a>
          )}
          {this.state.nowPlaying.name === "" ? null : (
            <div>Now Playing: {this.state.nowPlaying.name}</div>
          )}
          <div>
            <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
          </div>
          {this.state.loggedIn && (
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          )}
        </div>
        <div>
          <h1
            style={{
              color: "blue",
              fontSize: "70px",
              fontFamily: "Arial",
            }}
          >
            {" "}
            Concert Finder{" "}
          </h1>
          <ReactCalendar
            handleClick={this.handleClick}
            loggedIn={this.state.loggedIn}
          />
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
    );
  }
}

export default App;
