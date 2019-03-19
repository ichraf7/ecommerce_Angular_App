import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCardService } from '../shopping-card.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit , OnDestroy{
  shoppingCartItemQuantity =0 ;
  subscription :Subscription
  constructor(public auth: AuthService, private shoppingService: ShoppingCardService) {

  }
  logOut() {
    this.auth.logOut();
  }

  async ngOnInit() {
    let cart = await this.shoppingService.getcart();
    this.subscription= cart.valueChanges().take(1).subscribe(cartId => {
      for (let item in cartId.items) {
       this.shoppingCartItemQuantity += cartId.items[item].quantity;
      }
    });
   }
   ngOnDestroy(){
   this.subscription.unsubscribe()
   }

}
