import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage";

export default class App extends Component {
    constructor(props) {
      super(props);
      // this.state = {

      // } state of webpage. Can re-render one component instead of the whole page.
    }
  
    render() {
      return (
        <div>
          <HomePage />
        </div>
      );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)