import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe-model";
import { Ingredient } from "../shared/ingredient-model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected  = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('test recipe', 'test description', 'https://www.jocooks.com/wp-content/uploads/2022/07/grilled-chicken-breast-1-20.jpg',
          [
            new Ingredient('test', 1)
          ]),
        new Recipe('burger', 'american meal', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEYb3dHVXt1lAhZ4-e_h5l3207hHDUTV8bAQ&usqp=CAU',
          [
            new Ingredient('patty', 2),
            new Ingredient('buns', 4)
          ]),
        new Recipe('chicken', 'classic lunch ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoeN9jFpSoXAqU8r5Piy-Yzfa9eeeJPjA7w&usqp=CAU',
          [
            new Ingredient('chicken', 2),
            new Ingredient('lemmon', 1)
          ]),
        new Recipe('noodles', 'fine dining', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVQNJ4XZM4ZVS0E5KSesP-wWMVyq4XbOz37TPzppS0vRBV698CL39V3T8v1TpqFrXGjk&usqp=CAU',
          [
            new Ingredient('noodles', 2),
            new Ingredient('soy sauce', 1)
          ]
        ),
      ]

    getRecipes() {
        return this.recipes;
      }

      addIngToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
      }
      getRecipe(id: number) {
        const found = this.recipes.findIndex((ele: Recipe, index) => index === id);
        if (found > 0) {
          return this.recipes[found];
        } 
        return null;
      }
      constructor(private shoppingListService: ShoppingListService) { }
}