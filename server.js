import express from 'express';
import { UserManager } from  "./data/fs/UserManager.js"

const app = express();
const port = 8080;

// Inicializar el gestor de usuarios
const userManager = new UserManager();

// Middleware para manejar JSON
app.use(express.json());

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  


// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await userManager.read();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un usuario por su ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await userManager.readOne(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para eliminar un usuario por su ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await userManager.destroy(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

