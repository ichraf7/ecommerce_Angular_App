import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from '../shopping-card.service';
import { Subscription, Observable } from 'rxjs';
import { shoppingCart } from '../models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from '../models/app-product';
import { shoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemQuantity :number =0 ;
  products :shoppingCartItem[] =[];
  cart$:Observable<shoppingCart>
  constructor(private shoppingService: ShoppingCardService , private shoppingCart: shoppingCart) { }

 async ngOnInit() {
   let cart = await this.shoppingService.getcart();
  cart.valueChanges().take(1)
    .subscribe(cartId => {
      for (let item in cartId.items) {
       this.shoppingCartItemQuantity += cartId.items[item].quantity;
       this.products.push(cartId.items[item])
       console.log(cartId.items[item])
      }
    });

    
  }
 getPrice(){
   
 }
}
