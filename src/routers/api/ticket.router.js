import CustomRouter from "../CustomRouter.js";
import CartContact from "../../data/mongo/models/cartContact.model.js"; 

class TicketRouter extends CustomRouter {
  init() {
    this.read(
      "/",
      ["USER"],
      async (req, res, next) => {
        try {
          const buyerId = req.user.user_id;

          // Buscar todos los items en el carrito del comprador actual
          const cartItems = await CartContact.find({ buyer_id: buyerId });

          if (!cartItems || cartItems.length === 0) {
            return res.json({ total: 0 }); // Si no hay productos en el carrito
          }

          // Calcular el total de la compra
          let totalAmount = 0;
          for (const item of cartItems) {
            const productPrice = item.product_id.price; // Obtener el precio del producto
            const quantity = item.quantity; // Obtener la cantidad del producto en el carrito
            totalAmount += productPrice * quantity; // Calcular el subtotal del producto
          }

          res.json({ total: totalAmount }); // Devolver el total de la compra
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

const ticketRouter = new TicketRouter();

export default ticketRouter.getRouter();
