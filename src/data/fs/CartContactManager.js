import fs from "fs";

class CartContactManager {
  static #cartContactPath = "./src/data/fs/files/cartContact.json";
  static #usersPath = "./src/data/fs/files/users.json";
  static #productsPath = "./src/data/fs/files/products.json";

  async init() {
    try {
      await fs.promises.access(CartContactManager.#cartContactPath);
      console.log("File already Exists!");
    } catch (error) {
      await fs.promises.writeFile(
        CartContactManager.#cartContactPath,
        JSON.stringify([], null, 2)
      );
      console.log("File Created!");
    }
  }

  async create(data) {
    try {
      const cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );
      const newCartContact = data;
      cartContacts.push(newCartContact);
      await fs.promises.writeFile(
        CartContactManager.#cartContactPath,
        JSON.stringify(cartContacts, null, 2)
      );
      return newCartContact;
    } catch (error) {
      console.error("Error trying to create cart contact:", error.message);
      return null;
    }
  }

  async read() {
    try {
      const cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );
      return this.populate(cartContacts);
    } catch (error) {
      console.error("Error reading cart contacts:", error.message);
      return [];
    }
  }

  async paginate({ filter = {}, sortAndPaginate = {} }) {
    try {      
      const cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );

      let filteredContacts = cartContacts;
      if (Object.keys(filter).length > 0) {
        filteredContacts = cartContacts.filter(contact => {
          return Object.keys(filter).every(key => contact[key] === filter[key]);
        });
      }

      const total = filteredContacts.length;
      const page = sortAndPaginate.page || 1;
      const limit = sortAndPaginate.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      let data = filteredContacts.slice(start, end);

      // Sorting logic
      if (sortAndPaginate.sort) {
        const [key, order] = sortAndPaginate.sort.split(':');
        data = data.sort((a, b) => {
          if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
          if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
          return 0;
        });
      }

      const populatedData = await this.populate(data);      
      

      return {
        docs: populatedData,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error("Error paginating cart contacts:", error.message);
      return {
        docs: [],
        total: 0,
        page: sortAndPaginate.page || 1,
        limit: sortAndPaginate.limit || 10,
        totalPages: 0,
      };
    }
  }

  async populate(cartContacts) {
    try {
      const users = JSON.parse(await fs.promises.readFile(CartContactManager.#usersPath, "utf-8"));
      const products = JSON.parse(await fs.promises.readFile(CartContactManager.#productsPath, "utf-8"));

      return cartContacts.map(cartContact => {
        const buyer = users.find(user => user._id === cartContact.buyer_id);
        const seller = users.find(user => user._id === cartContact.seller_id);
        const product = products.find(prod => prod._id === cartContact.product_id);

        return {
          ...cartContact,
          buyer,
          seller,
          product,
        };
      });
    } catch (error) {
      console.error("Error populating cart contacts:", error.message);
      return cartContacts;
    }
  }

  async readOne(id) {
    try {
      const cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );
      const cartContact = cartContacts.find(
        (cartContact) => cartContact.id === id
      );
      if (!cartContact) {
        throw new Error(`Did NOT find the cart contact with ID ${id}.`);
      }
      return this.populate([cartContact])[0];
    } catch (error) {
      console.error("Error reading cart contact:", error.message);
      return null;
    }
  }

  async update(id, newData) {
    try {
      let cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );

      const index = cartContacts.findIndex(
        (cartContact) => cartContact.id === id
      );
      if (index === -1) {
        throw new Error(`Did not find the cart contact with ID: ${id}.`);
      }

      cartContacts[index] = {
        ...cartContacts[index],
        ...newData,
      };

      await fs.promises.writeFile(
        CartContactManager.#cartContactPath,
        JSON.stringify(cartContacts, null, 2)
      );

      return this.populate([cartContacts[index]])[0];
    } catch (error) {
      console.error("Error updating cart contact:", error.message);
      return null;
    }
  }

  async destroy(id) {
    try {
      let cartContacts = JSON.parse(
        await fs.promises.readFile(CartContactManager.#cartContactPath, "utf-8")
      );
      const index = cartContacts.findIndex(
        (cartContact) => cartContact.id === id
      );
      if (index === -1) {
        throw new Error(
          `No se encontró ningún carrito de contacto con el ID ${id}.`
        );
      }
      const deletedCartContact = cartContacts.splice(index, 1)[0];
      await fs.promises.writeFile(
        CartContactManager.#cartContactPath,
        JSON.stringify(cartContacts, null, 2)
      );
      return deletedCartContact;
    } catch (error) {
      console.error("Error deleting cart contact:", error.message);
      return null;
    }
  }  
}

const cartContactManager = new CartContactManager();
export default cartContactManager;



/*
// Definir 10 productos
const cartContactData = [
    {
      user_id: "1234",
      name: "Juan",
      lastName: "Pérez",
      blockAndLot: "Manzana 5, Lote 10",
      product_id: "9876",
      photo: "sofa_cuero.jpg",
      quantity: 2,
      total: 700,
    },
    {
      user_id: "5678",
      name: "María",
      lastName: "González",
      blockAndLot: "Manzana 3, Lote 15",
      product_id: "5432",
      photo: "mesa_comedor.jpg",
      quantity: 1,
      total: 250,
    },
    {
      user_id: "91011",
      name: "Pedro",
      lastName: "Rodríguez",
      blockAndLot: "Manzana 8, Lote 5",
      product_id: "121314",
      photo: "tv_samsung.jpg",
      quantity: 1,
      total: 500,
    },
    {
      user_id: "1213",
      name: "Laura",
      lastName: "López",
      blockAndLot: "Manzana 2, Lote 20",
      product_id: "151617",
      photo: "camara_nikon.jpg",
      quantity: 3,
      total: 1800,
    },
    {
      user_id: "1415",
      name: "Carlos",
      lastName: "Martínez",
      blockAndLot: "Manzana 7, Lote 8",
      product_id: "181920",
      photo: "mesa_centro.jpg",
      quantity: 1,
      total: 150,
    },
    {
      user_id: "1617",
      name: "Ana",
      lastName: "Sánchez",
      blockAndLot: "Manzana 1, Lote 30",
      product_id: "212223",
      photo: "batidora_bosch.jpg",
      quantity: 2,
      total: 80,
    },
    {
      user_id: "1819",
      name: "David",
      lastName: "Hernández",
      blockAndLot: "Manzana 6, Lote 12",
      product_id: "242526",
      photo: "roomba_960.jpg",
      quantity: 1,
      total: 300,
    },
    {
      user_id: "2021",
      name: "Elena",
      lastName: "Gómez",
      blockAndLot: "Manzana 4, Lote 18",
      product_id: "272829",
      photo: "silla_oficina.jpg",
      quantity: 2,
      total: 200,
    },
    {
      user_id: "2223",
      name: "Hugo",
      lastName: "Díaz",
      blockAndLot: "Manzana 9, Lote 25",
      product_id: "303132",
      photo: "licuadora_oster.jpg",
      quantity: 1,
      total: 60,
    },
    {
      user_id: "2425",
      name: "Carolina",
      lastName: "Fernández",
      blockAndLot: "Manzana 10, Lote 6",
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
 

*/

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
