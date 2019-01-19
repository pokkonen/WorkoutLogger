import React, { Component } from 'react';
import './Workout.css';
import PropTypes from 'prop-types';

class Workout extends Component {
  constructor(props) {
    super(props);
    this.workoutContent = props.workoutContent
    this.workoutId = props.workoutId
    this.handleRemoveWorkout = this.handleRemoveWorkout.bind(this);
  }

  handleRemoveWorkout(id) {
    this.props.removeWorkout(id);
  }

  render(props){
    return(
      <div className="workout fade-in">
        <span className="closebtn"
              onClick={() => this.handleRemoveWorkout(this.workoutId)}>
              &times;
        </span>
        <p className="workoutContent">{ this.workoutContent }</p>
      </div>
    )
  }
}

Workout.propTypes = {
  workoutContent: PropTypes.string
}

export default Workout;
