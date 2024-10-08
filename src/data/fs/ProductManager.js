import fs from "fs";

class ProductManager {
  static #path = "./src/data/fs/files/products.json"; 

  async init() {
    try {
      // Verificar si el archivo existe
      await fs.promises.access(ProductManager.#path);
      console.log("File already Exists!");
    } catch (error) {
      // Si el archivo no existe, crearlo con un array vacío
      await fs.promises.writeFile(ProductManager.#path, JSON.stringify([], null, 2)); // Escribir un array JSON vacío
      console.log("File Created!");
    }
  }
  
  async create(data) {
    try {
      const products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));
      const newProduct = data;
      products.push(newProduct);
      await fs.promises.writeFile(ProductManager.#path, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      console.error("Error trying to create product:", error.message);
      return null;
    }
  }

  async read() {
    try {
      // Leer los productos del archivo
      const products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));
      return products;
    } catch (error) {
      console.error("Error reading products:", error.message);
      return [];
    }
  }

  async paginate({ filter = {}, sortAndPaginate = {} }) {
    try {
      const products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));

      // Filtrar productos por categoría si se proporciona
      let filteredProducts = products;
      if (filter.category) {
        filteredProducts = products.filter(product => product.category === filter.category);
      }

      // Ordenar productos
      if (typeof sortAndPaginate.sort === 'string') {
        const [sortField, sortOrder] = sortAndPaginate.sort.split(' ');
        filteredProducts.sort((a, b) => {
          if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      // Paginar productos
      const page = parseInt(sortAndPaginate.page, 10) || 1;
      const limit = parseInt(sortAndPaginate.limit, 10) || 8; // Default limit is 8
      const start = (page - 1) * limit;
      const end = page * limit;
      const paginatedProducts = filteredProducts.slice(start, end);

      // Obtener información de paginación
      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / limit);
      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;

      // Devolver productos paginados con meta información
      return {
        docs: paginatedProducts,
        totalDocs: total,
        limit,
        page,
        totalPages,
        pagingCounter: start + 1,
        hasPrevPage: prevPage !== null,
        hasNextPage: nextPage !== null,
        prevPage,
        nextPage
      };
    } catch (error) {
      console.error("Error paginating products:", error.message);
      return {
        docs: [],
        totalDocs: 0,
        limit: 8,
        page: 1,
        totalPages: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
      };
    }
  }

  async readOne(id) {
    try {
      // Leer los productos del archivo
      const products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));
      const product = products.find((product) => product._id === id);
      if (!product) {
        throw new Error(`Did NOT find the product with ID ${id}.`);
      }
      return product;
    } catch (error) {
      console.error("Error reading product:", error.message);
      return null;
    }
  }

  async update(id, newData) {
    try {
      // Leer los productos del archivo
      let products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));
      
      // Buscar el producto con el ID proporcionado
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`Did not find the product with ID: ${id}.`);
      }
      
      // Actualizar las propiedades del producto con los nuevos datos
      products[index] = {
        ...products[index], // Mantener las propiedades anteriores
        ...newData // Actualizar con los nuevos datos
      };
      
      // Escribir la lista de productos actualizada en el archivo
      await fs.promises.writeFile(ProductManager.#path, JSON.stringify(products, null, 2));
      
      return products[index]; // Devolver el producto actualizado
    } catch (error) {
      console.error("Error updating product:", error.message);
      return null;
    }
  }

  async destroy(id) {
    try {
      // Leer los productos del archivo
      let products = JSON.parse(await fs.promises.readFile(ProductManager.#path, "utf-8"));
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún producto con el ID ${id}.`);
      }
      const deletedProduct = products.splice(index, 1)[0];
      // Escribir la lista de productos actualizada en el archivo
      await fs.promises.writeFile(ProductManager.#path, JSON.stringify(products, null, 2));
      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return null;
    }
  }
}

const productsManager = new ProductManager();
export default productsManager;

  


// Modificar el producto con el ID  y actualizar el precio y el stock y descripción
//console.log(await productManager.update("dd483ca53281b05cc2f7963c", { title: "Mesa de Comedor de Hierro", price: 300000, stock: 45 }));



//Definir 20 productos
/*
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
  {
    title: "Aire Acondicionado Inverter LG 12000 BTU",
    photo: "aire_acondicionado.jpg",
    category: "Electrodomésticos",
    description:
      "Aire acondicionado LG con tecnología Inverter. Eficiente y silencioso. Ideal para habitaciones grandes.",
    price: 800,
    stock: 1,
  },
  {
    title: "Lavadora Samsung Carga Frontal 9 Kg",
    photo: "lavadora_samsung.jpg",
    category: "Electrodomésticos",
    description:
      "Lavadora Samsung de carga frontal con capacidad para 9 kg. Programas de lavado personalizables.",
    price: 600,
    stock: 1,
  },
  {
    title: "Sofá Cama Reversible con Almacenamiento",
    photo: "sofa_cama.jpg",
    category: "Muebles",
    description:
      "Sofá cama reversible con almacenamiento. Perfecto para espacios pequeños. Disponible en varios colores.",
    price: 450,
    stock: 1,
  },
  {
    title: "Televisor OLED LG 65 Pulgadas 4K",
    photo: "tv_lg_oled.jpg",
    category: "Electrónica",
    description:
      "Televisor OLED LG de 65 pulgadas con resolución 4K. Colores vibrantes y negros perfectos.",
    price: 1500,
    stock: 1,
  },
  {
    title: "Mesa de Escritorio de Estilo Industrial",
    photo: "escritorio_industrial.jpg",
    category: "Muebles",
    description:
      "Mesa de escritorio de estilo industrial con patas de metal y tablero de madera. Diseño moderno y funcional.",
    price: 200,
    stock: 1,
  },
  {
    title: "Cafetera Expresso De'Longhi",
    photo: "cafetera_delonghi.jpg",
    category: "Electrodomésticos",
    description:
      "Cafetera Expresso De'Longhi con sistema de espuma de leche. Prepara café como un barista profesional.",
    price: 300,
    stock: 1,
  },
  {
    title: "Colchón Viscoelástico con Gel",
    photo: "colchon_viscoelastico.jpg",
    category: "Hogar",
    description:
      "Colchón viscoelástico con gel que se adapta a la forma del cuerpo. Descanso óptimo y confortable.",
    price: 700,
    stock: 1,
  },
  {
    title: "Sistema de Sonido Envolvente 5.1",
    photo: "sistema_sonido_51.jpg",
    category: "Electrónica",
    description:
      "Sistema de sonido envolvente 5.1 con altavoces inalámbricos. Sumérgete en la experiencia del cine en casa.",
    price: 400,
    stock: 1,
  },
  {
    title: "Juego de Comedor de Ratán Sintético",
    photo: "comedor_ratan.jpg",
    category: "Muebles",
    description:
      "Juego de comedor de ratán sintético para exteriores. Resistente a la intemperie y fácil de limpiar.",
    price: 600,
    stock: 1,
  },
  {
    title: "Máquina de Ejercicio Multifuncional",
    photo: "maquina_ejercicio.jpg",
    category: "Deportes y Fitness",
    description:
      "Máquina de ejercicio multifuncional para entrenamiento en casa. Tonifica y fortalece todos los grupos musculares.",
    price: 800,
    stock: 1,
  },
];

// Función para la creación del archivo products.json //Usar si no está creado el archivo.

/*
(async () => {
  const productManager = new ProductManager();
  await productManager.init(); // Inicializa el gestor de productos

  // Recorre el array productsData de forma asíncrona y crea los productos uno por uno
  for (const productData of productsData) {
    await productManager.create(productData);
  }

  console.log("Files Created Succesfully!.");

})();
*/

/*
DEJAMOS LOS METODOS MANUALES PARA PROBAR EL PRODUCT MANAGER: 

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

  // Modificar el producto con el ID  y actualizar el precio y el stock y descripción
console.log(await productManager.update("dd483ca53281b05cc2f7963c", { title: "Mesa de Comedor de Hierro", price: 300000, stock: 45 }));

  // Eliminar un producto por su ID que NO EXISTE
  console.log("Eliminar producto con ID: ");
  console.log(await productManager.destroy("fdgdfgdfg"));

*/