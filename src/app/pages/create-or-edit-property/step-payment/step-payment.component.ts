import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
declare var Stripe;
@Component({
  selector: 'app-step-payment',
  templateUrl: './step-payment.component.html',
  styleUrls: ['./step-payment.component.scss'],
})
export class StepPaymentComponent implements OnInit {
  package = 'free';
  loading = false;
  stripe = Stripe(
    'pk_test_51I3Q4QB3J6KKXZkoNTZT3NMq8Z5f7dRrxJJHUMFPautwDyhaIVD5wbN6nsUlPAOyQ0p6WhBzKWnsyLeinOERZYH300B9cV4Abt'
  );
  card: any;
  @Input() property: Property;
  constructor(
    private propertySrv: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  changePackage(type): void {
    this.package = type;
    if (type === 'pro') {
      setTimeout(() => {
        this.setupStripe();
      }, 300);
    }
  }

  setupStripe(): void {
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#0f0f0f',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '20px',
        fontWeight: 600,
        '::placeholder': {
          color: '#4b4b4b',
          iconColor: '#4b4b4b',
        },
        iconColor: '#0f0f0f',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    this.card = elements.create('card', {
      iconStyle: 'default',
      hideIcon: false,
      style,
    });

    this.card.mount('#card-element');
    this.card.addEventListener('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.loadingStripe(true);
      this.stripe
        .createPaymentMethod({
          type: 'card',
          card: this.card,
        })
        .then((result) => {
          if (result.error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            console.log(result.paymentMethod.id);
            this.publishProperty().then();
          }

          this.loadingStripe(false);
        });
    });
  }

   loadingStripe(isLoading): void {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector('button').disabled = true;
      document.querySelector('#spinner').classList.remove('hidden');
      document.querySelector('#button-text').classList.add('hidden');
    } else {
      document.querySelector('button').disabled = false;
      document.querySelector('#spinner').classList.add('hidden');
      document.querySelector('#button-text').classList.remove('hidden');
    }
  }

  async publishProperty(): Promise<any> {
    this.loading = true;
    const res = await this.propertySrv.createProperty(this.property);
    if (res) {
      console.log(res);
      this.router.navigate([`/propiedad`]);
    }
    this.loading = false;
  }
}
