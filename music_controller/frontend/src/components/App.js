import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage";
// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";

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
          {/* <RoomJoinPage />
          <CreateRoomPage /> to not have all of these shown on the same page, we use react-router */}
        </div>
      );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)