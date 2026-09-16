//Importando hook da biblioteca react 
// Ele permite armazenar valores e atualizar a tela automaticamente 
import { useState } from "react";

//cria o componente principal da aplicação
function App() {
  //const responsavel por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");

  // const reponsavel por armazenar a temperaratura da cidade
  const [temperatura, setTemperatura] = useState("");

  // const reponsavel por armazenar o clima da cidade
  const [clima, setClima] = useState("");

  //const reponsavel por armazenar a umidade da cidade
  const [umidade, setUmidade] = useState("");

  // função responsavel para executar quando o usuario clicar no botão consultarClima
  function consultarClima() {
    // verifica se a cidade e são paulo
    if (
      cidade.toLowerCase() === "são paulo" ||
      cidade.toLowerCase() === "sao paulo"
    ) {
      // Atualiza a temperatura
      setTemperatura("24°");
      // atualiza a condição climatica
      setClima("Ensolarado");
      // atualiza a umidade
      setUmidade("60%");
    }

    else if (cidade.toLowerCase() === "Curitiba") {

      setTemperatura("17°");

      setClima("Chuvoso");

      setUmidade("85%")

    }

    else if (cidade.toLowerCase() === "Brasília") {

      setTemperatura("21°");

      setClima("Nublado");

      setUmidade("45%")

    }

    else if (cidade.toLowerCase() === "Rondonia") {

      setTemperatura("24°");

      setClima("Chuvoso");

      setUmidade("35%")

    }
    else if (cidade.toLowerCase() === "Pernambuco") {

      setTemperatura("30°");

      setClima("Muito Calor");

      setUmidade("60%")

    }
    else if (cidade.toLowerCase() === "Rio de janeiro") {

      setTemperatura("32°");

      setClima("Ensolarado");

      setUmidade("70%")

    }

    // executa caso a cidade não esteja cadastrada
    else {

      setTemperatura("--");

      setClima("Cidade não Cadastrada");

      setUmidade("--");

    }

  }

  // Retorna a interface visual do sistema
  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      {/* Título Principal */}
      <h1>Sistema de Previsão do Tempo</h1>

      {/* Campo para digitação */}
      <input
        // Tipo de Campo
        type="text"

        // Texto exibido dentro da caixa
        placeholder="Digite sua Cidade"

        //valor vinculado ao estado cidade
        value={cidade}

        // atualiza o estado quando o usuario digita
        onChange={(e) => setCidade(e.target.value)}
      />

      {/* Botão de Consulta */}

      <button

      onClick={consultarClima}

      style={{
        marginLeft:"10px"
      }}
>

        {/* Texto exibido no Botão */}
        Consultar
      </button>
      {/* Linha Horizontal para separa sessões */}
      <hr />

      {/* Exibe a cidade informada */}
      <h2>Cidade: {cidade}</h2>

      {/* Exibe a temperatura */}
      <h2>Temperatura: {temperatura}</h2>

      {/* Exibe condição climatica  */}
      <h2>Clima: {clima}</h2>


      {/* Exibe a umidade */}
      <h2>Umidade: {umidade}</h2>

 
    
    </div>

  );
}

// Exporta o componente App para ser utilizado no react
export default App;