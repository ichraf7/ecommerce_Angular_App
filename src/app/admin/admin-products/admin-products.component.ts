import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/app-product';
import { DataTableResource } from 'angular5-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products : Product[];
  subscription : Subscription ;
  filteredProduct :any[] ;
  dataTableResource :DataTableResource <Product>;
  items :Product[];
  itemCount :Number ;
  constructor(private productService :ProductService) {
   this.subscription=this.productService.getAll().snapshotChanges()
   .subscribe(item=>{ 
    this.products=[];
    this.filteredProduct=[];
      item.forEach(element =>{
        var product=element.payload.toJSON() as Product;
       product["$key"]=element.key ;
        this.products.push(product); 
        this.filteredProduct.push(product);  
          this.initializeDataResource(this.products) ;
      })
    })
   }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  filter(query){
    this.filteredProduct =(query) ? this.products.filter(p =>p.title.toLowerCase().includes(query.toLowerCase())): this.products
  }

  private initializeDataResource(products :Product[]){
    this.dataTableResource=new DataTableResource(products);
    this.dataTableResource.query({offset:0}) 
     .then(items => this.items =items)
    this.dataTableResource.count()
      .then(items =>this.itemCount=items )   
  }
  reload(params){
    if (!this.dataTableResource) return ; 
    this.dataTableResource.query(params) 
    .then(items => this.items =items)
  }
}
