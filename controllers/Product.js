const Product = require('../models/Product.js');
const ProductType = require('../models/ProductType.js');

module.exports.getFullProduct = async (req,res) => {
    let {page, limit, cond } = req.query;
    cond = JSON.parse(cond);
    
    console.log({page, limit, cond})
    page = parseInt(page);
    limit = parseInt(limit);
    try {
        const products = await Product.find(cond);
        console.log((page-1)*limit, page*limit-1);
        let _products = products.length >= page*limit  ? products.slice((page-1)*limit, page*limit) : (products.length >= (page-1)*limit ? products.slice((page-1)*limit): products);
        
        

        return res.status(201).json({
            success: true, 
            Products: _products,
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
    const { name } = req.query;
    try {
        const products = await Product.find();
        const _products = []
        for(let product of products){
            if(product.name.includes(name)){
                _products.push(product);
            }
        }
        return res.status(201).json({
            success: true, 
            Products: _products,
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
}
module.exports.getProduct  = async (req,res) => {
    const { _id } = req.params;

    try {
        let product = await Product.findById(_id);
        const productType = await ProductType.findById(product.ProductType);
        if(!product){
            return res.status(400).json({
                success: false, 
                message: 'No Product.'
            });
        }
        return res.status(201).json({
            success: true, 
            Product: {
                _id: product._id,
                name: product.name,
                image: product.image,
                description: product.description,
                evaluation: product.evaluation,
                ProductType: productType
            }
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
            return res.status(400).json({
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
                return res.status(400).json({
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
