import React, { Component } from 'react';
import './NewPage.css';
import Header from '../Header';

class NewPage extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className="tempFont">
          <h1>New page for displaying information of the workout history.</h1>
        </div>
      </div>
    )
  }
}

export default NewPage;
