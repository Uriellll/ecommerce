import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface Alert {
  type: 'success' | 'danger';
  message: string;
  duration?: number; // opcional: en milisegundos
}
@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();


  constructor() { }
  showAlert(type: Alert['type'], message: string, duration = 3000) {
    this.alertSubject.next({ type, message, duration });
  }

  success(message: string, duration = 3000) {
    this.showAlert('success', message, duration);
  }

  error(message: string, duration = 3000) {
    this.showAlert('danger', message, duration);
  }
}
