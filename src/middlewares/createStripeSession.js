import stripeService from "../services/stripe.service.js";

const createStripeSession = async (req, res, next) => {
  try {
    // Obtener los items para Stripe desde el middleware anterior
    const itemsForStripe = req.purchaseData.itemsForStripe;

    // Crear la sesión de pago en Stripe
    const session = await stripeService.createCheckoutSession(itemsForStripe);

    if (!session || !session.id) {
      return res.status(400).json({ success: false, message: 'Failed to create Stripe session' });
    }

    // Crear una cookie para el sessionId
    res.cookie('stripeSessionId', session.id, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000 
    });

    // Enviar la URL de la sesión al frontend para que el usuario sea redirigido a Stripe
    res.status(200).json({
      success: true,
      stripeSessionUrl: session.url
    });
  } catch (error) {
    console.error('Error al crear la sesión de Stripe:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default createStripeSession;
