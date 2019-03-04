import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './ErrorPage.css';

class ErrorPage extends Component {
  render() {
    return(
      <div>
        <div className="errorBox">
          <h1 style={{color: "white"}}> Page could not be found :( </h1> <br />
          <Link to={"/home"} className="homeButton">Back to home page</Link>
        </div>
      </div>
    )
  }
}

export default ErrorPage;
