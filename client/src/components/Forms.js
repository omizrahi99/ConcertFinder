import React from "react";


class Forms extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location: ""
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.location)
    return(
      <div>
        <p>{this.state.location}</p>
      </div>
    )
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }
  
  render(){
    const {location} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label style={{color: 'blue'}}>Location: </label>
            <input type='text' value={location} name="location" onChange={this.changeHandler}></input>
          <button type='submit'>OK</button>
          <p>Location: {this.state.location}</p>
        </div>
      </form>
    )
  }
}

export default Forms;

