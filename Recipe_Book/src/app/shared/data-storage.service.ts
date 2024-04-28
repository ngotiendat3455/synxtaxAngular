import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-model';
import { map, tap } from 'rxjs';
import { Ingredient } from './ingredient-model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  FireBaseURL = 'https://dummyjson.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  recipeStore() {
    // const recipes = this.recipeService.getRecipes();
    // this.http
    //   .put(this.FireBaseURL + 'recipes.json', recipes)
    //   .subscribe((response) => {
    //     console.log(recipes);
    //   });
  }

  recipeFetch() {
    return this.http.get<{
        recipes: any[]
    }>(this.FireBaseURL + 'recipes').pipe(
      map((data) => {
        return data.recipes.map((recipe) => {
          return {
            ...recipe,
            description: recipe.cuisine, // image
            imagePath: recipe.image,
            ingredients: recipe.ingredients ? recipe.ingredients.map((nameStr: string) => {
                return new Ingredient(nameStr, 1);
            }) : [],
          };
        });
      }),
      tap((data) => {
        console.log('recipes', data);
        this.recipeService.setRecipe(data.map((recipe) => {
            return {
              ...recipe,
              description: recipe.cuisine, // image
              imagePath: recipe.image,
              ingredients: recipe.ingredients ? recipe.ingredients.map((nameStr: string) => {
                  return new Ingredient(nameStr, 1);
              }) : [],
            };
          }));
      })
    );
  }
}