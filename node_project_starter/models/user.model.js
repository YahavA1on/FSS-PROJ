import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
      type: Number, 
      default: 1,
      min: 1
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    }
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: { 
    type: Boolean, 
    default: false
  },
  cart: [cartItemSchema]
});

export default mongoose.model('User', userSchema);
