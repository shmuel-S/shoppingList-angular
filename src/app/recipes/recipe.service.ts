import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel' ,
       'Crazzzy schnitzel',
       'https://www.savoredjourneys.com/wp-content/uploads/2015/10/schnitzel-germany.jpg',
     [
       new Ingredient('Meat' , 1),
       new Ingredient('French Fries', 20)
     ]),
    new Recipe(
      'Big Fat Burger' ,
      'Best burger!!',
      'https://cbsnews3.cbsistatic.com/hub/i/r/2018/03/07/481a9418-c3c8-492e-8e92-d1e6ec821075/crop/316x284+89+74/resize/270x/47b7fc47127620982695ad69887be491/sonic-burger.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

 getRecipes() {
   return this.recipes.slice();
 }

 getRecipe(index: number) {
   return this.recipes[index];
 }

 addIngredientsToShoppingList(ingredients: Ingredient[]){
   this.slService.addIngredients(ingredients);
 }

 addRecipe(recipe: Recipe) {
   this.recipes.push(recipe)
   this.recipesChanged.next(this.recipes.slice());

 }

 updateRecipe(index: number, newRecipe: Recipe) {
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
 }

 deleteRecipe(index: number) {
   this.recipes.splice(index , 1);
   this.recipesChanged.next(this.recipes.slice());
 }
}
