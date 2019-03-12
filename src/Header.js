import React, { Component } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import { firebaseApp } from './App';

class Header extends Component {
  render() {
    return(
      <div className="headerBar">
        <h1 className="workoutsHeader">React & Firebase WorkoutLogger</h1>
        <div className="userInfo">
          Logged in: {firebaseApp.auth().currentUser.email}
        </div>
        <div className="headerButtonGroup">
          <Link to={"/home"} className="headerButton">Home</Link>
          <Link to={"/new"} className="headerButton">New Page</Link>
          <Link to={"/logout"} className="headerButton2" style={{}}>Sign Out</Link>
        </div>
      </div>
    )
  }
}

export default Header;
