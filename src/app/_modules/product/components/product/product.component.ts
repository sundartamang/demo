import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/shared/service/demo.service';
import { PageChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import {
  SortDescriptor,
} from "@progress/kendo-data-query";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // variable declaration
  isLoading: boolean;
  btnActive: string = 'product';
  productData: any = [];
  categoryList: any = [];
  brandList: any = [];

  public skip = 0;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 15;
  gridData: any =[];


  //sorting kendo data
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
    {
      field: "",
      dir: "asc",
    },
  ];



  constructor(
    private _demoService: DemoService,
  ) { }

  ngOnInit() {
    this.productList();
  }

  // get product list

  productList() {
    this.isLoading = true
    this._demoService.getProductList().subscribe((res) => {
      this.productData = res['products']

      for (let data of this.productData) {
        if (!this.categoryList.includes(data['category'])) {
          this.categoryList.push(data['category'])
        }
        if (!this.brandList.includes(data['brand'])) {
          this.brandList.push(data['brand'])
        }
      }

      console.log(" category list ", this.categoryList)
      console.log(" brand list ", this.brandList)

    }, error => {
      this.isLoading = false
    }, () => {
      this.isLoading = false
    })
  }

  // active button
  showProduct: boolean = true;
  showCategory: boolean = false;
  showBrand: boolean = false;

  activeBtn(btnName: string) {
    this.btnActive = btnName;

    if (btnName === 'category') {
      this.showCategory = true;
      this.showBrand = false;
      this.showProduct = false;
    }
    else if (btnName === 'brand') {
      this.showCategory = false;
      this.showBrand = true;
      this.showProduct = false;
    } else {
      this.showCategory = false;
      this.showBrand = false;
      this.showProduct = true;
    }
  }

  // sorting function
  public sortChange(sort: SortDescriptor[]): void {
    this.orderByKey = "";
    this.dirKey = "";
    this.sort = sort;
    this.dirKey = this.sort[0].dir;
    this.orderByKey = this.sort[0].field;
    this.productList();
  }




}