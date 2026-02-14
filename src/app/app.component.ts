import { Component } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, PaymentHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentView: 'landing' | 'payment-history' = 'landing';
}
