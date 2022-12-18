import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/productModule';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  placeholder = [];
  cartItems = new BehaviorSubject([]);


  constructor(
    private _http: HttpClient,

  ) {
    const _localStorage = this.getCartData();


    if(_localStorage==null){
      this.cartItems.next([])
    }else{
      this.cartItems.next(_localStorage)
    }

    // if (localStorage) this.cartItems.next(_localStorage)

    console.log("I an demo service constructor....")
  }


  // add to cart
  addItem(product: Product) {
    const ls = this.getCartData();
    let exist: Product;

    if (ls){
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


  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItems.next(this.getCartData());
  }

  getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  // get product list
  product_list_url = `${config.base_url}products?limit=100`
  getList() {
    return this._http.get(this.product_list_url)
    // return this._http.get(`${this.product_list_url}${limit}`)
  }

  // get product detail
  get_detail = `${config.base_url}products/`
  getDetail(id) {
    return this._http.get(`${this.get_detail}${id}`)
  }

}
