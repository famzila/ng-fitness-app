import { Injectable } from '@angular/core';
import { map, Subject, Subscription, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import { Workout } from './workout.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private dbSub: Subscription[] = [];


  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) { }

  fetchAvailableWorkouts() {
    this.store.dispatch(new UI.StartLoading);
    // create a new array with slice that can be edited without affecting the old one
    this.dbSub.push(this.db.collection('availableWorkouts')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: (doc.payload.doc.data() as Workout).name,
            calories: (doc.payload.doc.data() as Workout).calories,
            duration: (doc.payload.doc.data() as Workout).duration,
          };
        })
      })).subscribe({
        next: (workouts) => {
          this.store.dispatch(new UI.StopLoading);
          this.store.dispatch(new Training.SetAvailableTrainings(workouts));
        },
        error: (e) => {
          this.store.dispatch(new UI.StopLoading);
          this.uiService.showSnackbar('Fetching available workout failed, please try again!', '', 3000)
        }
      }));
  }


  fetchCompletedOrCancelledWorkouts() {
    this.dbSub.push(this.db.collection('finishedWorkouts').valueChanges().subscribe(data => {
      this.store.dispatch(new Training.SetFinishedTrainings(data as Workout[]));
    }));
  }

  startWorkout(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeWorkout() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(workout => {

      this.updateDatabase({
        ...workout,
        state: "completed",
        date: new Date()
      } as Workout);
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelledWorkout(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(workout => {
      this.updateDatabase({
        ...workout,
        state: "cancelled",
        date: new Date(),
        calories: workout ? workout.calories * progress / 100 : 0,
        duration: workout ? workout.duration * progress / 100 : 0,
      } as Workout);
      this.store.dispatch(new Training.StopTraining());
    });
  }

  getRunningWorkout() {
    return this.store.select(fromTraining.getActiveTraining);
  }

  cancelSubscriptions() {
    this.dbSub.forEach(sub => sub?.unsubscribe());
  }

  private updateDatabase(workout: Workout) {
    this.db.collection('finishedExercises').add(workout);
  }

}
