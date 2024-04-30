import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/counter-store/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { CounterEffects } from './app/counter.effects';

bootstrapApplication(AppComponent, {
    providers: [
        provideStore(
        { counter: counterReducer }
        ),
        provideEffects([CounterEffects])
    ],
  });