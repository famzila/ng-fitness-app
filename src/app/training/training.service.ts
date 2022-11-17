import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  workoutChange = new Subject<Workout|undefined>();
  private availableWorkouts: Workout[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 18},
  ];

  private runningWorkout: Workout | undefined = undefined;

  constructor() { }

  getAvailableWorkouts(){
    // create a new array with slice that can be edited without affecting the old one
    return this.availableWorkouts.slice();
  }

  startWorkout(selectedId: string){
    this.runningWorkout = this.availableWorkouts.find(w => w.id === selectedId);
    if(this.runningWorkout){
      this.workoutChange.next({...this.runningWorkout});
    }else {
      this.workoutChange.next(undefined);
    }
  }

  getRunningWorkout(){
    return {...this.runningWorkout };
  }

}
