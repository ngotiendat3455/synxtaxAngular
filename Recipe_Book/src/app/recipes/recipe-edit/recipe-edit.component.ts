import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe-model';
import { Ingredient } from 'src/app/shared/ingredient-model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit  {
  recipeForm: FormGroup;
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }
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
              name: new FormControl(element.name, Validators.required),
              amount: new FormControl(element.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[1-9]*$/),
              ]),
            })
          );
        }
      }
      
    }
    console.log('recipeIngs', recipeIngs);
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngs,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    console.log('form', this.recipeForm.value);
    const recipeIngs:Ingredient[] = [];
    this.recipeForm.value.ingredients.forEach(element => {
      recipeIngs.push(new Ingredient(element.name, element.amount));
    });
    const newRecipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, recipeIngs);
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe, this.id)
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[1-9]*$/),
      ]),
    }))
  }

  onDeleteIng(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
