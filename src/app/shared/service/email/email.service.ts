import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {



  private url = ""
  constructor(
    private _http: HttpClient,
  ) { }

  SendEmail(input: any) {
    return this._http.post(this.url, input).pipe(map(
      (response) => {
        if (response) {
          return response
        }
      },
      (error) => {
        if (error) {
          return error
        }
      }
    )
    )
  }
}
