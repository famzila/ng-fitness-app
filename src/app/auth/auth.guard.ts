import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';

export const authGuard: CanLoadFn | CanActivateFn = () => {
    const router = inject(Router);
    const store = inject(Store<fromRoot.State>);
    // Guard runs one time, no need to keep subscription so 
    // we tell him to take 1 value and close the subscription
    const isAuth$ = store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    
    return isAuth$;
};