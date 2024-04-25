import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 23),
    new Ingredient('pears', 7),
  ];
  onIngredientAdded(addedIngredient: Ingredient){
    this.ingredients.push(addedIngredient);
  }
}