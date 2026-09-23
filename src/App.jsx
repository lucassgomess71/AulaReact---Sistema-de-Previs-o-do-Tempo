//Importando o arquivo css para usar o CSS
import "./App.css";

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

  // função executada quando o usario clicar no botão consultarClima
  async function consultarClima() {

    // Verifica se o campo está vazio
    if (cidade === "") {
      alert("Digite uma cidade!");
      return;
    }

    if (cidade.trim().toLowerCase() === "hogwarts") {
      setTemperatura("18°C");
      setClima("Encantado e nublado");
      setUmidade("72%");
      return;
    }

    try {
      // Faz a requisição para a API 
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=21da1b0054bc57d60afff851fa0b3734&units=metric&lang=pt_br`

      );

      // Converte a resposta para JSON
      const dados = await resposta.json();
        
      // verifica se a cidade foi encontrada
      if (dados.cod !== 200) {
        alert("Cidade não encontrada!");
        return;
      }
      
      // Atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");

      // atualiza a condição climatica
      setClima(dados.weather[0].description); 
      
     // atualiza a umidade
      setUmidade(dados.main.humidity + "%");
  } catch (error) {
    alert("Erro ao consultar o clima!");
  }
}
  // função responsavel para executar quando o usuario clicar no botão consultarClima
  /* function consultarClima() {
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

  } */

  // Retorna a interface visual do sistema
  return (
    <div className="weather-app">
      <div className="weather-card">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">☀️</span>
            <span>TempoNow</span>
          </div>
          <span className="status-pill">Ao vivo</span>
        </header>

        <div className="welcome-block">
          <p className="eyebrow">Previsão em tempo real</p>
          <h1>Sistema de Previsão do Tempo</h1>
        </div>

        <div className="search-panel">
          <input
            className="city-input"
            type="text"
            placeholder="Digite sua cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <button className="search-button" onClick={consultarClima}>
            Consultar
          </button>
        </div>

        <div className="weather-result">
          <div className="result-header">
            <span className="result-icon">📍</span>
            <div>
              <p className="label">Cidade</p>
              <h2>{cidade || "Sua cidade"}</h2>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-icon">🌡️</span>
              <div>
                <p className="label">Temperatura</p>
                <strong>{temperatura || "--°C"}</strong>
              </div>
            </div>

            <div className="metric-card">
              <span className="metric-icon">☁️</span>
              <div>
                <p className="label">Clima</p>
                <strong>{clima || "Aguardando consulta"}</strong>
              </div>
            </div>

            <div className="metric-card full-width">
              <span className="metric-icon">💧</span>
              <div>
                <p className="label">Umidade</p>
                <strong>{umidade || "--%"}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente App para ser utilizado no react
export default App;