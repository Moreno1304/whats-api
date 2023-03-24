/*
 * Objetivo: Criar uma API para manipulação de dados do WhatsApp 
 * Autor: Moreno
 * Data: 10/03/2023
 * Versão: 1.0
 * 
 */

 //  Import das dependencias para criar a API 

// Responsavel pelas requisições
const express = require('express')

// Responsavel pelas permissões das requisições
const cors = require('cors')

// Responsavel pela manipulação do body da requisição
const bodyParser = require('body-parser')

// Import do arquivo de funções para manipular os contatos
const funcoes = require('./modulo/funcoes.js')

// Cria um objeto com as informações da classe express 
const app = express()

// Define as permissões no header da API
app.use((request, response, next) => {
    // Permite gerenciar a origem das requisições da API
    // * - Significa que a API será publica 
    // IP - Se colocar o IP, a API somente responderá para aquela máquina 
    response.header('Access-Control-Allow-Origin', '*')

    // Permite gerenciar quais verbos (metodos) poderão fazer requisições 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa no cors das requisições as permissões estabelecidas
    app.use(cors())

    next()
})

// endPoints
let statusCode
let dadosConta = {}

// endPoint
app.get('/v1/senai/conta', cors(), async function (request, response, next) {

    let numeroConta = request.query.number
    // let cep = request.query.cep

    if (numeroConta == '' || numeroConta == undefined || isNaN(numeroConta)) {
        statusCode = 400
         dadosConta.message = "Não é possivel processar a requisição pois o número está incorreto"
    } else {
        let conta = funcoes.getConta(numeroConta)

        if (conta) {
            statusCode = 200
            dadosConta = conta
        } else {
            statusCode = 400
        }
    }
    response.status(statusCode)
    response.json(dadosConta )

})

//  Permite carregar os endpoint criados e aguadar as requisições
//pelo protocolo HTTP na porta 8080
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');
})