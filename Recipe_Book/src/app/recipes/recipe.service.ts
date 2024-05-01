import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe-model";
import { Ingredient } from "../shared/ingredient-model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppState from '../store/app.reducer';
import { AddIngredients } from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
  ]

  constructor(private store: Store<fromAppState.AppState>) { }
  getRecipes() {
    return this.recipes;
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
    // this.shoppingListService.addIngredients(ingredients)
  }
  getRecipe(id: number) {
    const found = this.recipes.findIndex((ele: Recipe, index) => index === id);
    if (found >= 0) {
      return this.recipes[found];
    }
    return null;
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(recipe: Recipe, index: number){
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}