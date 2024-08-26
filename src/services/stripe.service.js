import Stripe from 'stripe';
import environment from '../utils/env.utils.js';

const { STRIPE_SECRET_KEY } = environment;
const stripe = new Stripe(STRIPE_SECRET_KEY);

class StripeService {
  createCheckoutSession = async (items) => {
    try {
      console.log(items)
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
        success_url: `http://localhost:8080/gracias`,
        cancel_url: `http://localhost:8080/cancelada`,
      });

      console.log("Return de Session: "+ session)

      return session;
    } catch (error) {
      console.error('Stripe error:', error);
      throw new Error(`Failed to create Stripe session: ${error.message}`);
    }
  };
}




const stripeService = new StripeService();
export default stripeService;
