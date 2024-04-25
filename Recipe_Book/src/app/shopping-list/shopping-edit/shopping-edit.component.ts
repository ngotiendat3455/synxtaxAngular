import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }


  @ViewChild("nameInput", {
    static: false
  }) nameInputRef: ElementRef;

  @ViewChild("amountInput", {
    static: false
  }) amountInputRef: ElementRef;

  onAddItem(){
    const nameValue = this.nameInputRef.nativeElement.value;
    const amountValue = this.amountInputRef.nativeElement.value;

    const newIngedient = new Ingredient(nameValue, amountValue);
    this.shoppingListService.addIngredient(newIngedient)
  }

  onDeleteItem(){
    const removeIngredient = this.shoppingListService.getIngredients();
    this.shoppingListService.deleteIngredient(removeIngredient)
  }
}
