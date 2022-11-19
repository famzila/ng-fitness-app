import { Action } from '@ngrx/store';
import { Workout } from './workout.model';


export const SET_AVAILABLETRAININGS = '[Auth] Get available trainings';
export const SET_FINISHEDTRAININGS = '[Auth] Get finished trainings';
export const SET_ACTIVETRAINING = '[Auth] Get active training';
export const START_TRAINING = '[Auth] Start training';
export const STOP_TRAINING = '[Auth] Stop training';



export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLETRAININGS;

    constructor(public payload: Workout[]){}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHEDTRAININGS;

    constructor(public payload: Workout[]){}
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: string){}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}


export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StopTraining | StartTraining;