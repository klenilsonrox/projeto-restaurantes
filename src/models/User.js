import mongoose from 'mongoose';

const { Schema, model } = mongoose;


export const userSchema = new Schema({
    usuario: { type: String },
    email: { type: String, unique: true, required: true }, // Apenas o email é único
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  });


  const User = model('User', userSchema);
  export default User