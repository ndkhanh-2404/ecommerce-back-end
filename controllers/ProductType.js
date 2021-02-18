const ProductType = require('../models/ProductType.js');


module.exports.getFullProductType = async (req,res) => {
    try {
        const productTypes = await ProductType.find();
        if(productTypes.length === 0){
            return res.status(401).json({
                success: false, 
                message: 'No Product Types.'
            });
        }
        return res.status(201).json({
            success: true, 
            ProductTypes: productTypes
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
    
};

module.exports.postProductType = async (req,res) => {
    const { name, image } = req.body;

    try {
        const productType = await ProductType.findOne({ name, image});

        if(productType){
            return res.status(402).json({
                success: false, 
                message: 'Product Type already existed.'
            });
        }
    
        const newProductType = new ProductType({name, image});

        await newProductType.save();

        return res.status(201).json({
            success: true, 
            ProductType: newProductType
        });
    } catch (error) {
        return res.status(404).json({
            success: false, 
            message: error.message
        });
    }
};

