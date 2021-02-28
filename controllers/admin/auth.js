const User = require('../../models/User.js');
const jwt = require('jsonwebtoken');

module.exports.signup = (req,res,next) => {
    User.findOne({ email: req.body.email })
    .exec((err,user) => {
        if(user) {
            return res.status(400).json({
                success:false,
                message: 'Admin already registed.'
            })
        }
        
        const {
            name,
            email,
            username,
            phoneNumber,
            password
        } = req.body;

        const _user = new User({
            firstName: name.firstName,
            lastName: name.lastName,
            email,
            password,
            phoneNumber,
            username,
            role: "admin"
        });

        _user.save((error, data) =>{
            if(error){
                return res.status(400).json({
                    success:false,
                    message: 'Something went wrong.'
                });
            }

            if(data){
                return res.status(201).json({
                    success:true,
                    admin: data
                });
            }
        })
    });
};

module.exports.signin = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error,user) => {
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                if(user.role === 'admin'){
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn: "1h"});
                    const {_id,  firstName,lastName ,phoneNumber, username, email, role} = user;
                    return res.status(200).json({
                        token,
                        user: {
                            _id, 
                            name: {
                                firstName,
                                lastName
                            }, 
                            email,
                            phoneNumber,
                            username,
                            role
                        }
                    })
                }else{
                    return res.status(400).json({success:false, message: "Admin access denied."});
                }
            }else{
                return res.status(400).json({success:false, message: "Invalid password."});
            }
        }else{
            return res.status(400).json({success:false, message: 'Something went wrong.'});
        }
    });
};