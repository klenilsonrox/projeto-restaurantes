import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticateToken, authorizeAdmin, generateToken } from '../middlewares/Auth.js';
import { createUser, deleteUser, getAllUsers, getUserById, getUserEmail, updateUserById } from '../services/UserServices.js';
import User from '../models/User.js';


const routerAuth = express.Router(); 

// Rota para registro de usuário 
routerAuth.post('/register', async (req, res) => {
  let { usuario, email, password } = req.body;
  try {
    const userExist = await getUserEmail(email)
    if(userExist){
      return res.status(401).json({message:"já existe um usuário cadastrado com esse email"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    password= hashedPassword

    const newUser = await createUser(usuario,email,password)
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Rota para login de usuário
routerAuth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou senha inválidos' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Email ou senha inválidos' });

    const token = generateToken(user);
    res.status(200).json({ token , user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


routerAuth.get('/users/:id', authenticateToken,  async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


routerAuth.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

routerAuth.put("/users/:id",  async (req, res) => {
  const {id} = req.params
  try {
    const userUpdated = await updateUserById(id, req.body);
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

routerAuth.delete("/users/:id", authenticateToken,authorizeAdmin,  async (req, res) => {
  const {id} = req.params
  try {
   await deleteUser(id)
    res.status(200).json({message:"usuário deletado com sucesso"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})




export default routerAuth;