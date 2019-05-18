const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Esquema do estoque

const ProdutoSchema = mongoose.Schema({
    codigoItem: {
        type: Number,
        required: true
    },
    dataEntrega: {
        type: Date,
        default: Date.now()
    },
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String
    },
    tamanho: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    valorEtiquetaCompra: {
        type: Number,
        required: true
    },
    valorPagoCompra: {
        type: Number,
        required: true
    },
    valorMargemMax: {
        type: Number,
        required: true
    },
    precoSugerido: {
        type: Number,
        required: true
    }
});

//estouq passando para o mongoose o nome do módulo e o Schema
const Produto = module.exports = mongoose.model('Produto', ProdutoSchema);


module.exports.getProdutoByID = function (id, callback){
    Produto.findByID(id, callback);
}

module.exports.getAllProducts = function (id, callback){
   /* Produto.find().sort({codigoItem: 'desc'}).then((produtos)=>{
        //console.log(produtos);
        
        return produtos;
        
    }).catch((error) => {
        return error;
    });
*/
/*    Produto.find({}, function(err, produtos) {
        var productMap = {};
    
        produtos.forEach(function(produtos) {
            productMap[produtos._id] = produtos;
        });
    
        return {produtos:productMap};  
      }).then(()=>{
        return {produtos:productMap};  
      }).catch(()=>{
       return ({success:false, msg: 'Não foi possível realizar a seleção em todos os produtos.'});
      });*/
}

module.exports.getProdutoBycodigoItem = function (codigoItem, callback){
    const query = {codigoItem: codigoItem}
    Produto.findOne(codigoItem, callback);
}

module.exports.addProduto = function(newProduto, callback){
    newProduto.save(callback); 
}
/*
module.exports.alterarProduto = function(req){
               
    Produto.findOneAndUpdate({_id:req.body.id}, {$set:{
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
}

*/