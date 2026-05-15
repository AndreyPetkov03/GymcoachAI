import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  template: `
    <div class="cancel-page">
      <div class="cancel-content">
        <div class="cancel-icon">✕</div>
        <h1>Payment Cancelled</h1>
        <p>No charges were made to your account</p>
        <div class="cancel-message">
          You can upgrade to Premium anytime from the pricing menu.
        </div>
        <button class="cancel-btn" (click)="goHome()">
          ← Back to Home
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cancel-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%);
      padding: 2rem;
    }

    .cancel-content {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 3rem 2rem;
      max-width: 500px;
      text-align: center;
      animation: slideUp 0.5s ease;
    }

    .cancel-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: rgba(255, 77, 77, 0.2);
      border: 2px solid rgba(255, 77, 77, 0.4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: #ff6b6b;
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

    .cancel-message {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .cancel-btn {
      padding: 1rem 2.5rem;
      background: rgba(255, 255, 255, 0.08);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .cancel-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-2px);
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
export class Cancel {
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }
}
