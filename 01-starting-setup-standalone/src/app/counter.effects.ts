import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { decrement, increment } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { decrement, increment, init, set } from './counter-store/counter.actions';
import { Store } from '@ngrx/store';
import { selectCount } from './counter-store/counter.selector';

@Injectable()
export class CounterEffects {
    constructor(private actions$: Actions,  private store: Store<{ counter: number }>) {}
    loadCount = createEffect(() =>
        this.actions$.pipe(
          ofType(init),
          switchMap(() => {
            // returns an observable
            const storeCount = localStorage.getItem('count');
            if (storeCount) {
              return of(set({ value: +storeCount })); // of() method wraps methods into an observable
            }
            return of(set({ value: 0 }));
          })
        )
      );
    saveCount = createEffect(
        () => 
            this.actions$.pipe(
                ofType(increment, decrement),
                withLatestFrom(this.store.select(selectCount)), // gets latest value from selector
                tap(([action, counter]) => {
                    console.log(action); // log to console
                    localStorage.setItem('count', counter.toString()); // save latest value in local storage
                  })
            ),
            { dispatch: false } // does not dispatch a new object when done
    )
}