import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ProductInterface } from '../interfaces/product.interface';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { cleanCart, deleteCart } from '../../store/actions';
import { Subscription } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent implements OnInit, OnDestroy{
  store = inject(Store<AppState>);
  products: ProductInterface[] = [];
  subs!:Subscription;
  checkoutService = inject(CheckoutService);
  alertService = inject(AlertService);
  ngOnInit(): void {
    this.subs = this.store.select('cart').subscribe(res =>{
      this.products = res.products
    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  removeItem(id:number){
    this.store.dispatch(deleteCart({id}))
    this.alertService.success('Item removed successfully')
  }
  cleanAll(){
    this.store.dispatch(cleanCart())
    this.alertService.success('All items removed successfully')

  }
  onProceedToPay(){
    this.checkoutService.onProceedToPay(this.products);
  }
}
