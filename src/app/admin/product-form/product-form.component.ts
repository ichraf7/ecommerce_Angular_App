import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};
  id;
  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categoryService.getAll().snapshotChanges()
      .subscribe(item => {
        this.categories$ = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.categories$.push(x);
        })
      })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).snapshotChanges().subscribe(item => {
        this.product = item.payload.toJSON();
      });
    }
  }
  save(product) {
    if(this.id) {this.update(product,this.id);}
    else{
    this.productService.create(product);
  }
  }

  update(product,productId) {
    this.productService.update(product,productId);
  }
  delete(){
    if(confirm("are you sure")){
      console.log(this.id);
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
