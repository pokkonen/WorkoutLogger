import React, { Component } from 'react';
import './WorkoutForm.css';
import Dropdown from './Dropdown';
import calculate from './CalculateCals';

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
    console.log()
    this.props.addWorkout(this.state.newWorkoutContent, this.state.avgHR, this.state.duration,
                          calculate(this.state.newWorkoutContent, this.state.avgHR, this.state.duration));
    console.log(this.state.calories)
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
    console.log(this.state.showInfo)
  }

  render() {
    return(
      <div className="container formWrapper">
        <div className="d-flex flex-column">
          <h3 className="align-self-center addHeading">Add workout</h3>
          <div className="p-2 align-items-center">
            <div className="addForm text-white d-flex flex-column">
              Workout
              <Dropdown showDrop={this.showDrop}/>
              {this.state.showDrop ?
                <div>
                  <br /> <br /> <br /> <br /> <br /> <br /> <br />
                </div> :
                null
              }
              Avg HR(bpm) <input className="workoutInput" type="number"
                          placeholder="Insert average heart rate"
                          value={this.state.avgHR}
                          onChange={this.handleAvgHR} />
        Duration(minutes) <input className="workoutInput" type="number"
                          placeholder="Insert duration"
                          value={this.state.duration}
                          onChange={this.handleDuration} />
              <br />
              <button onClick={this.writeWorkout} className="align-self-center workoutButton">Add workout</button>
            </div>
          </div>
          <div className="container">
            <button type="button" className="btn btn-info" onClick={this.showInfo}> ? </button>
            {this.state.showInfo ?
              <div className="Collapse">
                This application counts calories burned based on workout and average heart rate.
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
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WorkoutForm;
