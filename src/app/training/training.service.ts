import { Injectable } from '@angular/core';
import { map, Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Workout } from './workout.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  workoutChange$ = new Subject<Workout | undefined | null>();
  workoutsChange$ = new Subject<Workout[] | undefined | null>();
  finishedWorkoutsChange$ = new Subject<Workout[] | undefined | null>();
  private dbSub: Subscription[] = [];
  private availableWorkouts: Workout[] = [];

  private runningWorkout: Workout | undefined | null = undefined;
  private workouts: Workout[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) { }

  fetchAvailableWorkouts() {
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
          this.availableWorkouts = workouts as Workout[];
          this.workoutsChange$.next([...this.availableWorkouts]);
        },
        error: (e) => {
          this.uiService.loadingStateSubject$.next(false);
          this.uiService.showSnackbar('Fetching available workout failed, please try again!', '', 3000)
          this.workoutsChange$.next(null);
        }
      }));
  }


  fetchCompletedOrCancelledWorkouts() {
    this.dbSub.push(this.db.collection('finishedWorkouts').valueChanges().subscribe(data => {
      this.finishedWorkoutsChange$.next(data as Workout[]);
    }));
  }

  startWorkout(selectedId: string) {
    this.runningWorkout = this.availableWorkouts.find(w => w.id === selectedId);
    if (this.runningWorkout) {
      this.workoutChange$.next({ ...this.runningWorkout });
    } else {
      this.workoutChange$.next(undefined);
    }
  }

  completeWorkout() {
    this.updateDatabase({
      ...this.runningWorkout,
      state: "completed",
      date: new Date()
    } as Workout);
    this.runningWorkout = null;
    this.workoutChange$.next(null);
  }

  canceledWorkout(progress: number) {
    this.updateDatabase({
      ...this.runningWorkout,
      state: "canceled",
      date: new Date(),
      calories: this.runningWorkout ? this.runningWorkout.calories * progress / 100 : 0,
      duration: this.runningWorkout ? this.runningWorkout.duration * progress / 100 : 0,
    } as Workout);
    this.runningWorkout = null;
    this.workoutChange$.next(null);
  }

  getRunningWorkout() {
    return { ...this.runningWorkout };
  }

  cancelSubscriptions() {
    this.dbSub.forEach(sub => sub?.unsubscribe());
  }

  private updateDatabase(workout: Workout) {
    this.db.collection('finishedWorkouts').add(workout).then(data => {

    });
  }

}
