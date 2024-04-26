import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  // @Input() recipe:Recipe
  recipe: Recipe;
  id: number;
  onAddToShoppingList() {
    this.recipeService.addIngToShoppingList(this.recipe.ingredients)
  }

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.recipeService.addIngToShoppingList(this.recipe.ingredients);
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
