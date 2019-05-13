const express =  require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Registro

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password});

    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success:false, msg: 'Campo para registrar o usuário inválido'}); 
        }else{
            res.json({success:true, msg: 'Usuário registrado'});
        }
    })

});


//Autenticação
router.post('/autenticacao', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: "O usuário não existe"});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 semana em segundos.
                });

            res.json({
                success:true,
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
            }else{
                return res.json({success: false, msg: "A senha está errada."});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log({user: req.user});
    res.json({user: req.user});
});

module.exports = router;