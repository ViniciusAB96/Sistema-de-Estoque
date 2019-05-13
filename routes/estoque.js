
const express =  require('express');
const router = express.Router();

const Produto = require('../models/produto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


router.post('/registrar', (req, res, nex) => {
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

//Estoque
router.get('/itens_estoque', passport.authenticate('jwt', {session:false}), (req, res, nex) => {
    produtos = Produto.getAllProducts();

    console.log(produtos);
   /* produtos.forEach(function(produto) {
        produtsMap[produto._id] = produto;
    });
   console.log(produtsMap);
   res.json(Produto.getAllProducts());*/
});

//Cadastro de produtos
router.get('/cadastroProdutos', passport.authenticate('jwt', {session:false}), (req, res, nex) => {
    res.send("Cadastro de produtos");
});

module.exports = router;