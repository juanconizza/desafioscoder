const fs = require("fs").promises;
const { randomBytes } = require("crypto");

class User {
  constructor(
    id,
    name,
    lastName,
    dni,
    manzanaYLote,
    phone,
    email,
    password,
    role
  ) {
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

class UserManager {
  static #path = "./users.json";

  static async init() {
    try {
      // Verificar si el archivo existe
      await fs.access(UserManager.#path);
    } catch (error) {
      // Si el archivo no existe, crearlo con un array vacío
      await fs.writeFile(UserManager.#path, "[]");
    }
  }

  static generateId() {
    return randomBytes(12).toString("hex");
  }

  static async create(data) {
    try {
      // Leer los usuarios existentes del archivo
      const users = JSON.parse(await fs.readFile(UserManager.#path, "utf-8"));
      const newUser = new User(
        UserManager.generateId(),
        data.name,
        data.lastName,
        data.dni,
        data.manzanaYLote,
        data.phone,
        data.email,
        data.password,
        data.role
      );
      // Agregar el nuevo usuario a la lista
      users.push(newUser);
      // Escribir la lista de usuarios actualizada en el archivo
      await fs.writeFile(UserManager.#path, JSON.stringify(users, null, 2));
      console.log("Usuario Creado con Exito!");
      return newUser;
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      return null;
    }
  }

  static async read() {
    try {
      // Leer los usuarios del archivo
      const users = JSON.parse(await fs.readFile(UserManager.#path, "utf-8"));
      return users;
    } catch (error) {
      console.error("Error al leer los usuarios:", error.message);
      return [];
    }
  }

  static async readOne(id) {
    try {
      // Leer los usuarios del archivo
      const users = JSON.parse(await fs.readFile(UserManager.#path, "utf-8"));
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error(`No se encontró ningún usuario con el ID ${id}.`);
      }
      console.log("Usuario Encontrado!");
      return user;
    } catch (error) {
      console.error("Error al leer el usuario:", error.message);
      return null;
    }
  }

  static async destroy(id) {
    try {
      // Leer los usuarios del archivo
      let users = JSON.parse(await fs.readFile(UserManager.#path, "utf-8"));
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún usuario con el ID ${id}.`);
      }
      const deletedUser = users.splice(index, 1)[0];
      // Escribir la lista de usuarios actualizada en el archivo
      await fs.writeFile(UserManager.#path, JSON.stringify(users, null, 2));
      console.log("Usuario Eliminado con Exito!");
      return deletedUser;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
      return null;
    }
  }
}

// Ejemplo de uso:
(async () => {
  await UserManager.init();

  // Definir usuarios
  const usersData = [
    {
      name: "Juan",
      lastName: "Perez",
      dni: "12345678",
      manzanaYLote: "A-15",
      phone: "123456789",
      email: "juan@example.com",
      password: "password123",
      role: "user",
    },
    {
      name: "Maria",
      lastName: "Gonzalez",
      dni: "23456789",
      manzanaYLote: "B-20",
      phone: "987654321",
      email: "maria@example.com",
      password: "password456",
      role: "user",
    },
    {
      name: "Pedro",
      lastName: "Lopez",
      dni: "34567890",
      manzanaYLote: "C-5",
      phone: "55555555",
      email: "pedro@example.com",
      password: "password789",
      role: "user",
    },
    {
      name: "Admin",
      lastName: "Admin",
      dni: "45678901",
      manzanaYLote: "D-10",
      phone: "11111111",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
  ];

  // Crear usuarios
  for (const userData of usersData) {
    await UserManager.create(userData);
  }

  // Leer todos los usuarios
  console.log("Usuarios:");
  console.log(await UserManager.read());

  // Leer un usuario por su ID hexa
  console.log("Buscar Usuario por ID:");
  console.log(await UserManager.readOne("18c76f0502420ae3dd4ede52"));

  // Leer un usuario por su ID hexa - en este caso da error porque no lo encuentra
  console.log("Buscar Usuario por ID:");
  console.log(await UserManager.readOne("18c76f0502420ae3dddfgdfd4ede52"));

  // Eliminar un usuario por su ID
  console.log("Eliminar usuario por ID:");
  console.log(await UserManager.destroy("88455aa85b0970009b652f94"));

  // Eliminar un usuario por su ID - en este caso da error porque no lo encuentra.
  console.log("Eliminar usuario por ID:");
  console.log(await UserManager.destroy("2113285b542bbcc55c1f759a"));
})();
