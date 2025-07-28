import express from 'express';
import {deleteUser, deleteAllUsers, getUser, getAllUsers} from '../controllers/admin.controller.js';
import { addItem, deleteItem, updateItem } from '../controllers/item.controller.js';

const router = express.Router();
router.delete('/deleteUser', deleteUser);
router.delete('/deleteAllUsers', deleteAllUsers);
router.get('/getAllUsers', getAllUsers);
router.get('/getUser', getUser);
router.post('/addItem', addItem);
router.delete('/deleteItem', deleteItem);
router.post('/updateItem', updateItem);

export default router;