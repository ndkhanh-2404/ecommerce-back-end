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
            Products: products,
            total: products.length
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
    
};
module.exports.searchProduct = async (req,res) => {
    const { ...product } = req.query;
    return res.status(200).json({product});
}
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
    const { ProductType, name, image, price, description } = req.body;

    try {
        const product = await Product.findOne({ ProductType, name, image, price, description});

        if(product){
            return res.status(402).json({
                success: false, 
                message: 'Product already existed.'
            });
        }
        
        const evaluation = Math.floor(Math.random()*6);
        const newProduct = new Product({ ProductType, name, image, price, description, evaluation});

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

module.exports.postFullProduct = async (req,res) => {
    const { ProductType, products } = req.body;
    try {
        for( let product of products ) {
            const oldProduct = await Product.findOne({ 
                ProductType, 
                name: product.name, 
                image: product.image, 
                price: product.price, 
                description: product.description
            });

            if(oldProduct){
                return res.status(402).json({
                    success: false, 
                    message: 'Product Type already existed.'
                });
            }
            const evaluation = Math.floor(Math.random()*6);
            const newProduct = new Product({ ProductType, 
                name: product.name, 
                image: product.image, 
                price: product.price, 
                description: product.description,
                evaluation
            });

            await newProduct.save();
        }
        return res.status(201).json({
            success: true, 
            message: "Successfully."
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
};

module.exports.updateProduct = async (req,res) => {
    try {
        const products = await Product.find({});

        for( let product of products){
            let price = product.price;
            await Product.findByIdAndUpdate(product._id,{price},{new:true});
            
        }
        return res.status(200).json({
            success: true, 
            message: "Successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
    
};
