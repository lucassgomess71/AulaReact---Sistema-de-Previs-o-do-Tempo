// Conectando nosso banco de dados
// RealTime Database do Firebase

// Importa as funções para inicializar o firebase
import { initializeApp } from "firebase/app";

// Importa as função responsavel por conectar o realtime database
import { getDatabase } from "firebase/database";

// Configurações do projeto Firebase
//
// Essas informações são geradas automaticamente
// pelo Firebase quando o projeto é criado
//
// Elas funcionam como um endereço que permite que nosa aplicação encontre e se conecte
// ao banco de dados na nuvem.

const firebaseConfig = {

    // Identificador unico do aplicativo
    apiKey: "AIzaSyDGj2HLIWi1_YPT26xIPfKyHkahtW5aNUA",

    // Dominio de autenticação do projeto 
    authDomain: "sistemaprevisaotempo.firebaseapp.com",
    
    // Endereço do realtime database 
    databaseURL: "https://sistemaprevisaotempo-default-rtdb.firebaseio.com",

    // Identificador do projeto
    projectId: "sistemaprevisaotempo",
    
    // Serviço de armazenamento de arqquivos do projeto
    storageBucket: "sistemaprevisaotempo.firebasestorage.app",

    // Identificador resposanvel pela troca de mensagens
    messagingSenderId: "510342680421",

    // indentificador unico do aplicativo web
    appId: "1:510342680421:web:ef8e71ce44c6cc7cab9b8c",

    // identificador utilizado pelo Google Analytics para medir o uso do aplicativo
    measurementId: "G-9EX58MRJTQ"

}

// Inicialização do firebase utilizando as configurações acima
const app = initializeApp(firebaseConfig);

// Conexão com o Realtime Database
//
// a partir deste objeto será possível:
// . ler dados
// . salvar dados
// . atualizar dados
// . Excluir dados
const db = getDatabase(app);

// Exporta a conexão para que ela possa ser utilizada em outros arquivos
// como o server.js
export default db;

