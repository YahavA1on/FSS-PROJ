import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  description: String,
  category: String,
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    default: 0
  }
});

export default mongoose.model('Item', itemSchema);