import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginMode = false;

  isLoading = false;
  error: string = null;

  @ViewChild('f', { static: false }) authForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const pswrd = form.value.password;
    console.log(form.value);
    let authObsv: Observable<any>;
    this.isLoading = true;
    if (this.loginMode) {
      authObsv = this.authService.login(email, pswrd);
    } else {
      authObsv = this.authService.signUp(email, pswrd)
    }
    authObsv.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        this.isLoading = false;
      }
    );
    form.reset();
  }
}
