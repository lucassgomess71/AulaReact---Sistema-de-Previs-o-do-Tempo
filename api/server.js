import express from "express";

import cors from "cors";

// importa o modulo fs (file System)
// Este modulo permite ler e escrever arquivos utilizando JavaScript
import fs from "fs";

// importa a conexao criada com o Firebsa
import db from "./firebase,js";

import {
    ref,
    push
} from "firebase/database";


const app = express();

app.use(cors());

// Permite que a API receba e interprete dados no formato JSON
app.use(express.json());


let historico = [];

// Verifica se o arquivo historico.json existe.
// Caso exista, os dados serão carregados
// para dentro do vetor historico
if (fs.existsSync("./api/historico.json")) {

    const dadosArquivo = fs.readFileSync(
        "./api/historico.json",
        "utf8"
    );

    try {
        if (dadosArquivo.trim() !== "") {
            historico = JSON.parse(dadosArquivo);
        } else {
            historico = [];
        }
    } catch {
        historico = [];
    }
}

app.get("/historico", (req, res) => {
    res.json(historico);
});

app.post("/historico", async (req, res) => {
    historico.push(req.body);

    // Cria uma referencia chamada "historico" dentro do Firebase
    // caso ela não exista, o Firebase será criado automaticamente
    const referenciaFirebase = ref(
        db,
        "historico"
    );

    // Salva uma copia dos dados , tambem no Firebase
    // realtime database
    await push(
        referenciaFirebase,
        req.body
    );

    //converte o array JavaScript para formato JSON.
    // O numero 2 deixa o arquivo organizando e legível.
    const historicoJson = JSON.stringify(
        historico,
        null,
        2
    );
    // Salva os dados atualizados no arquivo historico.json
    // Assim os registros permanecem armazenados mesmo apos desligar o servidor
    fs.writeFileSync(
        "./api/historico.json",
        historicoJson
    );

    // Retorna uma mensagem informando que o registro foi salvo com sucesso.
    res.json({
        mensagem: "Consulta salva"
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});