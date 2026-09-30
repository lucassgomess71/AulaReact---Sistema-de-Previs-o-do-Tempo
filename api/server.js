// Importa a biblioteca Express, responsavel 
// por criar o servidor e as rotas da API
import express from "express";

// Importa a biblioteca cors, que permite a comunicação
// entre aplicações executadas em portas diferentes (REACT E API)
import cors from "cors";

// Cria a instancia da aplicação Express
const app = express()

//Habilita o CORS para permitir requisições vindas do REACT

app.use(cors());

//Permite que a API receba e interprete dados no formato JSON 
app.use(express.json());

// vetor responsavel por armazenar temporariamente todas as consultas realizadas
// pelo usuario
let historico = [];

// METODO GET
// Utilzado para consultar informações
// ja armazenadas na API
// Rota responsavel por retornar todo o historico
app.get("/historico", (req, res) => {

// Envia a lista completa de consultas em formato json
res.json(historico);

});



app.post("/historico" , (req, res) => {

    // Adiciona os dados recebidos pelo react
    // ao vetor da historico (let historico)

    historico.push(req.body);

    res.json({
        mensagem: "Consulta Salva"
    })

});

// Inicia a API na porta 3000
app.listen(3000, () => {

console.log("Servidor rondando na porta 3000")

});