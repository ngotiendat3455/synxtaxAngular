import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  // signs up and logs in to FireBase
  postKey = 'https://dummyjson.com/users';

  // apiKey = 'AIzaSyBNUvsG5N7mhCGLn5iJOla5J4mHUHsUJfA';

  login(email: string, pswrd: string) {
    return this.http.post<AuthResponseData>('https://dummyjson.com/auth/login', {
      username: email,
      password: pswrd,
      
    });
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

  constructor(private http: HttpClient) {}
}