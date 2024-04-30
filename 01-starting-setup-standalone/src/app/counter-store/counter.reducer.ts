import { createReducer, on } from '@ngrx/store';
import { decrement, increment } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1), // listen to an action and define what happens on when the action is called
    on(decrement, (state) => state - 1)
  );