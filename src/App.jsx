import "./App.css";
import { useState } from "react";

function App() {
  const [cidade, setCidade] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [clima, setClima] = useState("");
  const [umidade, setUmidade] = useState("");

  async function consultarClima() {
    if (cidade.trim() === "") {
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
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=21da1b0054bc57d60afff851fa0b3734&units=metric&lang=pt_br`
      );
      const dados = await resposta.json();

      if (dados.cod !== 200) {
        alert("Cidade não encontrada!");
        return;
      }

      const novaTemperatura = `${dados.main.temp}°C`;
      const novoClima = dados.weather[0].description;
      const novaUmidade = `${dados.main.humidity}%`;

      setTemperatura(novaTemperatura);
      setClima(novoClima);
      setUmidade(novaUmidade);

      await fetch("http://localhost:3000/historico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cidade, temperatura: novaTemperatura, clima: novoClima, umidade: novaUmidade }),
      });
    } catch (error) {
      alert("Erro ao consultar o clima!");
    }
  }

  return (
    <div className="weather-app">
      <div className="ambient-shape ambient-shape-one" />
      <div className="ambient-shape ambient-shape-two" />
      <main className="weather-shell">
        <header className="topbar">
          <div className="brand"><span className="brand-mark">◒</span><span>clima / agora</span></div>
          <span className="status-pill"><span className="status-dot" /> dados ao vivo</span>
        </header>

        <section className="intro-block">
          <div><p className="eyebrow">Seu pulso atmosférico</p><h1>Leia o céu<br /><em>da sua cidade.</em></h1></div>
          <p className="intro-copy">Uma visão simples e precisa do tempo onde você está, atualizada em poucos segundos.</p>
        </section>

        <section className="search-panel" aria-label="Consultar clima">
          <div className="input-wrap"><span className="input-icon">⌕</span><input className="city-input" type="text" placeholder="Busque uma cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} onKeyDown={(e) => e.key === "Enter" && consultarClima()} /></div>
          <button className="search-button" onClick={consultarClima}>Ver previsão <span>↗</span></button>
        </section>

        <section className="weather-result" aria-live="polite">
          <div className="result-topline"><div className="location-lockup"><span className="location-icon">⌖</span><div><p className="label">Agora em</p><h2>{cidade || "Sua cidade"}</h2></div></div><span className="date-note">condição atual</span></div>
          <div className="main-reading"><div className="temperature-block"><span className="weather-symbol">☼</span><strong>{temperatura || "--°C"}</strong></div><div className="condition-block"><p className="label">Sensação do dia</p><strong>{clima || "Aguardando consulta"}</strong><p className="reading-caption">Informações meteorológicas em tempo real</p></div></div>
          <div className="metrics-grid"><div className="metric-card"><span className="metric-icon">◌</span><div><p className="label">Umidade</p><strong>{umidade || "--%"}</strong></div></div><div className="metric-card"><span className="metric-icon">↗</span><div><p className="label">Status</p><strong>{temperatura ? "Atualizado" : "Sem dados"}</strong></div></div></div>
        </section>

        <footer className="app-footer"><span>feito para olhar para cima</span><span className="footer-line" /><span>tempo real · clima local</span></footer>
      </main>
    </div>
  );
}

export default App;
