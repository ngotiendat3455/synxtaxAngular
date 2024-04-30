import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] increment', props<{ value: number }>());
export const decrement = createAction('[Counter] decrement', props<{ value: number }>());
export const init = createAction('[Counter] init');
export const set = createAction('[Counter] set', props<{ value: number }>());