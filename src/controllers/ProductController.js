import express from 'express';
import { getAllProducts, getProductById, deleteProductById, updateProductById, createProduct } from '../services/ProductServices.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/Auth.js';
import { getRestaurantsByUserId } from '../services/RestauranteServices.js';
const routerProducts = express.Router();

// Rota para buscar todos os produtos
routerProducts.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar um produto por ID
routerProducts.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Rota para deletar um produto por ID
routerProducts.delete('/products/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProductById(id);
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Rota para atualizar um produto por ID
routerProducts.put('/products/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const restauranteId =await getRestaurantsByUserId(req.user.id)
  console.log(restauranteId[0]._id.toString())
  try {
    const updatedProduct = await updateProductById(id, updateData,restauranteId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


routerProducts.post('/products', authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, price, urlImage, category, description } = req.body;

  try {
    // Busca todos os restaurantes do usuário
    const restaurantes = await getRestaurantsByUserId(req.user.id);

    // Verifica se há restaurantes associados ao usuário
    if (restaurantes.length === 0) {
      return res.status(404).json({ message: 'Nenhum restaurante encontrado para o usuário' });
    }

    // Pega o _id do primeiro restaurante da lista
    const restauranteId = restaurantes[0]._id.toString();

    // Cria o produto com os dados fornecidos e o restauranteId
    const produtoCriado = await createProduct({ name, price, urlImage, category, description }, restauranteId);

    res.status(200).json(produtoCriado);
  } catch (error) {
    res.status(500).json({ message: `Erro ao criar produto: ${error.message}` });
  }
});

export default routerProducts;
