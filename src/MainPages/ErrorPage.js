import React, { Component } from 'react';
import Header from '../Header';

class ErrorPage extends Component {
  render() {
    return(
      <div>
        <Header />
        <h1 style={{color: "white"}}> Tähän tulee error sivu </h1>
      </div>
    )
  }
}

export default ErrorPage;
