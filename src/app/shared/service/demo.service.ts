import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(
    private _http: HttpClient
  ) { }

  // get product list
  product_list_url = `${config.base_url}products?limit=100`
  getProductList() {
    return this._http.get(this.product_list_url)
    // return this._http.get(`${this.product_list_url}${limit}`)
  }
}
