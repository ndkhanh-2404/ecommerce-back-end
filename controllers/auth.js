const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

module.exports.signup = (req,res,next) => {
    User.findOne({ email: req.body.email })
    .exec((err, user )=>{
        if(err){
            return res.status(400).json({
                message: err.message,
                success: false
            });
        }
        if(user){
            return res.status(400).json({
                message:'Email already registed.',
                success: false
            })
        }
        const { name, username,email,password, phoneNumber } = req.body;
        const _user = new User({ 
            firstName: name.firstName,
            lastName: name.lastName,
            email,
            password,
            username,
            phoneNumber
        });
        _user.save((error,data) =>{
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong.'
                });
            }

            if(data){
                return res.status(201).json({
                    user: data
                });
            }
        });
    })
};

module.exports.signin = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error,user) => {
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn: "1h"});
                const {_id, firstName,lastName, username, email, role, phoneNumber } = user;
                return res.status(200).json({
                    token,
                    user: {
                        _id, 
                        username,
                        name:{
                            firstName,
                            lastName,
                        },
                        email,
                        phoneNumber,
                        role
                    }
                })
            }else{
                return res.status(400).json({success:false, message: "Invalid password."});
            }
        }else{
            return res.status(400).json({success:false, message: 'Something went wrong.'});
        }
    });
};