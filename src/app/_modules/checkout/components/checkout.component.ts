import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DemoService } from 'src/app/shared/service/demo.service';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // variabel declaration
  items: any = [];
  contactForm: FormGroup;

  public skip = 0;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 5;

  constructor(
    private _location: Location,
    private _demoService: DemoService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.getCartData();
  }


  productData: any = []
  getCartData() {
    this._demoService.productData.subscribe(data => {
      this.items = data;
    })
  }

  contactFormBuilder() {
    this.contactForm = this.builder.group({
      name : new FormControl('',[Validators.required, Validators.minLength(2)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      file: new FormControl('', [Validators.required])
    })
  }

  //back to previous page
  backPrevious() {
    this._location.back();
  }



}
