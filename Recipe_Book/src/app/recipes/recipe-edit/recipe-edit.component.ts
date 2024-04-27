import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit  {
  recipeForm: FormGroup;
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );

  }

  private initForm() {
    let recipeIngs = new FormArray([]);
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe?.['ingredients']){
        for (let index = 0; index < recipe.ingredients.length; index++) {
          const element = recipe.ingredients[index];
          console.log('element', element)
          recipeIngs.push(
            new FormGroup({
              name: new FormControl(element.name),
              amount: new FormControl(element.amount),
            })
          );
        }
      }
      
    }
    console.log('recipeIngs', recipeIngs);
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDesc),
      ingredients: recipeIngs,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
