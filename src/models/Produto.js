import mongoose from 'mongoose';

const { Schema, model } = mongoose;


export const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    urlImage: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
  });


  const Product = model('Product', productSchema);
  export default Product