import Product from "../models/Produto.js";
import Restaurant from "../models/Restaurante.js";



// Função para buscar todos os produtos
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error('Erro ao buscar produtos: ' + error.message);
  }
};

// Função para buscar um produto por ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  } catch (error) {
    throw new Error('Erro ao buscar produto: ' + error.message);
  }
};

// Função para deletar um produto por ID
const deleteProductById = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Produto não encontrado');
    }
    return result;
  } catch (error) {
    throw new Error('Erro ao deletar produto: ' + error.message);
  }
};

// Função para atualizar um produto por ID
const updateProductById = async (productId, updateData, restaurantId) => {
  try {
    const product = await Product.findOne({ _id: productId, restaurant: restaurantId });
    if (!product) {
      throw new Error('Produto não encontrado ou não pertence ao restaurante especificado');
    }

    Object.assign(product, updateData);
    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    throw new Error('Erro ao atualizar produto: ' + error.message);
  }
};

 const createProduct = async (productData, restaurantId) => {
  try {
    // Cria o novo produto com os dados fornecidos e o restauranteId
    const newProduct = await Product.create({
      name: productData.name,
      price: productData.price,
      urlImage: productData.urlImage,
      category: productData.category,
      description: productData.description,
      restaurant: restaurantId
    });

    // Atualiza o restaurante para incluir o novo produto
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurante não encontrado');
    }
    restaurant.products.push(newProduct._id);
    await restaurant.save();

    return newProduct;
  } catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
};

export { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById };
