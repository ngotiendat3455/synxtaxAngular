import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HelperDirective } from 'src/app/shared/helper/helper.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ClearError, Login, SignUp } from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  loginMode = false;

  isLoading = false;
  error: string = null;

  storeSub: Subscription;
  
  @ViewChild(HelperDirective, { static: false }) alertHost: HelperDirective;
  closeSub: Subscription;

  @ViewChild('f', { static: false }) authForm: NgForm;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private c: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const pswrd = form.value.password;
    console.log(form.value);
    // let authObsv: Observable<any>;
    this.isLoading = true;
    if (this.loginMode) {
      // authObsv = this.authService.login(email, pswrd);
      this.store.dispatch(new Login({
        email, pswrd
      }))
    } else {
      // authObsv = this.authService.signUp(email, pswrd)
      this.store.dispatch(new SignUp({
        email, pswrd
      }))
    }
    // authObsv.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     const { error } = errorMessage;
    //     console.log(errorMessage);
    //     this.error = error.message;
    //     this.showErrorAlert(error.message);
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  onErrorHandle() {
    // this.error = null;
    this.store.dispatch(new ClearError())
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
