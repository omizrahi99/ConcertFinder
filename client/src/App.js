import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import ReactCalendar from "./components/ReactCalendar";
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
      nowPlaying: { name: "Not Checked", albumArt: "" },
      myToken: token,
      artistNames: []
    };
    this.getHashParams=this.getHashParams.bind(this)
    this.getNowPlaying=this.getNowPlaying.bind(this)
    this.getLikedSongs=this.getLikedSongs.bind(this)
    this.getTopArtists=this.getTopArtists.bind(this)
  }


  // componentDidMount() {
  //   fetch("https://api.example.com/items")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

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
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
        },
      });
    });
  }

  async getLikedSongs() {
    const response = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${this.state.myToken}`,
      },
    });
    console.log(response.data);
  }

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
    this.setState({
      artistNames: [response.data.items[0].name, response.data.items[1].name, response.data.items[2].name]
    });

    console.log(response.data);
  }

  render() {
    this.getTopArtists();
    return (
      <div className='App'>
        <a href='http://localhost:8888'> Login to Spotify </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
        <ReactCalendar topArtist={this.state.artistNames}/>
      </div>
    );
  }
}

export default App;
