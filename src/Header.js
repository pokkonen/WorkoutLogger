import React, { Component } from 'react';
import './Header.css';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return(
      <div className="workoutsHeader">
        <h1 className="marginLeft">React & Firebase WorkoutLogger</h1>
        <Link to={"/home"} className="marginButton headerButton">Home</Link>
        <Link to={"/new"} className="headerButton">New Page</Link>
      </div>
    )
  }
}

export default Header;
