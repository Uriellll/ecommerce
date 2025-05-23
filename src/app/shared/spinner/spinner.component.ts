import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  spinnerService = inject(SpinnerService);

}
