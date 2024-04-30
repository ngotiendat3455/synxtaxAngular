import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HelperDirective } from 'src/app/shared/helper/helper.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginMode = false;

  isLoading = false;
  error: string = null;

  @ViewChild(HelperDirective, { static: false }) alertHost: HelperDirective;
  closeSub: Subscription;

  @ViewChild('f', { static: false }) authForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private c: ComponentFactoryResolver) {}

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
        const { error } = errorMessage;
        console.log(errorMessage);
        this.error = error.message;
        this.showErrorAlert(error.message);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onErrorHandle() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    // let angular create component
    const alertComp = this.c.resolveComponentFactory(AlertComponent);

    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();

    const compRef = hostViewContRef.createComponent(AlertComponent);

    compRef.instance.message = errorMessage;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContRef.clear();
    });
  }
}
