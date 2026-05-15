import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StripeService {
  async createCheckoutSession(plan: 'premium'): Promise<string> {
    const url = `${environment.supabaseUrl}/functions/v1/create-checkout`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.supabaseKey}`
      },
      body: JSON.stringify({ plan })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create checkout: ${errorText}`);
    }

    const data = await response.json();
    return data.url;
  }

  redirectToCheckout(plan: 'premium'): void {
    this.createCheckoutSession(plan)
      .then(url => {
        window.location.href = url;
      })
      .catch(error => {
        console.error('Checkout error:', error);
        alert('Failed to start checkout. Please try again.');
      });
  }

  isPremium(): boolean {
    return localStorage.getItem('userTier') === 'premium';
  }

  setPremium(): void {
    localStorage.setItem('userTier', 'premium');
  }

  setFree(): void {
    localStorage.setItem('userTier', 'free');
  }
}
