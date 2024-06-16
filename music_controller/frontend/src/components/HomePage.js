import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Switch, Router, Link, Redirect } from "react-router-dom";

// don't need to render since app.js is already rendered

export default class HomePage extends Component{
    constructor(props) {
        super(props); //parent constructor
    }

    render() {
        return 
        <Router>
            <Switch>
                <Route exact path='/'><p>This is the home page</p></Route>
                <Route path='/join' component = {RoomJoinPage}></Route> 
                <Route path='/create' component = {CreateRoomPage}></Route> { /* have to add the path to both django and react */}

            </Switch>
        </Router>;
    }
}