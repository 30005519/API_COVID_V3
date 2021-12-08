const PORTA = process.env.PORT || 9090; // Porta do servidor
const express = require("express"); // Carrega o framework Express
const axios = require('axios')
const cheerio = require ('cheerio')
const {response} = require('express')
const app = express(); // Construtor que inicializa uma aplicação Express


app.use(express.json()); // Faz o parse (validação e interpretação) de solicitações do tipo application/json
app.use(express.urlencoded({ extended: true })); // Faz o parse do conteúdo tipo application/x-www-form-urlencoded
require("./rotas/rotas")(app);

app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta ${PORTA}`);
});
app.use(express.static('public'));

