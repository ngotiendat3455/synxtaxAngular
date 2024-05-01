import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient } from '../store/shopping-list.actions';

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
  constructor(private store: Store<fromApp.AppState>) {}


  ngOnInit() {
    // this.subscription = this.shoppingListService.startEdit.subscribe((obs) => {
    //   this.editMode = true;
    //   this.editItemIndex = obs;
    //   this.editedIng = this.shoppingListService.getIngredient(obs);
    //   console.log('editedIng', this.editedIng);
      // this.shoppingForm.setValue({
      //   name: this.editedIng.name,
      //   amount: this.editedIng.amount,
      // });
    // })
    this.subscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editingsIndex > -1){
        this.editMode = true;
        this.editItemIndex = stateData.editingsIndex;
        this.editedIng = stateData.editIngs;
        this.shoppingForm.setValue({
          name: stateData.editIngs.name,
          amount: stateData.editIngs.amount,
        });
      } else {
        this.editMode = false;
      }
    })
  }

  ngOnDestroy(): void {
      // this.subscription.unsubscribe();
      this.store.dispatch(new StopEdit());
  }
  onAddItem(form: NgForm){
    const newIngedient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(newIngedient, this.editItemIndex);
      this.store.dispatch(new UpdateIngredient({
        index: this.editItemIndex,
        ingredient: newIngedient
      }))
    } else {
      // this.shoppingListService.addIngredient(newIngedient)
      this.store.dispatch(new AddIngredient(newIngedient));
    }
    this.shoppingForm.reset();
  }

  onDeleteItem(){
    // const removeIngredient = this.shoppingListService.getIngredients();
    // this.shoppingListService.deleteIngredient(removeIngredient)
    this.store.dispatch(new DeleteIngredient(this.editItemIndex))
  }
  onClear() {
    this.shoppingForm.reset();
    this.store.dispatch(new StopEdit());
    this.editMode = false;
  }
}
