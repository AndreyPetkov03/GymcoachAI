import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StripeService } from '../../services/stripe';

@Component({
  selector: 'app-success',
  standalone: true,
  template: `
    <div class="success-page">
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p>You're now a Premium member</p>
        <div class="success-features">
          <div class="feature">✓ Unlimited AI messages</div>
          <div class="feature">✓ Priority support</div>
          <div class="feature">✓ All premium features</div>
        </div>
        <button class="success-btn" (click)="goHome()">
          Start Chatting →
        </button>
      </div>
    </div>
  `,
  styles: [`
    .success-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%);
      padding: 2rem;
    }

    .success-content {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 3rem 2rem;
      max-width: 500px;
      text-align: center;
      animation: slideUp 0.5s ease;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: white;
      animation: scaleIn 0.6s ease 0.2s both;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
    }

    p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .success-features {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .feature {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      padding: 0.75rem;
      background: rgba(108, 99, 255, 0.1);
      border: 1px solid rgba(108, 99, 255, 0.2);
      border-radius: 12px;
    }

    .success-btn {
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4);
    }

    .success-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(108, 99, 255, 0.5);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  `]
})
export class Success implements OnInit {
  private router = inject(Router);
  private stripe = inject(StripeService);

  ngOnInit() {
    // Set premium status in localStorage
    this.stripe.setPremium();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
