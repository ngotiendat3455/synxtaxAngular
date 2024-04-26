import { Component } from '@angular/core';
import { Recipe } from './recipe-model';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent {
  constructor() { }

  ngOnInit() {
  }
}
