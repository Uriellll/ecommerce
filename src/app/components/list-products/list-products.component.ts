import { Component, inject,  OnDestroy,  OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ProductInterface } from '../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { addCart } from '../../store/actions';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgFor, TruncatePipe, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export default class ListProductsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subs.forEach((sub:Subscription) => sub.unsubscribe())
  }
  productsService = inject(ProductsService);
  alertService = inject(AlertService);
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  store = inject(Store<AppState>);
  subs: Subscription[] = [];
  searchService = inject(SearchService);

  ngOnInit(): void {
    this.subs.push(this.productsService.getProducts().subscribe((res) => {
      this.products = res;
      this.filteredProducts = this.products;
      //allow to get the quantity of the products save in the cart
      this.subs.push(this.store.select('cart').subscribe(({ products }) => {
        const storePro: ProductInterface[] = [...products];
        for (let i = 0; i < storePro.length; i++) {
          for (let j = 0; j < this.filteredProducts.length; j++) {
            if (storePro[i].id == this.filteredProducts[j].id) {
              this.filteredProducts[j].qty = storePro[i].qty;
            }
          }
        }
        

      }));
    }));
    this.subs.push(
      this.searchService.searchTerm$.subscribe(term => {
        console.log(term)
        const lowerTerm = term.toLowerCase();
        this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(lowerTerm)
        );
      })
    )
    
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
