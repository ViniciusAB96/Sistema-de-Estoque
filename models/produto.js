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
    Produto.find().sort({codigoItem: 'desc'}).then((produtos)=>{
        //console.log(produtos);
        
        return produtos;
        
    }).catch((error) => {
        return error;
    });
}

module.exports.getProdutoBycodigoItem = function (codigoItem, callback){
    const query = {codigoItem: codigoItem}
    Produto.findOne(codigoItem, callback);
}

module.exports.addProduto = function(newProduto, callback){
    newProduto.save(callback); 
}

