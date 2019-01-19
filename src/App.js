import React, { Component } from 'react';
import './App.css';
import Workout from './Workout/Workout';
import WorkoutForm from './WorkoutForm/WorkoutForm';
import { DB_CONFIG } from './Config/config.js';
import firebase from 'firebase/app';
import 'firebase/database'

class App extends Component {
  constructor(props) {
    super(props);
    this.addWorkout = this.addWorkout.bind(this);
    this.removeWorkout = this.removeWorkout.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('workouts');

    this.state = {
      workouts: [],
    }
  }

  // Initially was componentWillMounted which is not recommended anymore.
  componentDidMount() {
    const previousWorkouts = this.state.workouts;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousWorkouts.push({
        id: snap.key,
        workoutContent: snap.val().workoutContent,
      })

      this.setState({
        workouts: previousWorkouts
      })
    })

    this.database.on('child_removed', snap => {
      for (let i=0; i < previousWorkouts.length; i++) {
        if (previousWorkouts[i].id === snap.key) {
          previousWorkouts.splice(i, 1);
        }
      }
      
      this.setState({
        workouts: previousWorkouts
      })
    })
  }

  addWorkout(workout) {
    this.database.push().set({ workoutContent: workout });
  }

  removeWorkout(workoutId) {
    this.database.child(workoutId).remove();
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
                <Workout  workoutContent={workout.workoutContent}
                          workoutId={workout.id}
                          key={workout.id}
                          removeWorkout={this.removeWorkout} />
              )
            })
          }
        </div>
        <div className="workoutsFooter">
          <WorkoutForm addWorkout={this.addWorkout} />
        </div>
      </div>
    );
  }
}

export default App;
