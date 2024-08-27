  import Stripe from 'stripe';
  import environment from '../utils/env.utils.js';

  const { STRIPE_SECRET_KEY } = environment;
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const verifyStripePayment = async (req, res, next) => {
    try {
      const sessionId = req.body.sessionId;

      if (!sessionId) {
        return res.status(400).json({ success: false, message: 'No session ID provided' });
      }

      // Recuperar la sesión de Stripe usando el session_id
      const session = await stripe.checkout.sessions.retrieve(sessionId);    

      if (session.payment_status === 'paid') {
        res.clearCookie('stripeSessionId', { httpOnly: false, secure: process.env.NODE_ENV === 'production' });                
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
