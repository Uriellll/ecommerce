import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from '../interfaces/product.interface';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AlertService } from '../../services/alert.service';
import { addCart } from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, CurrencyPipe, NgFor, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export default class DetailComponent implements OnInit {
  //usando input binding
  @Input({ alias: 'id' }) productId!: number;
  productService = inject(ProductsService);
  product!: ProductInterface;
  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  emptyStars: number[] = [];
  store = inject(Store<AppState>)
  alertService = inject(AlertService)
  subs: Subscription[] = [];
  ngOnInit(): void {
    this.subs.push(this.productService.getProductById(this.productId).subscribe((res) => {
      this.product = res;
      this.generateSvg(this.product.rating.rate);
      this.subs.push(this.store.select('cart').subscribe(({products}) =>{
        const storePro: ProductInterface[] = [...products];
        const foundProduct = storePro.find((item:ProductInterface) => item.id == this.product.id)
        if(foundProduct){
          this.product.qty = foundProduct.qty
        }
      }))

    }));
  }
  generateSvg(rate: number): any {
    const full = Math.floor(rate);
    const totalStars = 5;
    this.fullStars = Array(full).fill(0);
    const remaining = totalStars - full;
    this.emptyStars = Array(remaining).fill(0);
  }
  addCart(item: ProductInterface) {
      if (!item.qty || item.qty <= 0 || item.qty > 20) {
        this.alertService.error('Choose a valid quantity');
        return;
      }
      this.store.dispatch(addCart({ product: { ...item } }));
      this.alertService.success('Added to cart successfully');
    }
}
