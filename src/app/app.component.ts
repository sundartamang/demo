import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from './shared/service/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // variable declaration
  title = 'demo';
  productNumber: number = 0;


  constructor(
    private _demoService: DemoService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    this._demoService.cartItems.subscribe(data => {
      this.productNumber = data.length;
    })
  }

  // redirect function
  redirect() {
    this._router.navigate(['/'])
  }
}
