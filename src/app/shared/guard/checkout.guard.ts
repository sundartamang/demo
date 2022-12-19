import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DemoService } from '../service/demo.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(
    private _demoService : DemoService,
    private _router : Router
  ){

  }
  canActivate(){

    // return false

    if(this._demoService.isCartEmpty){
      return true
    }else{
      this._demoService.toastWarning("No product item in cart")
      this._router.navigate(['/'])
      return false
    }
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
  }
  
}
