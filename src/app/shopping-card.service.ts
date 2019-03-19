import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/app-product';
import 'rxjs/Rx';
import { shoppingCart } from './models/shopping-cart';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }
  create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }
  async getcart() : Promise<AngularFireObject<shoppingCart>> {
    let cartId = await this.getOrCreate();
    return this.db.object('/shopping-cart/' + cartId);
  }
  async getOrCreate() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let res = await this.create();
      localStorage.setItem('cartId', res.key);
      return res.key;
    }
    return cartId
  }
  async addToCart(product: Product) {
    let cartId = await this.getOrCreate();
    let item = this.db.object('/shopping-cart/' + cartId + '/items/' + product.k)
    item.valueChanges().take(1).subscribe(res => {
      if (res) item.update({ quantity: res["quantity"] + 1 })
      else {
        item.update({ product: product, quantity: 1 })
      }
    })
  }

 async removeFromCart(product :Product){
    let cartId = await this.getOrCreate();
    let item = this.db.object('/shopping-cart/' + cartId + '/items/' + product.k)
    item.valueChanges().take(1).subscribe(res => {
      if (res["quantity"]===1) item.remove()
      else{
        item.update({ quantity: res["quantity"] - 1 })
      }
    })
  }
  
  
}

