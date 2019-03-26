import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import './App.css';
import HomePage from './MainPages/HomePage';
import Header from './Header';
import { DB_CONFIG } from './Config/config.js';
import calculate from './WorkoutForm/CalculateCals';

let firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(DB_CONFIG)
} else {
  firebaseApp = firebase.app();
}

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.addWorkout = this.addWorkout.bind(this);
    this.removeWorkout = this.removeWorkout.bind(this);
    this.editWorkout = this.editWorkout.bind(this);

    !firebase.apps.length ? this.app = firebase.initializeApp(DB_CONFIG) : this.app = firebase.app();
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
        <Header />
        <HomePage workouts={this.state.workouts}
                  addWorkout={this.addWorkout}
                  removeWorkout={this.removeWorkout}
                  editWorkout={this.editWorkout} />
      </div>
    )
  }
}


export { firebaseApp, facebookProvider };
