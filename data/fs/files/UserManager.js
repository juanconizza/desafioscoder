//Creamos la clase constructora User donde estructuramos la información que vamos a tener de cada usuario.

class User {
    constructor(id, name, lastName, dni, manzanaYLote, phone, email, password, role) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.dni = dni;
      this.manzanaYLote = manzanaYLote;
      this.phone = phone;
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
            data.name,
            data.lastName,
            data.dni,
            data.manzanaYLote,
            data.phone,
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
      name: "Pedro",
      lastName: "Chamorro",
      dni: 32443553,
      manzanaYLote: 34.1,
      phone: "+54351667799",
      email: "usuario1@example.com",
      password: "contraseña123",
      role: "cliente",
    },
    {
      name: "Maria",
      lastName: "Garcia",
      dni: 34443773,
      manzanaYLote: 28.5,
      phone: "+543514896545",
      email: "usuario2@example.com",
      password: "contraseña456",
      role: "admin",
    },
  ];
  
  usersData.forEach((userData) => userManager.create(userData));
  
  //Mostrar los usuarios creados

  console.log("\nUsuarios:");
  userManager.read().forEach((user) => {
    console.log(`ID: ${user.id}, Nombre: ${user.name}, Apellido: ${user.lastName}, DNI: ${user.dni}, Email: ${user.email}, Rol: ${user.role}`);
  });
  