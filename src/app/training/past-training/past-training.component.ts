import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Workout } from '../workout.model';


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Workout>();
  private workoutsChangeSub!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    this.workoutsChangeSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.workoutsChangeSub = this.trainingService.finishedWorkoutsChange$.subscribe(workouts => {
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
