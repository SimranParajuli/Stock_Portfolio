let express = require('express')
let app = express();
app.set('view-engine', 'ejs');

const User = require('../userModel');
const bodyParser=require('body-parser')
const {parse}=require('querystring');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../Middlewares/validation');
const verifyToken = require('../Middlewares/verifyToken');
const { verify } = require('crypto');

dotenv.config();

exports.new =async function (req, res) {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error);

    // const emailExist = User.findOne({email: req.body.email});
    // if(emailExist) return res.status(400).send("Email already exists");

    // const salt = bcrypt.genSalst(10);
    // const hashedPassword = bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try{
        const savedUser =await user.save();
        res.send(savedUser);
    }catch (err){
        res.status(400).send(err);
    }
};


exports.view = function (req, res) {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("is not found");

    const validPass =bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    const token = jwt.sign({name: user.name}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

};
