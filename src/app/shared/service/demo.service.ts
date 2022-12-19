import { Injectable } from '@angular/core';
// import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/productModule';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  placeholder = [];
  config = environment;
  cartItems = new BehaviorSubject([]);
  productData = new BehaviorSubject([]);


  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService

  ) {
    const _localStorage = this.getCartData()

    if (_localStorage == null) {
      this.cartItems.next([])
    } else {
      this.cartItems.next(_localStorage)
    }

    // if (localStorage) this.cartItems.next(_localStorage)

  }


  // add to cart
  addItem(product: Product) {
    const ls = this.getCartData();
    let exist: Product;

    if (ls) {
      exist = ls.find((item) => {
        return item.id === product.id;
      });
    }

    if (exist) {
      exist.qty++;
      this.setCartData(ls);
    } else {

      if (ls) {
        const newData = [...ls, product];
        this.setCartData(newData);
      }
      this.placeholder.push(product);
      this.setCartData(this.placeholder);
    }
  }

  // is cart empty
  checkData : boolean;
  get isCartEmpty() {
    let cart = this.getCartData()

    // let dataInCheckout = this.productData

    this.productData.subscribe((res)=>{
      if(res.length<1){
        this.checkData =false
      }else{
        this.checkData = true;
      }
    })
    console.log("CONDITION ", this.checkData)
    return this.checkData
    // console.log("DATA is => ", dataInCheckout)
    // if (cart == null) {
    //   return false
    // } else {
    //   return true
    // }
  }


  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItems.next(this.getCartData());
  }

  getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  clearCart() {
    localStorage.clear();
    this.cartItems.next([])
    this.placeholder = [];
  }


  sendProductData(data) {
    this.productData.next(data)
  }


  /*********************************************************API CALL*********************************************************/

  // get product list
  product_list_url = `${this.config.apiURl}products?limit=100`
  getList() {
    return this._http.get(this.product_list_url)
  }

  // get product detail
  get_detail = `${this.config.apiURl}products/`
  getDetail(id) {
    return this._http.get(`${this.get_detail}${id}`)
  }

  /*********************************************************TOAST MESSAGE*********************************************************/

  // toast success message
  toastSuccess(message) {
    this._toastr.success(message, 'Sucsss!', { progressBar: true });
  }

  // toast warning message
  toastWarning(message: string) {
    this._toastr.warning(message, '', { progressBar: true });
  }





}
