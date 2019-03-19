import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy {
  categories = [] ;
  subsription :Subscription
 @Input() category ;
  constructor(private categoryService: CategoryService) {
  this.subsription=this.categoryService.getAll().snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        var product = element.payload.toJSON();
        product["$key"] = element.key;
        this.categories.push(product);
      })
    })
   }

ngOnDestroy(){
this.subsription.unsubscribe();
}
}
