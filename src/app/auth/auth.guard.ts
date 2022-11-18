import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from "@angular/router";
import { AuthService } from './auth.service';

export const authGuard: CanLoadFn | CanActivateFn = () => {
    const router = inject(Router);
    const isLoggedIn = inject(AuthService).isAuth();
    if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
    }
    
    return true;
};