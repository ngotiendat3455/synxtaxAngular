import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { decrement, increment } from './counter.actions';
import { catchError, map, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '../auth.service';
import { AUTH_SUCCESS, AUTO_LOGIN, AuthFail, AuthSuccess, LOGIN, LOGOUT, Login, SIGNUP, SignUp } from './auth.actions';
import { User } from '../user.model';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
    postKey = 'https://dummyjson.com/users';
    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(AUTH_SUCCESS, LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), { dispatch: false })

    authSignUp = createEffect(() => this.actions$.pipe(
        ofType(SIGNUP),
        switchMap((authData: SignUp) => {
            return this.http.post<any>(this.postKey + '/add', {
                email: authData.payload.email,
                password: authData.payload.pswrd,
                firstName: 'test',
                lastName: 'test',
                age: 12,
            }).pipe(
                tap((resData) => {
                    this.authService.autoLogout(+resData.expiresIn * 1000);
                }),
                map((resData) => {
                    const date = new Date(
                        new Date().getTime() + +resData.expiresIn * 1000
                    );
                    return this.authenticationHandler(
                        resData.email,
                        resData.id,
                        resData.token,
                        120
                    );
                })
            )
        })
    ),
        { dispatch: false }
    )

    authLogin = createEffect(
        () =>
          this.actions$.pipe(
            ofType(LOGIN),
            switchMap((authData: Login) => {
              return this.http
                .post<AuthResponseData>('https://dummyjson.com/auth/login', {
                  username: authData.payload.email,
                  password: authData.payload.pswrd,
                  expiresInMins: 2, 
                })
                .pipe(
                  tap((resData) => {
                    this.authService.autoLogout(120 * 1000);
                  }),
                  map((resData) => {
                    const date = new Date(
                      new Date().getTime() + 120 * 1000
                    );

                    return this.authenticationHandler(
                      resData.email,
                      resData.id,
                      resData.token,
                      120
                    );
                  }),
                  catchError((errorRes) => {
                    return of(new AuthFail('FAIL'));
                  })
                );
            })
          )
        // { dispatch: false } // must dispatch this to the reducer to update the loading state of the user
      );

      
    autoLogin = createEffect(() => this.actions$.pipe(
        ofType(AUTO_LOGIN),
        switchMap(() => {
            const userData: {
                email: string;
                id: number;
                _token: string;
                _tokenExpiration: Date;
            } = JSON.parse(localStorage.getItem('userData'))
            if (!userData) {
                return of({ type: 'DUMMY' });
            }
            if (userData._token) {

                return this.http.get<User>('https://dummyjson.com/auth/me', {
                    headers: {
                      'Authorization': `Bearer ${userData._token}`, 
                    }
                  }).pipe(
                    catchError((err) => {
                      console.log('error', err);
                      let errorMessage = 'error occurred';
                      if (!err.error || !err.error.error) {
                        return throwError(() => new Error(errorMessage));
                      }
                      return throwError(() => new Error(errorMessage));
                    }),
                    // tap((resData) => {
                    //     const duration = new Date(userData._token).getTime() - new Date().getTime();
                    //     this.authService.autoLogout(120*);
                    // }),
                    map((resData) => {
                        return this.authenticationHandler(
                            resData.email,
                            resData.id,
                            resData.token,
                            120
                        );
                    })
                )
              }
        })
    ), { dispatch: false })

    authenticationHandler = (
        email: string,
        userID: number,
        token: string,
        expiresIn: number
    ) => {
        const date = new Date(new Date().getTime() + expiresIn * 1000);

        // make user to store
        const user = new User(email, userID, token, date);
        // store user in the browser's local storage
        localStorage.setItem('userData', JSON.stringify(user));

        return new AuthSuccess({
            email: email,
            userID: userID,
            token: token,
            expirationDate: date,
        });
    };
}