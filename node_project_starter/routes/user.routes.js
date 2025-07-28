import express from 'express';
import {registerUser, loginUser, addToCart, logoutUser, getCart, removeFromCart, clearCart, orderCart} from '../controllers/user.controller.js';
import {getItemByName,getAllItems} from '../controllers/item.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getItemByName', getItemByName);
router.get('/getAllItems', getAllItems);
router.get('/addToCart', addToCart);
router.post('/logout', logoutUser);
router.get('/getCart', getCart);
router.post('/removeFromCart', removeFromCart);
router.post('/clearCart', clearCart);
router.post('/orderCart', orderCart);

export default router;