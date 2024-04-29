import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
class PermissionsService {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        //your logic goes here
        return this.authService.user.pipe(
            take(1),
            map((user) => {
              // return !!user;
              const isAuth = !!user;
              if (isAuth) {
                return true;
              }
              return this.router.createUrlTree(['/auth']);
            })
          );
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    return inject(PermissionsService).canActivate(next, state);
}