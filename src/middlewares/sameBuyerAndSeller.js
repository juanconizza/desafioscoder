function sameBuyerAndSeller(req, res, next) {
  try {
    const { buyer_id, seller_id } = req.body;

    // Verificar si el comprador y el vendedor son la misma persona
    if (buyer_id === seller_id) {
      return res
        .status(400)
        .json({ error: "No puedes comprar tu propio producto." });
    }

    // Si no son iguales, continuar con la siguiente función middleware o ruta
    next();
  } catch (error) {
    next(error);
  }
}

export default sameBuyerAndSeller;
