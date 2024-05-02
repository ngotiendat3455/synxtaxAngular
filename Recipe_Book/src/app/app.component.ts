import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { AutoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AutoLogin());
  }

  onNavigate(feature: string) {
    // this.loadedFeature = feature;
  }
}
