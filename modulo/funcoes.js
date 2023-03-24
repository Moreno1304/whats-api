var contatosJson = require('./contatos.js')

function getConta(contato) {

    let arrayContatos = contato
    let contatoArray = []
    let contatosJSON = false;

    contatosJson.contatos['whats-users'].forEach(function (numero) {

        if (numero.number == arrayContatos) {
            numero.contacts.forEach(function (contato) {
                contatoArray.push(contato)
            })
        } 
    })

    if(arrayContatos.length > 0){
        contatosJSON = {}
        contatosJSON.contatos = contatoArray
    }

    return contatosJSON

}
module.exports = {
    getConta
  }   
//  console.log(getConta('11966578996'));