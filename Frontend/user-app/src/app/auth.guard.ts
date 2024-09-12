import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
    if (inject(AuthService).getLoggedIn()) {
        return true; // User is logged in, allow route access
      } else {
        inject(Router).navigate(['/']);
        return false; // Prevent route access
      }
};
