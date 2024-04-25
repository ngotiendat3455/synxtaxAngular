import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[] = [];
  onIngredientAdded(addedIngredient: Ingredient){
    this.ingredients.push(addedIngredient);
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredient[]) => this.ingredients = ingredient);
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
