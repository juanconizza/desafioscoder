import CustomRouter from "../CustomRouter.js";
import cartContactManager from "../../data/mongo/managers/CartContactManager.mongo.js";
import mongoose from "mongoose";

const { Types } = mongoose;

class TicketRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], async (req, res, next) => {
      try {
        const filter = {};
        if (req.user.user_id) {
          filter.buyer_id = req.user.user_id;
        }

        const buyerFound = await cartContactManager.paginate({
          filter,
        });

        const cartInfo = buyerFound.docs;

        if (cartInfo.length === 0) {
          // Si no hay documentos en cartInfo, devolver un total de 0
          return res.json({ totalCart: 0 });
        }

        // Realizar la agregación para obtener el total de la compra
        const total = await cartContactManager.Model.aggregate([
          {
            $match: { buyer_id: new Types.ObjectId(cartInfo[0].buyer_id._id) },
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $unwind: "$product",
          },
          {
            $group: {
              _id: null,
              totalCart: {
                $sum: {
                  $multiply: ["$product.price", "$quantity"],
                },
              },
            },
          },
        ]);

        if (total.length > 0) {
          res.json({ totalCart: total[0].totalCart });
        } else {
          res.json({ totalCart: 0 });
        }
      } catch (error) {
        console.error("Aggregation Error:", error);
        next(error);
      }
    });
  }
}

const ticketRouter = new TicketRouter();
export default ticketRouter.getRouter();
