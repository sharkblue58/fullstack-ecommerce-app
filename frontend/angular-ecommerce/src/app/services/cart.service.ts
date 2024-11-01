import { Injectable } from '@angular/core';
import { CartItem } from '../commons/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }
  
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(CartItem : CartItem){
   //check if we already the the item in our cart
   let alreadyExistsInCart: boolean = false;
   let existingCartItem: CartItem = undefined!;

   if(this.cartItems.length > 0){

    //find the item in the cart based on item id  

    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === CartItem.id)!;

    //check if we found it

    alreadyExistsInCart = (existingCartItem != undefined);
   }
   if (alreadyExistsInCart){
     //increment the quantity
     existingCartItem.quantity++;
   }
   else{
     //just add the item to the array
     this.cartItems.push(CartItem);
   }
   this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    
    for(let currentCartItem of this.cartItems){
        totalPriceValue+= currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue+= currentCartItem.quantity;
    }
     
    //publish new values so subscribers will receive them
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
     console.log("The cart contents are: ");
     for(let tempCartItem of this.cartItems){
      const subTotal = tempCartItem.unitPrice*tempCartItem.quantity;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotal=${subTotal}`);
     }
     console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
     console.log('----');
  }

  
}
