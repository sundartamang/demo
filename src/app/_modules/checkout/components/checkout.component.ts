import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DemoService } from 'src/app/shared/service/demo.service';
import { Product } from 'src/app/shared/models/productModule';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // variabel declaration
  items: any = [];

  public skip = 0;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 5;

  constructor(
    private _location: Location,
    private _demoService: DemoService,
  ) { }

  ngOnInit() {
    this.getCartData();
  }


  productData: any = []
  getCartData(){
    this._demoService.productData.subscribe(data => {
      this.items = data;
    })
  }

  //back to previous page
  backPrevious() {
    this._location.back();
  }



}
