import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';


export interface State {
    isAuthenticated: boolean;
}

const initialState = {
    isAuthenticated: false
}


export function authReducer(state = initialState, authAction: Action) {
    const action = authAction as AuthActions;
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            };
        default: {
            return state;
        }
    }
}

// helper methods
export const getIsAuthenticated = (state: State) => state.isAuthenticated;