import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient-model";
import { Subject } from "rxjs";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startEdit = new Subject<number>();
    private ingredients: Ingredient[] = [
      new Ingredient('apples', 5),
      new Ingredient('tomatos', 23),
      new Ingredient('pears', 7),
    ];
  
    getIngredient(i: number) {
      console.log('this.ingredients[i]', this.ingredients[i], i );
      return this.ingredients[i];
    }
  
    getIngredients() {
      return this.ingredients.slice();
    }
  
    addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientChanged.next(this.ingredients.slice());
    }
  
    addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientChanged.next(this.ingredients.slice());
    }
  
    deleteIngredient(ingredient: Ingredient[]) {
      this.ingredients.pop();
      this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(ingredient: Ingredient, index: number) {
      this.ingredients[index] = ingredient;
      this.ingredientChanged.next(this.ingredients.slice());
    }
  
    constructor() { }
  }