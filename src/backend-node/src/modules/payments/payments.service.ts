import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_API_KEY')!, {
      apiVersion: '2025-01-27' as any,
    });
  }

  async createCheckoutSession(orderId: string, amount: number, customerEmail: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Order ${orderId}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get('APP_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('APP_URL')}/cancel`,
      metadata: { orderId },
    });

    await this.prisma.payment.create({
      data: {
        orderId,
        stripeSessionId: session.id,
        amount,
        status: 'PENDING',
      },
    });

    return session;
  }

  async handleWebhook(sig: string, payload: Buffer) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.prisma.payment.update({
        where: { stripeSessionId: session.id },
        data: { status: 'PAID' },
      });
      // also update order status?
    }
  }
}
