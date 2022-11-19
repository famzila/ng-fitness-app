import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';

// All app reduces are merged here!
export interface State {
    ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);