import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductInterface } from '../components/interfaces/product.interface';
import { map } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  //Dont forget to create the environmets and type the consts serverUrl and stripeApiKey
  //serverUrl is the url of backend http://localhost:4242
  //stripeApiKey is the Publishable key created in your stripe Account
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverUrl;

  constructor() { }

  onProceedToPay(products: ProductInterface[]){
    return this._http.post(`${this._url}/create-checkout-session`, {items: products}).pipe(
      map(async(res:any) =>{
        // 
        const stripe = await loadStripe(environment.stripeApiKey);
        stripe?.redirectToCheckout({sessionId: res.id})
      })
    ).subscribe({
      error: (err) => console.log('Error', err)
    })
  }
}
