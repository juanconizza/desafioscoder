//Creamos la clase constructora User donde estructuramos la información que vamos a tener de cada usuario.

class User {
    constructor(id, photo, email, password, role) {
      this.id = id;
      this.photo = photo;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  
 
  // Creamos el UserManager para gestionar la creación y lectura.

  class UserManager {
    static #users = []; 

    constructor() {
        this.userIdCounter = 1;
    }

    // Nuevo Usuario
    create(data) {
        const newUser = new User(
            this.userIdCounter++,
            data.photo,
            data.email,
            data.password,
            data.role
        );
        UserManager.#users.push(newUser); 
        return newUser;
    }
    
    // Leer Usuarios
    read() {
        return UserManager.#users; 
    }
}

  
  // Definimos 2 Usuarios

  const userManager = new UserManager();
  
  const usersData = [
    {
      photo: "ruta_imagen_usuario_1.jpg",
      email: "usuario1@example.com",
      password: "contraseña123",
      role: "cliente",
    },
    {
      photo: "ruta_imagen_usuario_2.jpg",
      email: "usuario2@example.com",
      password: "contraseña456",
      role: "admin",
    },
  ];
  
  usersData.forEach((userData) => userManager.create(userData));
  
  //Mostrar los usuarios creados

  console.log("\nUsuarios:");
  userManager.read().forEach((user) => {
    console.log(`ID: ${user.id}, Email: ${user.email}, Rol: ${user.role}`);
  });
  