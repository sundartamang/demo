import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DemoService } from 'src/app/shared/service/demo.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCartData();
    this.contactFormBuilder();
  }


  productData: any = []
  getCartData() {
    this._demoService.productData.subscribe(data => {
      this.items = data;
    })
  }

  contactFormBuilder() {
    this.contactForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      file: ['', [Validators.required]]  
    })
  }

  onSubmit() {
    console.log(this.contactForm.value)
  }

  //back to previous page
  backPrevious() {
    this._location.back();
  }



}
