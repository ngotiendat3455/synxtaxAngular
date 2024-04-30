import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { doubleCount, selectCount } from '../counter-store/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  standalone: true,
  imports: [AsyncPipe],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // counter = 0;
  // counterServiceSub?: Subscription;
  count$!: Observable<number>; 
  double$!: Observable<number>;
  constructor(private store: Store<{ counter: number }>) {}

  ngOnInit(): void {
    // this.counterServiceSub = this.counterService.counterChanged.subscribe(
    //   (newVal) => (this.counter = newVal)
    // );
    this.count$ = this.store.select(selectCount);
    this.double$ = this.store.select(doubleCount);
  }

  ngOnDestroy(): void {
    // if (this.counterServiceSub) {
    //   this.counterServiceSub.unsubscribe();
    // }
  }
}
