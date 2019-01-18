import React, { Component } from 'react';
import './App.css';
import Workout from './Workout/Workout';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [
        { id: 1, workoutContent: 'Workout 1 here!'},
        { id: 2, workoutContent: 'Workout 2 here!'},
        { id: 3, workoutContent: 'Workout 3 here!'}
      ],
    }
  }

  render() {
    return (
      <div className="workoutsWrapper">
        <div className="workoutsHeader">
          <h1>React & Firebase Workout logger</h1>
        </div>
        <div className="workoutsBody">
          {
            this.state.workouts.map((workout) => {
              return (
                <Workout workoutContent={workout.workoutContent} workoutId={workout.id} key={workout.id} />
              )
            })
          }
        </div>
        <div className="workoutsFooter">
          Footer
        </div>
      </div>

    );
  }
}

export default App;
