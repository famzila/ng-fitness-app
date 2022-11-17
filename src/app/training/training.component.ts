import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  
  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    this.trainingService.workoutChange?.unsubscribe();
  }

  ngOnInit(): void {
    this.onStartTraining();
  }

  onStartTraining(){
    this.trainingService.workoutChange.subscribe(workout => {
      workout ?  this.ongoingTraining = true : this.ongoingTraining = false;
    })
  }

}
