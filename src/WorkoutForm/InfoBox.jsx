import React, { Component } from 'react';
import './InfoBox.css';

class InfoBox extends Component {
  render() {
    return(
      <div className="Collapse">
        This application counts calories burned based on workout and average heart rate. Each workout has individual factor.
        For now calorie burn is simply calculated based on average burn 2200 calories per day.<br />
        <ul>
          <li>Gym 1.2</li>
          <li>Jogging 1.6</li>
          <li>Cycling 1.4</li>
          <li>Swimming 1.4</li>
          <li>Hiking 1.3</li>
          <li>Walking 1.2</li>
        </ul>
        <ul>
          <li>HR zone 50-90</li>
          <li>HR zone 91-150</li>
          <li>HR zone 151+</li>
        </ul>
      </div>
    )
  }
}

export default InfoBox;
