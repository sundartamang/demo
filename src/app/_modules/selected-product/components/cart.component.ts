import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/shared/service/demo.service';
import { Product } from 'src/app/shared/models/productModule';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private _demoService: DemoService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCartData();
  }

  // get cart items
  getCartData() {
    this._demoService.cartItems.subscribe((data) => {
      this.items = data

      for (let product of this.items) {

        console.log(product.price)
        this.totalPrice = this.totalPrice + product.price
      }
    })
  }

  // select data
  selectedProduct: any = [];

  selectProduct(event, data) {
    if (event.target.checked) {
      if (!this.selectedProduct.includes(data['id'])) {
        this.selectedProduct.push(data)
      }
    } else {
      this.functionRemoveProduct(data)
    }
  }


  // removed item from array
  functionRemoveProduct(data) {
    const index: number = this.selectedProduct.indexOf(data);
    if (index !== -1) {
      this.selectedProduct.splice(index, 1);
    }
  }

  //emptyCart
  emptyCart() {
    this._demoService.clearCart();
    this.getCartData();
  }

  // redirect function
  redirect() {
    this._demoService.sendProductData(this.selectedProduct)
    this._router.navigate(['/checkout'])
  }

}
