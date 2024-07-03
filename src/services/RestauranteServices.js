import Restaurant from "../models/Restaurante.js";


const createRestaurant = async (userId, restaurantData) => {
    try {
      const newRestaurant = new Restaurant({ ...restaurantData, owner: userId });
      const savedRestaurant = await newRestaurant.save();
      return savedRestaurant;
    } catch (error) {
      throw new Error(`Erro ao criar o restaurante: ${error.message}`);
    }
  };


  const updateRestaurant = async (restaurantId, updateData) => {
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        updateData,
        { new: true } // Retorna o documento atualizado
      );
      if (!updatedRestaurant) {
        throw new Error('Restaurante não encontrado');
      }
      return updatedRestaurant;
    } catch (error) {
      throw new Error(`Erro ao atualizar o restaurante: ${error.message}`);
    }
  };

  const getRestaurantById = async (restaurantId) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId).populate('products');
      if (!restaurant) {
        throw new Error('Restaurante não encontrado');
      }
      return restaurant;
    } catch (error) {
      throw new Error(`Erro ao obter o restaurante: ${error.message}`);
    }
  };


  const getAllRestaurants = async () => {
    try {
      const restaurants = await Restaurant.find().populate('products');
      return restaurants;
    } catch (error) {
      throw new Error(`Erro ao obter os restaurantes: ${error.message}`);
    }
  };

  const deleteRestaurant = async (restaurantId) => {
    try {
      const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
      if (!deletedRestaurant) {
        throw new Error('Restaurante não encontrado');
      }
      return deletedRestaurant;
    } catch (error) {
      throw new Error(`Erro ao deletar o restaurante: ${error.message}`);
    }
  };



  // Função para buscar restaurantes de um usuário pelo ID do usuário
const getRestaurantsByUserId = async (userId) => {
  try {
    // Busca todos os restaurantes que pertencem ao usuário com o ID fornecido
    const restaurants = await Restaurant.find({ owner: userId }).populate('products');
    return restaurants;
  } catch (error) {
    throw new Error(`Erro ao buscar restaurantes do usuário: ${error.message}`);
  }
};




  export {
    createRestaurant,
    updateRestaurant,
    getRestaurantById,
    getAllRestaurants,
    deleteRestaurant,
    getRestaurantsByUserId
  };