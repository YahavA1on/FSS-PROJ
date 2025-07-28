import User from '../models/user.model.js';
import Item from '../models/item.model.js';

export const registerUser = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password)
        return res.status(400).send('Username and password are required');

    try{
        const nameExists = await User.findOne({username});
        if (nameExists)
            return res.status(409).send('Username already exists');
        
        const user = await User.create({username, password});

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;

        res.status(201).json({
            message: "User registered successfully",
            userID: user._id,
            username: user.username
        });
    }
    catch (err){
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password)
        return res.status(400).send('Username and password are required');

    try{
        const user = await User.findOne({username});

        if (!user)
            return res.status(404).send("User not found");

        if(user.password != password)
            return res.status(401).send("Incorrect password");

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;

        return res.status(200).json({
            message: "User logged in successfully",
            userID: user._id,
            username: user.username
        });
    }
    catch (err){
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const logoutUser = (req, res) => {
    if (!req.session.userId)
      return res.status(404).send("No active session found");
  
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      res.clearCookie('connect.sid');
      return res.status(200).send("Logged out successfully");
    });
  };
  
  
export const addToCart = async (req, res) => {
    const {name, quantity = 1} = req.body;

    if (!name)
        return res.status(400).send('Item name is required');

    try {
        const user = await User.findById(req.session.userId);
        if (!user)
            return res.status(404).send('User not found');

        const item = await Item.findOne({name});

        if (!item)
            return res.status(404).send('Item not found');

        if (item.stock < quantity)
            return res.status(400).send("Not enough stock available");

        const existingItem = user.cart.find(i => i.itemId.equals(item._id));
        
        if (existingItem){
            existingItem.quantity += quantity;
            existingItem.price += item.price * quantity;
        }
        else
            user.cart.push({
                itemId: item._id, 
                name: item.name,
                quantity: quantity,
                price: item.price
            });

        await item.updateOne({$inc: {stock: -quantity}});
        await user.save();

        res.status(200).json({
            message: 'Item added to cart',
            cart: user.cart
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
};

export const getCart = async (req, res) => {
    if (!req.session.userId)
        return res.status(404).send("No active session found");

    const user = await User.findById(req.session.userId);

    let totalPrice = 0; 
    for(let i = 0; i < user.cart.length; i++){
        totalPrice += user.cart[i].price;
    }

    return res.status(200).json({
        message: "Total: " + totalPrice + "₪",
        cart: user.cart
    });
};

export const removeFromCart = async (req, res) => {
    const {name} = req.body;
    if(!name)
        return res.status(400).send('Item name is required');
    try {
        const user = await User.findById(req.session.userId);

        const i = user.cart.findIndex(i => i.name == name);

        if (i < 0) 
            return res.status(404).send("Item not in cart");

        const item = await Item.findOne({name});

        user.cart[i].quantity -= 1;

        if (user.cart[i].quantity <= 0)
            user.cart.splice(i, 1);

        await item.updateOne({$inc:{stock: 1}});
        await user.save();

        res.status(200).json({
            message: "Item removed", 
            cart: user.cart
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const clearCart = async (req, res) => {
    if (!req.session.userId)
        return res.status(404).send("No active session found");

    try {
        const user = await User.findById(req.session.userId);

        for (let i = 0; i < user.cart.length; i++) {
            await Item.updateOne({ _id: user.cart[i].itemId }, { $inc: { stock: user.cart[i].quantity } });
        }

        user.cart = [];
        await user.save();
        res.status(200).send("Cart cleared");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const orderCart = async (req, res) => {
    if (!req.session.userId)
        return res.status(404).send("No active session found");

    try {
        const user = await User.findById(req.session.userId);

        if (user.cart.length == 0) 
            return res.status(400).send("Cart is empty");

        user.cart = [];
        await user.save();

        res.status(200).send("Order placed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};
