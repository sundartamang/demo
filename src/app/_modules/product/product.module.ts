import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridModule,PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ButtonsModule,
    GridModule, 
    PDFModule, 
    ExcelModule,
    ButtonsModule, 
    InputsModule, 
    PDFExportModule,
  ]
})
export class ProductModule { }
