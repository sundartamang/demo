import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./_modules/product/product.module").then(m => m.ProductModule)
  },
  {
    path: "cart",
    loadChildren: () => import("./_modules/selected-product/selected-product.module").then(m => m.SelectedProductModule)
  },
  {
    path: "checkout",
    loadChildren: () => import("./_modules/checkout/checkout.module").then(m => m.CheckoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
