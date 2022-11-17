
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  workouts: Workout[] = [];
  selectedWorkout: string |undefined = undefined;
  newTrainingForm = new FormGroup({
    trainingId: new FormControl<string>('', [Validators.required]),
  });


  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.workouts =  this.trainingService.getAvailableWorkouts();
  }


  onSubmit(){
    const trainingId = this.newTrainingForm.get('trainingId')?.value;
    if(!!trainingId){
      this.trainingService.startWorkout(trainingId);
    }
  }
}
