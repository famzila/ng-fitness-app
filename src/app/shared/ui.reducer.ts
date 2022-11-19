import { Action } from '@ngrx/store';
import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';


export interface State {
    isLoading: boolean;
}

const initialState = {
    isLoading: false
}


export function uiReducer(state = initialState, action: Action) {

    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: false
            };
        case START_LOADING:
            return {
                isLoading: true
            };
        default: {
            return state;
        }
    }
}

export const getIsLoading = (state: State) => state.isLoading;