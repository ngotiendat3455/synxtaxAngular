import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginMode = false;

  @ViewChild('f', { static: false }) authForm: NgForm;

  constructor(private authService: AuthService) {}

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const pswrd = form.value.password;
    console.log(form.value);

    if (this.loginMode) {
    } else {
      this.authService.signUp(email, pswrd).subscribe(
        (resData) => {
          console.log(resData);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    form.reset();
  }
}
