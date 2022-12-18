import { Component } from '@angular/core';
import { DemoService } from './shared/service/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // variable declaration
  title = 'demo';
  productNumber:number=0;


  constructor(
    private _demoService: DemoService,
  ){
  }

  ngOnInit(){
    this._demoService.cartItems.subscribe(data=>{
      
      console.warn("DATA app componenet :", data)

      this.productNumber = data.length;

    })
  }
}
