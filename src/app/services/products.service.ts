import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../components/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private url: string = 'https://fakestoreapi.com/';

  constructor() { }

  getProducts():Observable<any>{
    return this.http.get<ProductInterface[]>(`${this.url}products`)
  }

  getProductById(id:number):Observable<any>{{
    return this.http.get<ProductInterface>(`${this.url}products/${id}`)
  }}
}
