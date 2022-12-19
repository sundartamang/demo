import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/productModule';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  placeholder = [];
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
  get isCartEmpty() {
    let cart = this.getCartData()
    if (cart == null) {
      return false
    } else {
      return true
    }
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


  sendProductData(data){
    this.productData.next(data)
  }

  // receivedData(): Observable<any> {
  //   return this.subject_data.asObservable();
  // }




  // get product list
  product_list_url = `${config.base_url}products?limit=100`
  getList() {
    return this._http.get(this.product_list_url)
  }

  // get product detail
  get_detail = `${config.base_url}products/`
  getDetail(id) {
    return this._http.get(`${this.get_detail}${id}`)
  }

  // toast success message
  toastSuccess(message) {
    this._toastr.success(message, 'Sucsss!', { progressBar: true });
  }

  // toast warning message
  toastWarning(message: string) {
    this._toastr.warning(message, '', { progressBar: true });
  }





}
