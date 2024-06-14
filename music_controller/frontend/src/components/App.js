import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
            <h1>{this.props.name} Code</h1> {/* the {} is for when we want to include js code inside render return statement*/}
        </div>
      );
    }
}

const appDiv = document.getElementById("app");
render(<App name="time" />, appDiv)