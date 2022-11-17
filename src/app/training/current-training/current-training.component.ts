import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;

  @Output() trainingExit = new EventEmitter<void>();

  constructor(private matDialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const workoutDuration = this.trainingService.getRunningWorkout().duration;
    if(workoutDuration){
      const step = workoutDuration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step)
    }
    
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.matDialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });

  }

}
