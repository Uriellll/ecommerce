import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../services/alert.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy{
  
  
  alert: Alert | null = null;
  alertService = inject(AlertService);
  subscription!: Subscription;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe((alert) => {
      this.alert = alert;
      if (alert.duration) {
        setTimeout(() => (this.alert = null), alert.duration);
      }
    });
  }

}
