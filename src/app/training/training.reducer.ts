import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { SET_ACTIVETRAINING, SET_AVAILABLETRAININGS, SET_FINISHEDTRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from './training.actions';
import { Workout } from './workout.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableWorkouts: Workout[];
    finishedWorkouts: Workout[];
    activeWorkout: Workout;
}

// This module (TrainingModule) is loaded lazily, that means that we can't have its
// state in the global state (App state), we only merge its state to the global state (fromRoot.State)
// When training module is loaded and that give as this:
export interface State extends fromRoot.State {
    training: TrainingState;
}

// Set initial state
const initialState = {
    availableWorkouts: [],
    finishedWorkouts: [],
    activeWorkout: null,
}


export function trainingReducer(state = initialState, action: TrainingActions) {

    switch (action.type) {
        case SET_AVAILABLETRAININGS:
            return {
                ...state,
                availableWorkouts: action.payload
            };
        case SET_FINISHEDTRAININGS:
            return {
                ...state,
                finishedWorkouts: action.payload
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeWorkout: null
            };
        case START_TRAINING:
            return {
                ...state,
                activeWorkout: { ...(state.availableWorkouts as Workout[]).find(w => w.id === action.payload) }
            };
        default: {
            return state;
        }
    }
}

// helper methods
// should be the same aliase used in training module store.forFeature setup alias
export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableWorkouts);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeWorkout);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedWorkouts);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeWorkout !== null);
