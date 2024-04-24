import { ProductManager } from "../data/fs/ProductManager.js";

const productManager = new ProductManager();

export default async (socket) => {
  console.log("Client connected: " + socket.id);

  // Emitir la lista de productos al cliente cuando se conecta
  socket.emit("products", await productManager.read());

  // Escuchar el evento "newProduct" enviado por el cliente
  socket.on("newProduct", async (data) => {
    // Crear un nuevo producto utilizando los datos recibidos
    await productManager.create(data);

    // Volver a emitir la lista de productos actualizada a todos los clientes
    const updatedProducts = await productManager.read();
    socket.emit("products", updatedProducts); // Enviar a todos los clientes conectados
  });

  // Manejar la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
};
