import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/app-product';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product;
  @Input('showActions') showActions = true;
  @Input('shoppingCart') shoppingCart;
  quantity: number;
  constructor(private shoppingCartService: ShoppingCardService) { }

  addToCard() {
    this.shoppingCartService.addToCart(this.product)
    if (this.shoppingCart.items[this.product.k]) {
      this.shoppingCart.items[this.product.k].quantity += 1;
    }
    else {
      this.shoppingCart.items[this.product.k] = { product: this.product }
      this.shoppingCart.items[this.product.k].quantity = 1
      console.log(this.shoppingCart.items)
    }
  }


  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.k];
    if (item != undefined) return item.quantity
    else return 0;
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
    if (this.shoppingCart.items[this.product.k]) {
      this.shoppingCart.items[this.product.k].quantity -= 1;
    }
  }
}