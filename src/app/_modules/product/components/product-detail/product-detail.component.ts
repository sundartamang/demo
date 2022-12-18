import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DemoService } from 'src/app/shared/service/demo.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // variable declaration
  product_id
  productDetailData: any = []

  constructor(
    private _activateRoute: ActivatedRoute,
    private _demoService: DemoService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getProductDetail(this._activateRoute.snapshot.params['id'])
  }


  // get product detail
  getProductDetail(id) {
    this._demoService.getDetail(id).subscribe((res) => {

      console.log("RESPOPNSE IS => ", res)
      if (res) {
        this.productDetailData = res
      }
    })
  }


  // add to cart
  products: any[] = [];

  addToCart(product: any) {
    this._demoService.addItem(product)
  }


  //back to previous page
  backPrevious() {
    this._location.back();
  }

}
