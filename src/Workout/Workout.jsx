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
      <div className="workout fade-in">
        <div>
          <button className="btn btn-danger deletebtn"
                  onClick={() => this.handleRemoveWorkout(this.props.workoutId)}>
                  Delete
          </button>
          <button className="btn btn-warning editbtn"
                  onClick={() => this.handleEditWorkout(this.props.workoutId)}>
                  Edit
          </button>
          <div>
            { this.state.editing ?
              <div>
                <input className="text"
                        value={this.state.edited}
                        onChange={this.handleEdit} />
                <button className="btn btn-success"
                        onClick={this.handleSave}>Save</button>
              </div>
            : <p className="workoutContent">{ this.props.workoutContent }</p>
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
