import { paginateService } from "../services/carts.service.js";

async function sumPurchase(req, res, next) {
  try {
    const filter = {};
    if (req.user.user_id) {
      filter.buyer_id = req.user.user_id;
    }

    const buyerFound = await paginateService({
      filter,
    });

    const cartInfo = buyerFound.docs;
    let totalPurchase = 0;

    const itemsForStripe = cartInfo.map(item => {
      const quantity = item.quantity;
      const price = item.product_id.price;
      const title = item.product_id.title;
      const subtotal = quantity * price;

      totalPurchase += subtotal;

      return {
        title,
        quantity,
        price, 
      };
    });

    const groupedBySeller = cartInfo.reduce((acc, item) => {
      const sellerId = item.seller_id._id;
      const subtotal = item.quantity * item.product_id.price;

      if (!acc[sellerId]) {
        acc[sellerId] = {
          seller_id: item.seller_id._id,
          products: [],
        };
      }
      acc[sellerId].products.push({
        product_id: item.product_id._id,
        quantity: item.quantity,
        price: item.product_id.price,
        subtotal: subtotal,
      });
      return acc;
    }, {});

    const sellers = Object.values(groupedBySeller);

    const purchaseData = {
      buyer_id: req.user.user_id,
      sellers: sellers,
      total_purchase: totalPurchase,
      state: "success",
      itemsForStripe, 
    };

    req.purchaseData = purchaseData;

    next();
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}

export default sumPurchase;
