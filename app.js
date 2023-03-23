/*
 * Objetivo: Criar uma API para manipulação de dados do WhatsApp 
 * Autor: Moreno
 * Data: 10/03/2023
 * Versão: 1.0
 * 
 */

 //  Import das dependencias para criar a API 

 const express = require('express')
 const cors = require('cors')
 const bodyparser = require('body-parser')
 const {response} = require('express')
 
 //Import do arquivo de funções
 const dadosWhatsApp = require('./modulo/fuction.js')
 //Objeto com as informações da classe express
 const app = express()
 
 app.use((request,response,next) =>{
 
     response.header('Access-Control-Allow-Origin', '*')
     response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
 
     app.use(cors())
     next()
 })

 app.use('/v1/whatsapp/usuarios', cors(), async function(request, response, next){
     const usuarios = dadosWhatsApp.getUsuarios()
     let statusCode = 200
     response.status(statusCode)
     response.json(usuarios)
 })

 app.use('/v1/whatsapp/contatos', cors(), async function(request, response, next){
    let nomeDoUsuario = request.query.nameUser
    let statusCode
    let contatos = {}

    if(nomeDoUsuario == '' || nomeDoUsuario == undefined || !isNaN(nomeDoUsuario)){
        statusCode = 400
        contatos.message = 'Não é possivel processar a requisição, pois o nome informado não atende a requisição.'
    }else{
        let listaDeContatos = dadosWhatsApp.getContatosUsuarios(nomeDoUsuario)

        if(listaDeContatos){
            statusCode = 200
            contatos = listaDeContatos
        }else{
            statusCode = 404
            contatos.message = 'Usúario não encontrado.'
        }
    }
    response.status(statusCode)
    response.json(contatos)
 })

 //Carregar os endPoints e aguarda a sua requisição
 //Protocolo HTTP 8080

 app.listen(8080, function(){
     console.log('Servidor rodando na porta 8080')
     
 })