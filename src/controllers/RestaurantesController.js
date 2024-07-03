import express from 'express';
import {
  createRestaurant,
  updateRestaurant,
  getRestaurantById,
  getAllRestaurants,
  deleteRestaurant,
  getRestaurantsByUserId
} from '../services/RestauranteServices.js';
import {
  authenticateToken,
  authorizeAdmin
} from '../middlewares/Auth.js';


const routerRestaurante = express.Router();

// rota de criar restaurante

routerRestaurante.post('/restaurants', authenticateToken, authorizeAdmin, async (req, res) => {
  const userId = req.user.id // Assumindo que o ID do usuário vem no corpo da requisição
  const restaurantData = req.body

  try {
    const newRestaurant = await createRestaurant(userId, restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// rota de atualizar restaurante

routerRestaurante.put('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  const updateData = req.body;

  try {
    const updatedRestaurant = await updateRestaurant(restaurantId, updateData);
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});



// rota de buscar restaurante por id

routerRestaurante.get('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await getRestaurantById(restaurantId);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Rota para obter todos os restaurantes

routerRestaurante.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

routerRestaurante.get('/users/:userId/restaurants', authenticateToken, authorizeAdmin, async (req, res) => {
  const {
    userId
  } = req.params
  try {
    const restaurants = await getRestaurantsByUserId(userId)
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


routerRestaurante.delete('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const deletedRestaurant = await deleteRestaurant(restaurantId);
    res.status(200).json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default routerRestaurante;