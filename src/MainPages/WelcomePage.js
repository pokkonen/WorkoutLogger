import React, { Component } from 'react';
import './WelcomePage.css';
import {Link} from "react-router-dom";

class WelcomePage extends Component {
  render() {
    return(
      <div>
        <div className="welcomeBox">
          <h1>Welcome to WorkoutLogger Application!</h1>
          <h3> Please login to use the App. </h3>
        </div>
        <Link to={"/login"} className="welcomeButton">Login</Link>
      </div>
    )
  }
}

export default WelcomePage;
