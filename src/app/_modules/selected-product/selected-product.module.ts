import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedProductRoutingModule } from './selected-product-routing.module';
import { CartComponent } from './components/cart.component';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SelectedProductRoutingModule
  ]
})
export class SelectedProductModule { }
