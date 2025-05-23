import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();
  constructor() { }
  

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
