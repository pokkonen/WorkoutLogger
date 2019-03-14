import React, { Component } from 'react';
import './NewPage.css';
import Header from '../Header';

class NewPage extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className="tempFont">
          <p className="textAnimation">New page for displaying information of the workout history.</p>
        </div>
      </div>
    )
  }
}

export default NewPage;
