import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/app-product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCardService } from '../shopping-card.service';
import 'rxjs/Rx'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy  {

  products :Product[] =[]
  categories;
  subscription: Subscription;
  subscription1: Subscription;
  filtredProduct :Product[] =[] ;
  category;
  cart ;
  constructor(private productService: ProductService,
    private shoppingCart:ShoppingCardService,
    route: ActivatedRoute ) {

this.subscription= this.productService.getAll().snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        var product = element.payload.toJSON() as Product;
        product["k"] = element.key;
        this.products.push(product);
        this.filtredProduct.push(product);
      })
   this.subscription1=route.queryParamMap.subscribe(param =>{
        this.category=param.get('category');
        this.filtredProduct= (this.category) ? 
        this.products.filter(p =>p.category===this.category) :this.products
       }) 
    })
  }
  async ngOnInit(){
   (await this.shoppingCart.getcart())
 .snapshotChanges().take(1).subscribe(cart => {this.cart=cart.payload.toJSON()
});

  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription.unsubscribe();

  }

}
