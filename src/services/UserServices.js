import User from "../models/User.js";


const secret = process.env.SECRET_KEY



  const createUser = async (usuario,email,password) => {
  
    const newUser = await User.create({usuario,email,password})
    return newUser
  };


  // Serviço para autenticar um usuário
const loginUser = async (loginData) => {
    const { email, password } = loginData;
  
    // Encontra o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }
  
    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Email ou senha inválidos');
    }
  
    // Gera um token JWT
    const token = generateToken(user);
    return { user, token };
  };


  // Serviço para obter um usuário por ID
const getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
  };

  const getUserEmail = async (email) => {
    const user = await User.findOne({email})
    return user;
  };



  // Serviço para obter todos os usuários
const getAllUsers = async () => {

      const users = await User.find({});
      return users;
  };

  const updateUserById = async (userId, updateData) => {
     const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      return updatedUser;
   
  };


  const deleteUser = async (id)=>{
    await User.findByIdAndDelete(id)
    return
  }


  export { createUser, loginUser, getUserById, getAllUsers,getUserEmail,updateUserById ,deleteUser };