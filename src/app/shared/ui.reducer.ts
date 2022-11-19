import { Action } from '@ngrx/store';
import { START_LOADING, STOP_LOADING, UIActions } from './ui.actions';


export interface State {
    isLoading: boolean;
}

const initialState = {
    isLoading: false
}


export function uiReducer(state = initialState, uiAction: Action) {
    const action = uiAction as UIActions;
    switch (action.type) {
        case STOP_LOADING:
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