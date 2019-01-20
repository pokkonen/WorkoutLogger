import React, { Component } from 'react';
import './Workout.css';
import PropTypes from 'prop-types';

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      edited: this.props.workoutContent
    }

    this.handleRemoveWorkout = this.handleRemoveWorkout.bind(this);
    this.handleEditWorkout = this.handleEditWorkout.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleRemoveWorkout(id) {
    this.props.removeWorkout(id);
  }

  handleEditWorkout() {
    this.setState({
      editing: !this.editing
    })
  }

  handleEdit(e) {
    this.setState({
      edited: e.target.value
    })
  }

  handleSave() {
    this.setState({
      editing: false
    })
    this.props.editWorkout(this.props.workoutId, this.state.edited);
  }

  render(props){
    return(
      <div className="container workout fade-in">
        <div>
          <button className="col-2 btn btn-danger deletebtn"
                  onClick={() => this.handleRemoveWorkout(this.props.workoutId)}>
                  Delete
          </button>
          <button className="col-2 btn btn-warning editbtn disabled"
                  onClick={() => {alert("Edit button is under construction! Sorry for the inconvenience.")} }>
                                  {/*this.handleEditWorkout(this.props.workoutId) */}
                  Edit
          </button>
          <div className="col-6 workoutContent">
            { this.state.editing ?
            <div>
              <input className="text" value={this.state.edited} onChange={this.handleEdit} />
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
