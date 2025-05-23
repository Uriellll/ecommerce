import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../../services/spinner.service';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(SpinnerService);

  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide()));
};
