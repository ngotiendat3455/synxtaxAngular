import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  // kind: string; //not shown in api docs for some reason
  token: string; // A Firebase Auth ID token for the newly created user.
  email: string; // The email for the newly created user.
  refreshToken: string; // A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //The number of seconds in which the ID token expires.
  localId: string; // The uid of the newly created user.
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  // signs up and logs in to FireBase
  postKey = 'https://dummyjson.com/users';
  tokenTimer: any;

  autoLogin() {
    console.log('handle something');
    const userData:{
      email: string;
      id: number;
      _token: string;
      _tokenExpiration: Date;
    } = JSON.parse(localStorage.getItem('userData'))

    if (!userData){
      return;
    }

    // const user = new User(
    //   userData.email,
    //   userData.id,
    //   userData._token,
    //   new Date(userData._tokenExpiration)
    // );


    if (userData._token) {

      this.getPermission(userData._token).subscribe(
        (resData) => {
          this.user.next(resData);
          const duration = new Date(userData._token).getTime() - new Date().getTime();
          this.autoLogout(duration);
        },
        (errorMessage) => {
          console.log(errorMessage);
          
        }
      );
    }
  }

  getPermission(token: string){
    return this.http.get<User>('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`, 
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
      // tap((responseData) => {
      //   this.authHandle(
      //     responseData.email,
      //     responseData.id,
      //     responseData.token,
      //     +responseData.expiresIn
      //   );
      // })
    );
  }
  login(email: string, pswrd: string) {
    return this.http.post<AuthResponseData>('https://dummyjson.com/auth/login', {
      username: email,
      password: pswrd,
      expiresInMins: 2
    }).pipe(
      tap((responseData) => {
        this.authHandle(
          responseData.email,
          responseData.id,
          responseData.token,
          120
        );
      })
    );
  }
  signUp(email: string, pswrd: string) {
    return this.http.post<any>(this.postKey + '/add', {
      email: email,
      password: pswrd,
      firstName: 'test',
      lastName: 'test',
      age: 12,
    });
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.setItem('userData', null);
  }
  autoLogout(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private authHandle(
    email: string,
    userid: number,
    token: string,
    expires: number
  ) {
    const date = new Date(new Date().getTime() + +expires * 1000);
    const user = new User(email, userid, token, date);
    console.log('logout', expires,' ',expires * 1000)
    this.autoLogout(expires * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }
  constructor(private http: HttpClient, private router: Router) {}
}