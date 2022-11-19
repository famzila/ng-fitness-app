import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';
import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Workout>();

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }


  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedTrainings).subscribe(workouts => {
      this.dataSource.data = workouts as Workout[];
    })
    this.trainingService.fetchCompletedOrCancelledWorkouts();
  }

    
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
