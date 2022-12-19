import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { CheckoutGuard } from './shared/guard/checkout.guard';


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
    canActivate: [CheckoutGuard],
    loadChildren: () => import("./_modules/checkout/checkout.module").then(m => m.CheckoutModule)
  },
  {
    path:('**'),
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
