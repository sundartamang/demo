import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DemoService } from 'src/app/shared/service/demo.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailService } from 'src/app/shared/service/email/email.service';
import { Router } from '@angular/router';
declare let Email: any;

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
    private _fb: FormBuilder,
    private _emailService: EmailService,
    private _router: Router
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
      email: ['', [Validators.required, Validators.email]],
      file: ['', [Validators.required]]
    })
  }

  // read file url
  documents = []
  readFileURL(event) {
    const files = event.target.files;

    for (var i = 0; i < event.target.files.length; i++) {
      this.documents.push(event.target.files[i]);
    }
  }


  username = 'sundartamang6@gmail.com'
  password = '352F28AA0CD5A71462D3805F14B04A4F040F'
  host = 'smtp.elasticemail.com'

  onSubmit() {
    console.log(this.contactForm.value)
    let formData = new FormData();

    Email.send({
      Host: this.host,
      Username: this.username,
      Password: this.password,
      To: this.contactForm.value,
      From: this.username,
      Subject: this.contactForm.value,
      Body: this.contactForm.value
    }).then(
      this._demoService.toastSuccess("Mail sent successfully")
    );
    this._router.navigate(['/cart'])

  }



  //back to previous page
  backPrevious() {
    this._location.back();
  }

}
