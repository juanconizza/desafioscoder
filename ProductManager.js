//Creamos la clase constructora Product donde estructuramos lo que va a contener cada producto.

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
  
  // Creamos el ProductManager para gestionar la creación y lectura.
  
  class ProductManager {
      static #products = [] 
      
      productIdCounter = 1;
    
    // Método crear nuevo producto
    create(data) {
      const newProduct = new Product(
        this.productIdCounter++,
        data.title,
        data.photo,
        data.category,
        data.description,
        data.price,
        data.stock
      );
      ProductManager.#products.push(newProduct);
      return newProduct;
    }
  
    // Método leer los productos creados
    read() {
      return ProductManager.#products;
    }  
    
  }

  //Definimos 5 Productos

  const productManager = new ProductManager();
  

  const productsData = [
    {
      title: "Producto 1",
      photo: "ruta_imagen_1.jpg",
      category: "Categoria 1",
      description: "Este producto es excelente, poco uso.",
      price: 10.99,
      stock: 100,
    },
    {
      title: "Producto 2",
      photo: "ruta_imagen_2.jpg",
      category: "Categoria 2",
      description: "Este producto es excelente, poco uso.",
      price: 20.99,
      stock: 50,
    },
    {
      title: "Producto 3",
      photo: "ruta_imagen_3.jpg",
      category: "Categoria 1",
      description: "Este producto es excelente, poco uso.",
      price: 15.99,
      stock: 80,
    },
    {
      title: "Producto 4",
      photo: "ruta_imagen_4.jpg",
      category: "Categoria 2",
      description: "Este producto es excelente, poco uso.",
      price: 25.99,
      stock: 30,
    },
    {
      title: "Producto 5",
      photo: "ruta_imagen_5.jpg",
      category: "Categoria 1",
      description: "Este producto es excelente, poco uso.",
      price: 12.99,
      stock: 120,
    },
  ];


  productsData.forEach((productData) => productManager.create(productData));


  // Mostrar productos creados

console.log("Productos:");
productManager.read().forEach((product) => {
  console.log(
    `ID: ${product.id}, Título: ${product.title}, Descrición: ${product.description} Precio: ${product.price}, Stock: ${product.stock}`
  );
});