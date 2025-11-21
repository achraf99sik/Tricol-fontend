import { Routes } from '@angular/router';
import { OrderFormComponent } from './components/order-form.component/order-form.component';
import { ProductFormComponent } from './components/product-form.component/product-form.component';
import { ProductListComponent } from './components/product-list.component/product-list.component';
import { StockMovementsComponent } from './components/stock-movements.component/stock-movements.component';
import { SupplierFormComponent } from './components/supplier-form.component/supplier-form.component';
import { SupplierListComponent } from './components/supplier-list.component/supplier-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'suppliers/new', component: SupplierFormComponent },
  { path: 'suppliers/edit/:id', component: SupplierFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: 'stock', component: StockMovementsComponent },
];
