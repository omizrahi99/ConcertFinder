import React from "react";
import ReactDOM from 'react-dom';


class Forms extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location: "",
      // submitted: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.location)
    ReactDOM.render(
      <div>
        {this.state.location ? <p>Concert Location: {this.state.location}</p> : null}
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
      color: 'white', backgroundColor: 'green', border: 'none', padding: '3px', paddingRight: '5px', paddingLeft: '5px', borderRadius: '5px'
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label style={{color: 'blue'}}>Location: </label>
            <input type='text' value={location} name="location" onChange={this.changeHandler} placeholder="Enter Location"/>
          <button style={styling} type='submit'>OK</button>
        </div>
      </form>
    )
  }
}

export default Forms;

