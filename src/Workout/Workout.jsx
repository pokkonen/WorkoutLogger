import React, { Component } from 'react';
import './Workout.css';
import PropTypes from 'prop-types';

export default class Workout extends Component {
  constructor(props) {
    super(props);
    this.workoutContent = props.workoutContent
    this.workoutId = props.WorkoutId
  }

  render(props){
    return(
      <div className="workout fade-in">
        <p className="workoutContent">{ this.workoutContent }</p>
      </div>
    )
  }
}

Workout.propTypes = {
  workoutContent: PropTypes.string
}
