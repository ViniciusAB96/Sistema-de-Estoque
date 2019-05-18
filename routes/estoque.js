
const express =  require('express');
const router = express.Router();

const Produto = require('../models/produto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//registra determinado produto no meu estoque

router.post('/registrar', passport.authenticate('jwt', {session:false}), (req, res, nex) => {
    let newProduct = new Produto({
        codigoItem: req.body.codigoItem,
        dataEntrega: req.body.dataEntrega,
        tipo: req.body.tipo,
        marca: req.body.marca,
        tamanho: req.body.tamanho,
        cor: req.body.cor,
        valorEtiquetaCompra: req.body.valorEtiquetaCompra,
        valorPagoCompra: req.body.valorPagoCompra,
        valorMargemMax: req.body.valorMargemMax,
        precoSugerido: req.body.precoSugerido});

        Produto.addProduto(newProduct, (err, produto)=>{
        if(err){
            res.json({success:false, msg: 'Algum campo para registrar o produto está inválido'}); 
        }else{
            res.json({success:true, msg: 'Produto registrado'});
        }
    })

});

//Estoque --Me retorna todos os itens do meu estoque.
router.get('/itens_estoque', passport.authenticate('jwt', {session:false}), (req, res, nex) => {
    Produto.find({}, function(err, produtos) {
        var productMap = {};
    
        produtos.forEach(function(produtos) {
            productMap[produtos.codigoItem] = produtos;
        });
    
        res.json({produtos:productMap});  
      });
});


//Delete -- Deleta determinado item do meu estoque
router.delete('/delete/:id',  passport.authenticate('jwt', {session: false}), (req, res)=>{
    Produto.remove({_id:req.params.id}).then(()=>{
        console.log("Produto deletado com sucesso!");
        res.json({success:true, msg: 'Produto deletado com sucesso'}); 
        res.json({produto:req.user});
    }).catch((err)=>{
        console.log("Houve um erro ao tentar deletar o produto:" + err);
        res.json({success:false, msg: 'Erro ao deletar o produto.'});         
    })
})//estou passando o ID do produto na query string para que eu consiga deletar o produto, caso eu não esteja autorizado, eu não consigo deletar o produto.


//Atualiza determinado item do meu estoque.

router.post('/update/:id',  passport.authenticate('jwt', {session: false}), (req, res)=>{                

    Produto.findOneAndUpdate({codigoItem:req.body.codigoItem}, {$set:{
        codigoItem: req.body.codigoItem,
        dataEntrega: req.body.dataEntrega,
        tipo: req.body.tipo,
        marca: req.body.marca,
        tamanho: req.body.tamanho,
        cor: req.body.cor,
        valorEtiquetaCompra: req.body.valorEtiquetaCompra,
        valorPagoCompra: req.body.valorPagoCompra,
        valorMargemMax: req.body.valorMargemMax,
        precoSugerido: req.body.precoSugerido
    }}).then(()=>{
        console.log("Cadastro do  alterado com sucesso!");
        return res.json({success: true, msg: "Produto alterado com sucesso"});
    }).catch((err)=>{
        console.log("Houve um erro ao tentar atualizar o produto:" + err); 
        return res.json({success: false, msg: "houve um erro ao tentar alterar o produto"+err });
    });
});


router.get('/detalheProduto/:id',  passport.authenticate('jwt', {session: false}), (req, res)=>{  
    
    Produto.findOne({_id: req.params.id}).then((produto)=>{
        res.json({produto: produto});
        return res.json({success: true, msg: "houve um erro ao tentar alterar o produto"+err });     
    }). catch((error)=>{
        return res.json({success: false, msg: "houve um erro ao tentar alterar o produto"+err });

    });
});

module.exports = router;