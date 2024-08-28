import Stripe from 'stripe';
import environment from '../utils/env.utils.js';

const { STRIPE_SECRET_KEY } = environment;
const stripe = new Stripe(STRIPE_SECRET_KEY);

const verifyStripePayment = async (req, res, next) => {
  try {
    // Leer el sessionId desde la cookie
    const sessionId = req.cookies.stripeSessionId;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'No session ID provided' });
    }

    // Recuperar la sesión de Stripe usando el session_id
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Borrar la cookie después de que el pago ha sido verificado
      res.clearCookie('stripeSessionId', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
      next();
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error al verificar el pago:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default verifyStripePayment;
