import Stripe from 'stripe';
import environment from '../utils/env.utils.js';

const { STRIPE_SECRET_KEY, CLIENT_URL } = environment;
const stripe = new Stripe(STRIPE_SECRET_KEY);

class StripeService {
  createCheckoutSession = async (items) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${CLIENT_URL}/gracias`,
        cancel_url: `${CLIENT_URL}/cancelada`,
      });      

      return session;
    } catch (error) {
      console.error('Stripe error:', error);
      throw new Error(`Failed to create Stripe session: ${error.message}`);
    }
  };
}




const stripeService = new StripeService();
export default stripeService;
