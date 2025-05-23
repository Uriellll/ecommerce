import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/list-products/list-products.component')},
    {path: 'detalle/:id', loadComponent: () => import('./components/detail/detail.component')},
    {path: 'pago', loadComponent: () => import('./components/checkout/checkout.component')},
    {path: '**', redirectTo: ''}
];
