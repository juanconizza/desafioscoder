const fs = require("fs").promises;
const { log } = require("console");
const { randomBytes } = require("crypto");

class Product {
  constructor(id, title, photo, category, description, price, stock) {
    this.id = id;
    this.title = title;
    this.photo = photo;
    this.category = category;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}

class ProductManager {
  static #path = "./products.json";

  async init() {
    try {
      // Verificar si el archivo existe
      await fs.access(ProductManager.#path);
      console.log("El Archivo Existe!");
    } catch (error) {
      // Si el archivo no existe, crearlo con un array vacío
      await fs.writeFile(ProductManager.#path, "[]");
      console.log("Archivo Creado!");
    }
  }

  generateId() {
    return randomBytes(12).toString("hex");
  }

  async create(data) {
    try {
      // Leer los productos existentes del archivo
      const products = JSON.parse(
        await fs.readFile(ProductManager.#path, "utf-8")
      );
      const newProduct = new Product(
        this.generateId(),
        data.title,
        data.photo || "defaultphoto.jpg",
        data.category,
        data.description,
        data.price,
        data.stock
      );
      // Agregar el nuevo producto a la lista
      products.push(newProduct);
      // Escribir la lista de productos actualizada en el archivo
      await fs.writeFile(
        ProductManager.#path,
        JSON.stringify(products, null, 2)
      );
      return newProduct;
    } catch (error) {
      console.error("Error al crear el producto:", error.message);
      return null;
    }
  }

  async read() {
    try {
      // Leer los productos del archivo
      const products = JSON.parse(
        await fs.readFile(ProductManager.#path, "utf-8")
      );
      return products;
    } catch (error) {
      console.error("Error al leer los productos:", error.message);
      return [];
    }
  }

  async readOne(id) {
    try {
      // Leer los productos del archivo
      const products = JSON.parse(
        await fs.readFile(ProductManager.#path, "utf-8")
      );
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new Error(`No se encontró ningún producto con el ID ${id}.`);
      }
      return product;
    } catch (error) {
      console.error("Error al leer el producto:", error.message);
      return null;
    }
  }

  async destroy(id) {
    try {
      // Leer los productos del archivo
      let products = JSON.parse(
        await fs.readFile(ProductManager.#path, "utf-8")
      );
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún producto con el ID ${id}.`);
      }
      const deletedProduct = products.splice(index, 1)[0];
      // Escribir la lista de productos actualizada en el archivo
      await fs.writeFile(
        ProductManager.#path,
        JSON.stringify(products, null, 2)
      );
      return deletedProduct;
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      return null;
    }
  }
}

// Ejemplo de uso:
(async () => {
  const productManager = new ProductManager();
  await productManager.init();

  // Definir 10 productos
  const productsData = [
    {
      title: "Sofá de Cuero",
      photo: "sofa_cuero.jpg",
      category: "Muebles",
      description: "Sofá de cuero genuino en buen estado. Color marrón oscuro.",
      price: 350,
      stock: 1,
    },
    {
      title: "Mesa de Comedor de Madera",
      photo: "mesa_comedor.jpg",
      category: "Muebles",
      description:
        "Mesa de comedor de madera maciza con capacidad para 6 personas. Estilo rústico.",
      price: 250,
      stock: 1,
    },
    {
      title: "Televisor LED Samsung 55 Pulgadas",
      photo: "tv_samsung.jpg",
      category: "Electrónica",
      description:
        "Televisor LED Samsung de 55 pulgadas en perfectas condiciones. Resolución 4K Ultra HD.",
      price: 500,
      stock: 1,
    },
    {
      title: "Cámara Réflex Nikon D5600",
      photo: "camara_nikon.jpg",
      category: "Electrónica",
      description:
        "Cámara réflex digital Nikon D5600 con lente de kit. Ideal para aficionados a la fotografía.",
      price: 600,
      stock: 1,
    },
    {
      title: "Mesa de Centro de Vidrio",
      photo: "mesa_centro.jpg",
      category: "Muebles",
      description:
        "Mesa de centro de vidrio templado con estructura de acero inoxidable. Moderna y elegante.",
      price: 150,
      stock: 1,
    },
    {
      title: "Batidora de Mano Bosch",
      photo: "batidora_bosch.jpg",
      category: "Electrodomésticos",
      description:
        "Batidora de mano Bosch de alta potencia. Ideal para preparar batidos y sopas.",
      price: 40,
      stock: 1,
    },
    {
      title: "Robot Aspirador Roomba 960",
      photo: "roomba_960.jpg",
      category: "Electrodomésticos",
      description:
        "Robot aspirador Roomba 960 con tecnología de mapeo inteligente. Limpieza automática y programable.",
      price: 300,
      stock: 1,
    },
    {
      title: "Silla de Oficina Ergonómica",
      photo: "silla_oficina.jpg",
      category: "Muebles",
      description:
        "Silla de oficina ergonómica con respaldo ajustable y soporte lumbar. Excelente estado.",
      price: 100,
      stock: 1,
    },
    {
      title: "Licuadora Oster de Alta Velocidad",
      photo: "licuadora_oster.jpg",
      category: "Electrodomésticos",
      description:
        "Licuadora Oster de alta velocidad con vaso de vidrio resistente y cuchillas de acero inoxidable.",
      price: 60,
      stock: 1,
    },
    {
      title: "Mesa de Noche de Roble",
      photo: "mesa_noche.jpg",
      category: "Muebles",
      description:
        "Mesa de noche de roble con cajón y estante inferior. Perfecta para dormitorios modernos.",
      price: 80,
      stock: 1,
    },
  ];

  // Crear los productos
  for (const productData of productsData) {
    await productManager.create(productData);
  }

  // Leer todos los productos
  console.log("Todos los productos:");
  console.log(await productManager.read());

  // Leer un producto por su ID
  console.log("Producto encontrado con ID:");
  console.log(await productManager.readOne("dd606c7d186c9423fb816f69")); // Definir el ID a Buscar en base al hash hexa generado.

  // Leer un producto que no Existe
  console.log("Producto encontrado con ID:");
  console.log(await productManager.readOne("jkdhfgkhdsfkh"));

  // Eliminar un producto por su ID
  console.log("Eliminar producto con ID: ");
  console.log(await productManager.destroy("dd606c7d186c9423fb816f69"));

  // Eliminar un producto por su ID que NO EXISTE
  console.log("Eliminar producto con ID: ");
  console.log(await productManager.destroy("fdgdfgdfg"));
})();
