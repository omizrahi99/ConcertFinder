import React from "react";


function Forms(props) {

  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <label style={{color: 'blue'}}>Location: </label>
            <input type='text' value={props.location}></input>
          <button type='submit'>OK</button>
        </div>
      </form>
  );
}

export default Forms;

