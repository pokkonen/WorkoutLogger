import React, { Component } from 'react';
import './Header.css';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return(
      <div className="workoutsHeader">
        <h1 className="marginLeft" style={{marginTop: "0px"}}>React & Firebase WorkoutLogger</h1>
        <Link to={"/home"} className="headerButton headerButtonGroup">Home</Link>
        <Link to={"/new"} className="headerButton ">New Page</Link>
        <Link to={"/logout"} className="headerButton2" style={{}}>Sign Out</Link>
      </div>
    )
  }
}

export default Header;
