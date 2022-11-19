
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  workouts: Workout[] = [];
  selectedWorkout: string | undefined = undefined;
  newTrainingForm = new FormGroup({
    trainingId: new FormControl<string>('', [Validators.required]),
  });
  isLoading$!: Observable<boolean>;
  private workoutsSub!: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<{state: fromRoot.State}>) { }

  ngOnDestroy(): void {
    this.workoutsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchWorkouts();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  fetchWorkouts() {
    this.store.dispatch(new UI.StartLoading());
    this.workoutsSub = this.trainingService.workoutsChange$.subscribe(workouts => {
      this.workouts = workouts as Workout[];
    });
    this.trainingService.fetchAvailableWorkouts();
  }

  onSubmit() {
    const trainingId = this.newTrainingForm.get('trainingId')?.value;
    if (!!trainingId) {
      this.trainingService.startWorkout(trainingId);
    }
  }
}
