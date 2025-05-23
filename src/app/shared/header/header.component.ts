import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  total: number = 0;
  store = inject(Store<AppState>);
  subs!: Subscription;
  searchService = inject(SearchService);
  search: string = '';
  router = inject(Router)
  ngOnInit(): void {
    this.subs = this.store.select('cart').subscribe(({totalAmount}) =>{
      this.total = totalAmount;
    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  onSearchChange() {
    this.router.navigate([''])
    console.log(this.search);
    this.searchService.setSearchTerm(this.search);
  }


}
