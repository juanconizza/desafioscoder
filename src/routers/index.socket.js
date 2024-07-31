//import productManager from "../data/mongo/managers/ProductsManager.mongo.js";

import productsRepository from "../repositories/products.rep.js";
import ProductsDTO from "../dto/products.dto.js";

export default async (socket) => {
  console.log("Client connected: " + socket.id);

  const filter = {};
  const sortAndPaginate = {};
  sortAndPaginate.limit = 8;
  sortAndPaginate.sort = { createdAt: -1 };

  const productsPaginate = await productsRepository.paginateRepository({
    filter,
    sortAndPaginate,
  });
  console.log(productsPaginate);
  // Emitir la lista de productos al cliente cuando se conecta
  socket.emit("products", productsPaginate.docs);

  // Escuchar el evento "newProduct" enviado por el cliente
  socket.on("newProduct", async (data) => {
    const dataDTO = new ProductsDTO(data);
    // Crear un nuevo producto utilizando los datos recibidos
    await productsRepository.createRepository(dataDTO);

    // Volver a emitir la lista de productos actualizada a todos los clientes
    const updatedProducts = await productsRepository.paginateRepository({
      filter,
      sortAndPaginate,
    });
    socket.emit("products", updatedProducts.docs); // Enviar a todos los clientes conectados
  });

  // Manejar la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
};
