import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  constructor(private data_storage: DataStorageService, private store: Store<fromApp.AppState>, private authService: AuthService,) {}
  isAuth = false;

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   console.log('header user', user);
    //   this.isAuth = !!user;
    // })
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user),
    ).subscribe((user) => {
      this.isAuth = !!user;
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  Save() {
    this.data_storage.recipeStore();
  }

  Fetch() {
    this.data_storage.recipeFetch().subscribe();
  }

  Logout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
}
