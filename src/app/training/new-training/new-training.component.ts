
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  workouts$!: Observable<Workout[]>;
  isLoading$!: Observable<boolean>;
  newTrainingForm = new FormGroup({
    trainingId: new FormControl<string>('', [Validators.required]),
  });

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }


  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.workouts$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchWorkouts();
  }

  fetchWorkouts() {
    this.trainingService.fetchAvailableWorkouts();
  }

  onSubmit() {
    const trainingId = this.newTrainingForm.get('trainingId')?.value;
    if (!!trainingId) {
      this.trainingService.startWorkout(trainingId);
    }
  }
}
