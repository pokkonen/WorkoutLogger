import React, { Component } from 'react';
import './WelcomePage.css';
import {Link} from "react-router-dom";

class WelcomePage extends Component {
  render() {


    return(
      <div>
        <div className="welcomeBox">
          <h1>Welcome to WorkoutLogger!</h1>
          <h3> Please click the button below to get to the app.</h3>
          <h5> Login page coming soon... </h5>
        </div>
        <Link to={"/home"} className="welcomeButton">Jump in!</Link>
      </div>
    )
  }
}

export default WelcomePage;
