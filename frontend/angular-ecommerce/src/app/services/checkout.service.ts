import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../commons/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl ="http://localhost:8080/api/checkout/purchase";
  constructor(private http : HttpClient) { }
  
  placeOrder(purchase :Purchase):Observable<any>{ 
    
    return this.http.post<Purchase>(this.baseUrl,purchase);
  }

}
