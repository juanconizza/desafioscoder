const { randomBytes } = require('crypto');

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
   
class UserManager {
    static #users = []; 

    generateId() {
      return randomBytes(12).toString('hex');
    }

    // Nuevo Usuario
    create(data) {
        try {
            const newUser = new User(
                this.generateId(),
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
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            return null;
        }
    }
    
    // Leer Usuarios
    read() {
        try {
            return UserManager.#users; 
        } catch (error) {
            console.error('Error al leer los usuarios:', error.message);
            return [];
        }
    }

    // Leer un usuario por su ID
    readOne(id) {
        try {
            const user = UserManager.#users.find((user) => user.id === id);
            if (!user) {
                throw new Error(`No se encontró ningún usuario con el ID ${id}.`);
            }
            return user;
        } catch (error) {
            console.error('Error al leer el usuario:', error.message);
            return null;
        }
    }

    // Eliminar un usuario por su ID
    destroy(id) {
        try {
            const index = UserManager.#users.findIndex((user) => user.id === id);
            if (index === -1) {
                throw new Error(`No se encontró ningún usuario con el ID ${id}.`);
            }
            const deletedUser = UserManager.#users.splice(index, 1)[0];
            return deletedUser;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error.message);
            return null;
        }
    }
}

  
  // Definimos 4 Usuarios


  const userManager = new UserManager();
  
  const usersData = [
    {
        name: 'Juan',
        lastName: 'Perez',
        dni: '12345678',
        manzanaYLote: 'A-15',
        phone: '123456789',
        email: 'juan@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Maria',
        lastName: 'Gonzalez',
        dni: '23456789',
        manzanaYLote: 'B-20',
        phone: '987654321',
        email: 'maria@example.com',
        password: 'password456',
        role: 'user'
    },
    {
        name: 'Pedro',
        lastName: 'Lopez',
        dni: '34567890',
        manzanaYLote: 'C-5',
        phone: '55555555',
        email: 'pedro@example.com',
        password: 'password789',
        role: 'user'
    },
    {
        name: 'Admin',
        lastName: 'Admin',
        dni: '45678901',
        manzanaYLote: 'D-10',
        phone: '11111111',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    }
];

  
usersData.forEach(userData => userManager.create(userData));

// Leer todos los usuarios
console.log(userManager.read());

// Leer un usuario por su ID hexa - en este caso da error porque no lo encuentra
console.log(userManager.readOne("e6018d264ccb2f3cefafd0d0"));

// Eliminar un usuario por su ID - en este caso da error porque no lo encuentra. 
console.log(userManager.destroy("2113285b542bbcc55c1f759a"));