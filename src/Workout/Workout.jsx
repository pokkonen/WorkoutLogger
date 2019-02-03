import React, { Component } from 'react';
import './Workout.css';
import PropTypes from 'prop-types';

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      workout: this.props.workoutContent,
      avgHR: this.props.avgHR,
      duration: this.props.duration,
    }

    this.handleRemoveWorkout = this.handleRemoveWorkout.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleEditWorkout = this.handleEditWorkout.bind(this);
    this.handleEditAvgHR = this.handleEditAvgHR.bind(this);
    this.handleEditDuration = this.handleEditDuration.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleRemoveWorkout(id) {
    this.props.removeWorkout(id);
  }

  handleEditing() {
    this.setState({
      editing: !this.editing
    })
  }

  handleEditWorkout(e) {
    console.log(this.state.workout)
    this.setState({
      workout: e.target.value,
    })
  }

  handleEditAvgHR(e) {
    this.setState({
      avgHR: e.target.value,
    })
  }

  handleEditDuration(e) {
    this.setState({
      duration: e.target.value,
    })
  }

  handleSave() {
    this.setState({
      editing: false
    })
    this.props.editWorkout(this.props.workoutId, this.state.workout, this.state.avgHR, this.state.duration);
  }

  render(props){
    return(
      <div className="container workout fade-in">
        <div>
          <button className="col-2 btn btn-danger deletebtn"
                  onClick={() => this.handleRemoveWorkout(this.props.workoutId)}>
                  Delete
          </button>
          <button className="col-2 btn btn-warning editbtn"
                  onClick={() => this.handleEditing(this.props.workoutId)}>
                  Edit
          </button>
          <div className="col-6 workoutContent">
            { this.state.editing ?
            <div className="">
              <p>Workout: <input className="text floatRight" value={this.state.workout} onChange={this.handleEditWorkout} /></p>
              <p>AvgHR:   <input className="text floatRight" value={this.state.avgHR} onChange={this.handleEditAvgHR} /></p>
              <p>Duration:<input className="text floatRight" value={this.state.duration} onChange={this.handleEditDuration} /></p>
              <button className="btn btn-success"onClick={this.handleSave}> Save </button>
            </div>
            : <div>
                <p>Workout: { this.props.workoutContent }</p>
                <p>AvgHR (bpm): { this.props.avgHR } </p>
                <p>Duration (min): { this.props.duration } </p>
                <p>Calories burned: { this.props.calories }</p>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

Workout.propTypes = {
  workoutContent: PropTypes.string
}

export default Workout;
