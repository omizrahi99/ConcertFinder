import React, { Component } from "react";
import ConcertCard from "./ConcertCard"
import "./Concert.css"


class Concert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
    this.changeHandler=this.changeHandler.bind(this)
  }
  

  

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    const {location} = this.state
  //   const styling = {
  //   color: 'white', backgroundColor: 'green', border: 'none', padding: '3px', paddingRight: '5px', paddingLeft: '5px', borderRadius: '5px', fontFamily: '-apple-family', fontSize: '27px'
  // }

  




 
  return (
    <div>
      <form>
        <div>
          <label style={{color: 'blue', fontFamily: '-apple-family', fontSize: '35px'}}>Location: </label>
          <input style={{height: '30px', width: '200px', fontSize: '20px', fontFamily: '-apple-family'}} type='text' value={location} name="location" onChange={this.changeHandler} placeholder="Enter Location"/>
          {/* <button style={styling} type='submit'>Search</button> */}
        </div>
      </form>
      { this.props.clicked ? 
      <div className="wrapper">
        <ol className='fontStyle'>
          {location.toUpperCase() === this.props.venue[0] || !location ? <ConcertCard topArtist={this.props.topArtist[0]} photoArtist={this.props.photoArtist1} time={this.props.time[0]} venue={this.props.venue[0]} price={this.props.price[0]} link={this.props.link[0]}/> : null}
          {location.toUpperCase() === this.props.venue[1] || !location ? <ConcertCard topArtist={this.props.topArtist[1]} photoArtist={this.props.photoArtist2} time={this.props.time[1]} venue={this.props.venue[1]} price={this.props.price[1]} link={this.props.link[1]}/> : null}
          {location.toUpperCase() === this.props.venue[2] || !location ? <ConcertCard topArtist={this.props.topArtist[2]} photoArtist={this.props.photoArtist3} time={this.props.time[2]} venue={this.props.venue[2]} price={this.props.price[2]} link={this.props.link[2]}/> : null}
        </ol>
      </div> : null
      }
    </div>
  );
  }
}

export default Concert;

