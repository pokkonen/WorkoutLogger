import React, { Component } from 'react';
import './App.css';
import Workout from './Workout/Workout';
import WorkoutForm from './WorkoutForm/WorkoutForm';
import { DB_CONFIG } from './Config/config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import calculate from './WorkoutForm/CalculateCals';


class App extends Component {
  constructor(props) {
    super(props);
    this.addWorkout = this.addWorkout.bind(this);
    this.removeWorkout = this.removeWorkout.bind(this);
    this.editWorkout = this.editWorkout.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('workouts');

    this.state = {
      workouts: [],
      update: false
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
        avgHR: snap.val().avgHR,
        duration: snap.val().duration,
        calories: snap.val().calories,
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

    this.database.on('child_changed', snap => {
      for (let i=0; i < previousWorkouts.length; i++) {
        if (previousWorkouts[i].id === snap.key) {
          previousWorkouts[i].workoutContent = snap.val().workoutContent;
          previousWorkouts[i].avgHR = snap.val().avgHR;
          previousWorkouts[i].duration= snap.val().duration;
          previousWorkouts[i].calories= snap.val().calories;
          previousWorkouts[i].id = snap.key;
        }
      }

      this.setState({
        workouts: previousWorkouts,
        update: true
      })
    })
  }

  shouldComponentUpdate() {
    return true
  }

  addWorkout(workout, avgHR, duration, calories) {
    this.database.push().set({ workoutContent: workout, avgHR: avgHR, duration: duration, calories: calories });
  }

  removeWorkout(workoutId) {
    this.database.child(workoutId).remove();
  }

  editWorkout(workoutId, workout, avgHR, duration) {
    this.database.child(workoutId).update({ workoutContent: workout, avgHR: avgHR, duration: duration,
      calories: calculate(workout, avgHR, duration)});
  }

  render() {
    return (
      <div>
        <div className="workoutsHeader">
          <h1>React & Firebase WorkoutLogger</h1>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 workoutsBody">
              {
                this.state.workouts.map((workout) => {
                  return (
                    <div key={workout.id}>
                      <Workout  workoutContent={workout.workoutContent}
                                avgHR={workout.avgHR}
                                duration={workout.duration}
                                calories={workout.calories}
                                workoutId={workout.id}
                                key={workout.id}
                                removeWorkout={this.removeWorkout}
                                editWorkout={this.editWorkout} />
                    </div>
                  )
                })
              }
            </div>
            <div className="col-4">
              <WorkoutForm addWorkout={this.addWorkout} />
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
