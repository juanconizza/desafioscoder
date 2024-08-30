import "../utils/env.utils.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/db.js";
import productsRepository from "../repositories/products.rep.js";

const categorias = [
  "Arte y Artesanía",
  "Bebés y Niños Pequeños",
  "Coleccionables",
  "Deportes",
  "Electrónica",
  "Herramientas y Equipamiento",
  "Hogar",
  "Instrumentos Musicales",
  "Juguetes y Juegos",
  "Libros y Medios",
  "Moda y Accesorios",
  "Muebles"
];

function ramdonCategory() {
  const indiceAleatorio = Math.floor(Math.random() * categorias.length);
  return categorias[indiceAleatorio];
}

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 333; i++) {
      const product = {
        seller_id: "66bcc6d441ebba0f9b61761c", // Creamos 333 para un user admin y 666 entre dos users role 0
        title: faker.commerce.productName(),
        photo: "mock_img.png",
        category: ramdonCategory(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
      };
      await productsRepository.createRepository(product);
    }
    console.log("Products created");
  } catch (error) {
    console.log(error);
  }
}

createData();
