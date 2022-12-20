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
  isFilter: boolean = false;

  public skip = 0;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 15;
  gridData: any = [];


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
    private _router: Router
  ) { }

  ngOnInit() {
    this.productList();
  }

  // get product list
  productList() {
    this.isLoading = true
    this._demoService.getList().subscribe((res) => {
      this.productData = res['products']

      for (let data of this.productData) {
        if (!this.categoryList.includes(data['category'])) {
          this.categoryList.push(data['category'])
        }
        if (!this.brandList.includes(data['brand'])) {
          this.brandList.push(data['brand'])
        }
      }

    }, error => {
      this.isLoading = false
    }, () => {
      this.isLoading = false
    })
  }


  // brand filter
  filterProductData: any = []
  filteredBrandName: string;

  brandFilter(data: any) {
    this.filteredBrandName = data

    if (this.filteredBrandName) {
      this.isFilter = true
      this.filterProductData = this.productData.filter(item => item['brand'] === this.filteredBrandName)
    } else {
      this.isFilter = false
      this.productList();
    }
  }


  // category filter
  filteredName: string;
  categoryFilter(data: any) {

    this.filteredName = data

    if (this.filteredName) {
      this.isFilter = true
      this.filterProductData = this.productData.filter(item => item['category'] === this.filteredName)
    } else {
      this.isFilter = false
      this.productList();
    }

  }

  // active button
  showProduct: boolean = true;
  showCategory: boolean = false;
  showBrand: boolean = false;

  activeBtn(btnName: string) {
    this.btnActive = btnName;

    if (btnName === 'category') {
      this.productList();
      this.isFilter = false
      this.showCategory = true;
      this.showBrand = false;
      this.showProduct = false;
    }
    else if (btnName === 'brand') {
      this.productList();
      this.isFilter = false
      this.showCategory = false;
      this.showBrand = true;
      this.showProduct = false;
    } else {
      this.showCategory = false;
      this.showBrand = false;
      this.showProduct = true;
    }
  }


  // redirec to function
  redirect(data: any) {
    this._router.navigate([`/product-detail/${data.id}`])
  }




}