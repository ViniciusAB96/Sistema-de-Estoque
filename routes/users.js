const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
                    expiresIn: 900 //15 horas, em segundos.
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

router.delete('/delete/:id',  passport.authenticate('jwt', {session: false}), (req, res)=>{
    User.remove({_id:req.params.id}).then(()=>{
        console.log("Usuário deletado com sucesso!");
        res.json({success:true, msg: 'Usuário deletado com sucesso'}); 
        res.json({user:req.user});
    }).catch((err)=>{
        console.log("Houve um erro ao tentar deletar o usuário:" + err);
        res.json({success:false, msg: 'Erro ao deletar o usuário.'});         
    })
})//estou passando o ID na query string para que eu consiga deletar o usuário, caso eu não esteja autorizado, eu não consigo deletar o usuário.

router.post('/update', (req, res)=>{     
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;            
            req.body.password = hash;
            console.log(hash);
            console.log(req.body.password);
           
           
            User.findOneAndUpdate({_id:req.body.id}, {$set:{
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }}).then(()=>{
                console.log("Usuário alterado com sucesso!");
                return res.json({success: true, msg: "Usuário alterado com sucesso"});
            }).catch((err)=>{
                console.log("Houve um erro ao tentar atualizar o usuário:" + err); 
                return res.json({success: false, msg: "houve um erro ao tentar alterar o usuário"+err });
            });
        });
    });   
});

module.exports = router;