import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { AddIngredient, StartEdit, UpdateIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChangeSub: Subscription;
  onIngredientAdded(addedIngredient: Ingredient){
    // this.ingredients.push(addedIngredient);
    this.store.dispatch(new AddIngredient(addedIngredient))
  }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.igChangeSub = this.store..ingredientChanged.subscribe((ingredient: Ingredient[]) => this.ingredients = ingredient);
    this.ingredients = this.store.select('shoppingList');
  }
 
  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem(i: number){
    console.log('i', i);
    this.store.dispatch(new StartEdit(i));
    // this.shoppingListService.startEdit.next(i);
  }
}
