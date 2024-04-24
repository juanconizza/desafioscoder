import { randomBytes } from 'crypto';

class CartContact {
  constructor(
    id,
    user_id,
    name,
    lastName,
    manzanaYLote,
    product_id,
    photo,
    quantity,
    state,
    total
  ) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.lastName = lastName;
    this.manzanaYLote = manzanaYLote;
    this.product_id = product_id;
    this.photo = photo;
    this.quantity = quantity;
    this.state = state;
    this.total = total;
  }
}

class CartContactManager {
  static #cartContact = [];

  generateId() {
    return randomBytes(12).toString("hex");
  }

  create(data) {
    try {
      const newCartContact = new CartContact(
        this.generateId(),
        data.user_id,
        data.name,
        data.lastName,
        data.manzanaYLote,
        data.product_id,
        data.photo || "default_picture.png", // Ruta de imagen por defecto si no se proporciona
        data.quantity,
        data.state || "pending", // Estado por defecto al momento de crear el cartContact
        data.total,        
      );
      CartContactManager.#cartContact.push(newCartContact);
      return newCartContact;
    } catch (error) {
      console.error("Error al crear el contacto con el vendedor", error.message);
      return null;
    }
  }

  read() {
    try {
      return CartContactManager.#cartContact;
    } catch (error) {
      console.error("Error al leer el carrito de contacto:", error.message);
      return [];
    }
  }

  readOne(id) {
    try {
      const cartContact = CartContactManager.#cartContact.find(
        (cartContact) => cartContact.id === id
      );
      if (!cartContact) {
        throw new Error(`No se encontró ningún carrito con el ID ${id}.`);
      }
      return cartContact;
    } catch (error) {
      console.error("Error al leer el carrito:", error.message);
      return null;
    }
  }

  destroy(id) {
    try {
      const index = CartContactManager.#cartContact.findIndex(
        (cartContact) => cartContact.id === id
      );
      if (index === -1) {
        throw new Error(`No se encontró ningún producto con el ID ${id}.`);
      }
      const deletedCartContact = CartContactManager.#cartContact.splice(index, 1)[0];
      return deletedCartContact;
    } catch (error) {
      console.error("Error al eliminar el carrito de Contacto:", error.message);
      return null;
    }
  }
}

// Ejemplo de uso:
const cartContactManager = new CartContactManager();

// Definir 10 productos
const cartContactData = [
    {
      user_id: "1234",
      name: "Juan",
      lastName: "Pérez",
      manzanaYLote: "Manzana 5, Lote 10",
      product_id: "9876",
      photo: "sofa_cuero.jpg",
      quantity: 2,
      total: 700,
    },
    {
      user_id: "5678",
      name: "María",
      lastName: "González",
      manzanaYLote: "Manzana 3, Lote 15",
      product_id: "5432",
      photo: "mesa_comedor.jpg",
      quantity: 1,
      total: 250,
    },
    {
      user_id: "91011",
      name: "Pedro",
      lastName: "Rodríguez",
      manzanaYLote: "Manzana 8, Lote 5",
      product_id: "121314",
      photo: "tv_samsung.jpg",
      quantity: 1,
      total: 500,
    },
    {
      user_id: "1213",
      name: "Laura",
      lastName: "López",
      manzanaYLote: "Manzana 2, Lote 20",
      product_id: "151617",
      photo: "camara_nikon.jpg",
      quantity: 3,
      total: 1800,
    },
    {
      user_id: "1415",
      name: "Carlos",
      lastName: "Martínez",
      manzanaYLote: "Manzana 7, Lote 8",
      product_id: "181920",
      photo: "mesa_centro.jpg",
      quantity: 1,
      total: 150,
    },
    {
      user_id: "1617",
      name: "Ana",
      lastName: "Sánchez",
      manzanaYLote: "Manzana 1, Lote 30",
      product_id: "212223",
      photo: "batidora_bosch.jpg",
      quantity: 2,
      total: 80,
    },
    {
      user_id: "1819",
      name: "David",
      lastName: "Hernández",
      manzanaYLote: "Manzana 6, Lote 12",
      product_id: "242526",
      photo: "roomba_960.jpg",
      quantity: 1,
      total: 300,
    },
    {
      user_id: "2021",
      name: "Elena",
      lastName: "Gómez",
      manzanaYLote: "Manzana 4, Lote 18",
      product_id: "272829",
      photo: "silla_oficina.jpg",
      quantity: 2,
      total: 200,
    },
    {
      user_id: "2223",
      name: "Hugo",
      lastName: "Díaz",
      manzanaYLote: "Manzana 9, Lote 25",
      product_id: "303132",
      photo: "licuadora_oster.jpg",
      quantity: 1,
      total: 60,
    },
    {
      user_id: "2425",
      name: "Carolina",
      lastName: "Fernández",
      manzanaYLote: "Manzana 10, Lote 6",
      product_id: "333435",
      photo: "mesa_noche.jpg",
      quantity: 2,
      total: 160,
    },
  ];
  

// Crear los productos
cartContactData.forEach((cartContactData) => cartContactManager.create(cartContactData));

// Leer todos los productos
console.log("Todos los productos:");
console.log(cartContactManager.read());

// Leer un producto por su ID
console.log("Producto con ID:");
console.log(cartContactManager.readOne("ce45eb6cf85ad41a7c0a7df9")); // Definir el ID a Buscar en base al hash hexa generado.

// Eliminar un producto por su ID
console.log("Eliminar producto con ID: ");
console.log(cartContactManager.destroy("0fdeb76559c6af4"));
