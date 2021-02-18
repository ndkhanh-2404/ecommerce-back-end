const Product = require('../models/Product.js');


module.exports.getFullProduct = async (req,res) => {
    try {
        const products = await Product.find();
        if(products.length === 0){
            return res.status(401).json({
                success: false, 
                message: 'No Products.'
            });
        }
        return res.status(201).json({
            success: true, 
            Products: products
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
    
};

module.exports.getProduct  = async (req,res) => {
    const { _id } = req.params;

    try {
        const product = await Product.findById(_id);
        if(!product){
            return res.status(401).json({
                success: false, 
                message: 'No Product.'
            });
        }
        return res.status(201).json({
            success: true, 
            Product: product
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
};

module.exports.postProduct = async (req,res) => {
    const { name, image, price, description } = req.body;

    try {
        const product = await Product.findOne({ name, image, price, description});

        if(product){
            return res.status(402).json({
                success: false, 
                message: 'Product Type already existed.'
            });
        }
        
        const evaluation = Math.floor(Math.random()*6);
        const newProduct = new Product({name, image, price, description, evaluation});

        await newProduct.save();

        return res.status(201).json({
            success: true, 
            Product: newProduct
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
};