
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';
import { UIService } from 'src/app/shared/ui.service';

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
  isLoading: boolean = true;
  private workoutsSub!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    this.workoutsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  fetchWorkouts() {
    this.workoutsSub = this.trainingService.workoutsChange$.subscribe(workouts => {
      this.workouts = workouts as Workout[];
      this.isLoading = false;
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
