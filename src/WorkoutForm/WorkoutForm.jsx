import React, { Component } from 'react';
import './WorkoutForm.css';
import Dropdown from './Dropdown';
import calculate from './CalculateCals';
import InfoBox from './InfoBox';

class WorkoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newWorkoutContent: 'Gym',
      avgHR: '',
      duration: '',
      calories: '',
      showDrop: false,
      showInfo: false,
    };

    this.handleWorkout = this.handleWorkout.bind(this);
    this.handleAvgHR = this.handleAvgHR.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.writeWorkout = this.writeWorkout.bind(this);
    this.showDrop = this.showDrop.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }

  // Saves the user input to newWorkoutContent
  handleWorkout(e)  {
    this.setState({
      newWorkoutContent: e.target.value
    })
  };

  handleAvgHR(e)  {
    this.setState({
      avgHR: e.target.value,
    })
  };

  handleDuration(e)  {
    this.setState({
      duration: e.target.value,
    })
  };

  writeWorkout(e) {
    this.props.addWorkout(this.state.newWorkoutContent, this.state.avgHR, this.state.duration,
                          calculate(this.state.newWorkoutContent, this.state.avgHR, this.state.duration));
    this.setState({
      avgHR: '',
      duration: '',
      calories: '',
    })
  }

  showDrop(selectedWorkout) {
    this.setState({
      showDrop: !this.state.showDrop,
      newWorkoutContent: selectedWorkout
    })
  }

  showInfo(){
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  render() {
    return(
      <div className="formWrapper">
        <div className="formBody">
            <h3 className="addHeading">Add workout</h3>
            <div className="addForm text-white">
              Workout
              <Dropdown showDrop={this.showDrop}/>
              {this.state.showDrop ?
                <div>
                  <br /> <br /> <br /> <br /> <br /> <br /> <br />
                </div> :
                null
              }
              <div>
                Avg HR(bpm) <input className="workoutInput" type="number"
                            placeholder="Insert average heart rate"
                            value={this.state.avgHR}
                            onChange={this.handleAvgHR} />
          Duration(minutes) <input className="workoutInput" type="number"
                            placeholder="Insert duration"
                            value={this.state.duration}
                            onChange={this.handleDuration} />
                <br /><br />
                <button onClick={this.writeWorkout} className="workoutButton">Add workout</button>
              </div>
            </div>
            <div className="container infoBox">
              <button type="button" className="btn btn-info" onClick={this.showInfo}> ? </button>
              {this.state.showInfo ? <InfoBox /> : null}
            </div>
        </div>
      </div>
    )
  }
}

export default WorkoutForm;
