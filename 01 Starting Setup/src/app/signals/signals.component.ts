import { NgFor } from "@angular/common";
import { Component, computed, effect, signal } from "@angular/core";

@Component({
  selector: "app-signals",
  templateUrl: "./signals.component.html",
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  // counter = 0;
  counter = signal(0); 

  doubleCounter = computed(() => this.counter() * 2);
  // updates value based on other signals

  constructor() {
    effect(() => {
      console.log('counter', this.counter())
      console.log('list actions', this.actions())
    });
  }

  increment() {
    this.counter.set(this.counter() + 1);
    this.actions.mutate((oldActions) => oldActions.push("increments"));
  }

  decrement() {
    // this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldActions) => [...oldActions, "decrements"]);
  }
}
