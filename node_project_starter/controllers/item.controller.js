import Item from '../models/item.model.js';
import User from '../models/user.model.js';

export const addItem = async (req, res) => {
    const { name, description, category, price, stock } = req.body;

    if (!name || !description || !category || !price || !stock)
        return res.status(400).send('All fields are required');
    try {
      const itemExists = await Item.findOne({ name });
  
      if (itemExists)
        return res.status(409).send('Item already exists');
  
      const newItem = await Item.create({ name, description, category, price, stock });
  
      res.status(201).json({
        message: "Item created successfully",
        itemID: newItem._id,
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        price: newItem.price,
        stock: newItem.stock
      });
    } 
    catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  };
  

export const updateItem = async (req, res) => { 
    const { name, description, category, price, stock } = req.body;
    try {
      const item = await Item.findOne({ name });
  
      if (!item)
        return res.status(404).send("Item not found");

      await item.updateOne({ $set: { description, category, price, stock } });
  
      res.status(200).json({
        message: "Item updated successfully",
        itemID: item._id,
        name: name,
        description: description,
        category: category,
        price: price,
        stock: stock
      });
    } 
    catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
};

export const deleteItem = async (req, res) => {
    const {name} = req.body;
    if (!name)
        return res.status(400).send('Name of the item is required');
    try{
        const deletedItem = await Item.findOneAndDelete({name});
        
        if(!deletedItem)
            return res.status(404).send("Item not found");

        res.status(200).json({
            message: "Item deleted successfully",
            itemID: deletedItem._id,
            name: deletedItem.name,
            description: deletedItem.description,
            category: deletedItem.category,
            price: deletedItem.price,
            stock: deletedItem.stock
          });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const getItemByName = async (req, res) => {
    const {name} = req.body;
    if(!name)
        return res.status(400).send('Name of the item is required');
    try{
        const item = await Item.findOne({ name });

        if(!item)
            return res.status(404).send("Item not found");
        
        res.status(201).json({
            message: "Item found",
            itemID: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            stock: item.stock
          });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const getAllItems = async (req, res) =>{
    try{
        const items = await Item.find({});
        res.status(200).json(items);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const addToCart = async (req, res) =>{
    const {name} = req.body;
    if(!name)
        return res.status(400).send('Name of the item is required');

    try{
        const item = await Item.findOne({name});
        
        if(!item)
            return res.status(404).send('Item not found');

        
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};