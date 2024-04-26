import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedIng: Ingredient;

  @ViewChild('f', { static: false }) shoppingForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit() {
    this.subscription = this.shoppingListService.startEdit.subscribe((obs) => {
      this.editMode = true;
      this.editItemIndex = obs;
      this.editedIng = this.shoppingListService.getIngredient(obs);
      console.log('editedIng', this.editedIng);
      this.shoppingForm.setValue({
        name: this.editedIng.name,
        amount: this.editedIng.amount,
      });
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm){
    const newIngedient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(newIngedient, this.editItemIndex);
    } else {
      this.shoppingListService.addIngredient(newIngedient)
    }
    this.shoppingForm.reset();
  }

  onDeleteItem(){
    const removeIngredient = this.shoppingListService.getIngredients();
    this.shoppingListService.deleteIngredient(removeIngredient)
  }
  onClear() {
    this.shoppingForm.reset();
  }
}
