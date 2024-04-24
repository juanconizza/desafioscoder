import fs from "fs"
import { randomBytes } from "crypto";

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

export class CartContactManager {
  static #path = "../fs/files/cartContact.json";

  async init() {
    try {
      // Verificar si el archivo existe
      await fs.promises.access(CartContactManager.#path);
      console.log("File already Exists!");
    } catch (error) {
      // Si el archivo no existe, crearlo con un array vacío
      await fs.promises.writeFile(CartContactManager.#path, JSON.stringify([], null, 2)); // Escribir un array JSON vacío
      console.log("File Created!");
    }
}


  generateId() {
    return randomBytes(12).toString("hex");
  }

  async create(data) {
    try {
      const cartContact = JSON.parse(await fs.promises.readFile(CartContactManager.#path, "utf-8"));
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
      cartContact.push(newCartContact);
      await fs.promises.writeFile(CartContactManager.#path, JSON.stringify(cartContact, null, 2));
      return newCartContact;
    } catch (error) {
      console.error("Error trying to create cart contact:", error.message);
      return null;
    }
  }

  async read() {
    try {
      // Leer los carritos de contacto del archivo
      const cartContact = JSON.parse(await fs.promises.readFile(CartContactManager.#path, "utf-8"));
      return cartContact;
    } catch (error) {
      console.error("Error reading cart contact:", error.message);
      return [];
    }
  }

  async readOne(id) {
    try {
      // Leer los carritos de contacto del archivo
      const cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#path, "utf-8")
      );
      const cartContact = cartContacts.find((cartContact) => cartContact.id === id);
      if (!cartContact) {
        throw new Error(`Did NOT found the cart contact with ID ${id}.`);
      }
      return cartContact;
    } catch (error) {
      console.error("Error reading cart contact:", error.message);
      return null;
    }
  }

  async update(id, newData) {
    try {
      // Leer los carritos de contacto del archivo
      let cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#path, "utf-8")
      );
      
      // Buscar el carrito de contacto con el ID proporcionado
      const index = cartContacts.findIndex((cartContact) => cartContact.id === id);
      if (index === -1) {
        throw new Error(`Did not find the cart contact with ID: ${id}.`);
      }
      
      // Actualizar las propiedades del producto con los nuevos datos
      cartContacts[index] = {
        ...cartContacts[index], // Mantener las propiedades anteriores
        ...newData // Actualizar con los nuevos datos
      };
      
      // Escribir la lista de productos actualizada en el archivo
      await fs.promises.writeFile(
        CartContactManager.#path,
        JSON.stringify(cartContacts, null, 2)
      );
      
      return cartContacts[index]; // Devolver el producto actualizado
    } catch (error) {
      console.error("Error updating cart contact:", error.message);
      return null;
    }
}


  async destroy(id) {
    try {
      // Leer los carritos de contacto del archivo
      let cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#path, "utf-8")
      );
      const index = cartContacts.findIndex((cartContact) => cartContact.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún carrito de contacto con el ID ${id}.`);
      }
      const deletedCartContact = cartContacts.splice(index, 1)[0];
      // Escribir la lista de productos actualizada en el archivo
      await fs.promises.writeFile(
        CartContactManager.#path,
        JSON.stringify(cartContacts, null, 2)
      );
      return deletedCartContact;
    } catch (error) {
      console.error("Error deleting cart contact:", error.message);
      return null;
    }
  }
}


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

  
  (async () => {
    const cartContactManager = new CartContactManager();
    await cartContactManager.init(); // Inicializa el gestor de productos
   
    // Recorre el array productsData de forma asíncrona y crea los productos uno por uno
    for (const cartContact of cartContactData) {
      await cartContactManager.create(cartContact);
    }
    console.log("Files Created Succesfully!.");
    
  })();
 


  
//DEJAMOS LOS METODOS MANUALES PARA PROBAR EL CART CONTACT MANAGER: 

/*

const cartContactManager = new CartContactManager();

  // Leer todos los cart contact
  console.log("Todos los cart contact:");
  console.log(await cartContactManager.read());

  // Leer un cart contact por su ID
  console.log("Cart Contact encontrado con ID:");
  console.log(await cartContactManager.readOne("153de05c0043b44cf7e3f88e")); // Definir el ID a Buscar en base al hash hexa generado.

  // Leer un cart contact que no Existe
  console.log("Producto encontrado con ID:");
  console.log(await cartContactManager.readOne("jkdhfgkhdsfkh"));

  // Eliminar un cart contact por su ID
  console.log("Eliminar producto con ID: ");
  console.log(await cartContactManager.destroy("3dd2ed652ea7f381adcadb18"));

  // Modificar el cart contact con el ID  y actualizar 
console.log(await cartContactManager.update("5c1f4ab841ca5319bcecc0f7", { name: "Angie", state: "connected", total: 2500 }));

  // Eliminar un cart contact por su ID que NO EXISTE
  console.log("Eliminar producto con ID: ");
  console.log(await cartContactManager.destroy("fdgdfgdfg"));

*/