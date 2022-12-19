import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout.component';

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridModule,PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ButtonsModule,
    GridModule, 
    PDFModule, 
    ExcelModule,
    ButtonsModule, 
    InputsModule, 
    PDFExportModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CheckoutModule { }
