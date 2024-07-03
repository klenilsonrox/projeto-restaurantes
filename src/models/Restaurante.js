import mongoose from 'mongoose';
import Product from './Produto.js';
import User from './User.js';


const { Schema, model } = mongoose;

export const restaurantSchema = new Schema({
    name: { type: String, required: true },
    urlImage :{type: String, required: true },
    contato:{type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true }, 
      zipCode: { type: String, required: true }
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });


  const Restaurant = model('Restaurant', restaurantSchema);

  export default Restaurant