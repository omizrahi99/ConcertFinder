import React from "react";
import ReactDOM from 'react-dom';
import './Forms.css'


class Forms extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    ReactDOM.render(
      <div>
        {this.state.location ? <h1 className>Concert Location: {this.state.location.toUpperCase()}</h1> : null}
      </div>,
      document.getElementById('after')
    );
  }



  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render(){
    const {location} = this.state
    const styling = {
      color: 'white', backgroundColor: 'green', border: 'none', padding: '3px', paddingRight: '5px', paddingLeft: '5px', borderRadius: '5px', fontFamily: 'serif', fontSize: '27px'
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label style={{color: 'blue', fontFamily: 'serif', fontSize: '35px'}}>Location: </label>
            <input style={{height: '30px', width: '200px', fontSize: '20px'}} type='text' value={location} name="location" onChange={this.changeHandler} placeholder="Enter Location"/>
          <button style={styling} type='submit'>Search</button>
        </div>
      </form>
    )
  }
}

export default Forms;

