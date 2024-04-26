import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription;
  onIngredientAdded(addedIngredient: Ingredient){
    this.ingredients.push(addedIngredient);
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredient[]) => this.ingredients = ingredient);
    this.ingredients = this.shoppingListService.getIngredients();
  }
 
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(i: number){
    console.log('i', i);
    this.shoppingListService.startEdit.next(i);
  }
}
