import React, { Component } from 'react';
import './WorkoutForm.css';

class WorkoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newWorkoutContent: '',
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeWorkout = this.writeWorkout.bind(this);
  }

  // Saves the user input to newWorkoutContent
  handleUserInput(e) {
    this.setState({
      newWorkoutContent: e.target.value
    })
  }

  writeWorkout() {
    this.props.addWorkout(this.state.newWorkoutContent);
    // Sets newWorkoutContent back to empty string after sending the information
    this.setState({
      newWorkoutContent: ''
    })
  }

  render() {
    return(
      <div className="workoutWrapper">
        <input className="workoutInput"
               placeholder="Write a new workout..."
               value={this.state.newWorkoutContent}
               onChange={this.handleUserInput} />
        <button className="workoutButton"
                onClick={this.writeWorkout}>Add workout</button>
      </div>
    )
  }
}

export default WorkoutForm;
