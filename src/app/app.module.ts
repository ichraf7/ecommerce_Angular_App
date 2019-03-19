import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule} from '@angular/forms' ;
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule} from 'angular5-data-table';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCardService } from './shopping-card.service';
import { shoppingCart } from './models/shopping-cart';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule ,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule ,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '' ,component: ProductsComponent },
      { path: 'products' , component: ProductsComponent },
      { path: 'login' , component: LoginComponent },
      { path: 'shopping-cart' ,component: ShoppingCartComponent ,canActivate :[AuthGuard]},
      { path: 'check-out' ,component: CheckOutComponent, canActivate :[AuthGuard] },
      { path: 'order-success' ,component: OrderSuccessComponent,canActivate :[AuthGuard] },
      { path: 'admin/orders' ,component: AdminOrdersComponent },
      { path: 'admin/products/new' ,component: ProductFormComponent},
      { path: 'admin/products/:id' ,component: ProductFormComponent },
      { path: 'admin/products' ,component: AdminProductsComponent },

    ]) , 
  ],
  providers: [
    AuthService ,
    AuthGuard,
    UserService,
    AdminAuthGuard ,
    CategoryService ,
    ProductService, 
    ShoppingCardService,
    shoppingCart
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
