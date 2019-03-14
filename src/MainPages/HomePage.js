import React from 'react';
import Workout from '../Workout/Workout';
import WorkoutForm from '../WorkoutForm/WorkoutForm';
import './Homepage.css';

class HomePage extends React.Component {
  render() {
    return(
      <div>
        <div className="container-fluid">
          <div className="row parent scrollbarTest">
            <div className="col-8 workoutsBody force-overflow">
              {
                this.props.workouts.map((workout) => {
                  return (
                    <div key={workout.id}>
                      <Workout  workoutContent={workout.workoutContent}
                                avgHR={workout.avgHR}
                                duration={workout.duration}
                                calories={workout.calories}
                                workoutId={workout.id}
                                key={workout.id}
                                removeWorkout={this.props.removeWorkout}
                                editWorkout={this.props.editWorkout} />
                    </div>
                  )
                })
              }
            </div>
            <div className="col-4 addWorkout">
              <WorkoutForm addWorkout={this.props.addWorkout} />
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default HomePage;
