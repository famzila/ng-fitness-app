import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  private workoutsSub!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    this.workoutsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.workoutsSub = this.trainingService.workoutChange$.subscribe(workout => {
      workout ?  this.ongoingTraining = true : this.ongoingTraining = false;
    })
  }

}
