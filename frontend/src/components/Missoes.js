import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from './BottomNavigation';

const Missoes = () => {
  const navigate = useNavigate();

  return (
    <div className="missoes-container" style={{ paddingBottom: "70px" }}>
      <h1>Missões</h1>
      <p>Explore suas missões abaixo e cumpra desafios para espalhar positividade!</p>

      <div className="missoes-grid">
        <div className="card-button" onClick={() => navigate("/post")}>
          <strong>Postagens</strong>
          <span>Veja e compartilhe as postagens mais recentes.</span>
        </div>

        <div className="card-button" onClick={() => navigate("/recompensas")}>
          <strong>Recompensas</strong>
          <span>Acumule Bubbles e troque por recompensas.</span>
        </div>

        <div className="card-button" onClick={() => navigate("/perfil")}>
          <strong>Perfil</strong>
          <span>Veja e personalize seu perfil.</span>
        </div>

        <div className="card-button" onClick={() => navigate("/likes")}>
          <strong>Votação</strong>
          <span>Vote e contribua com uma bolha mais positiva.</span>
        </div>
      </div>

      {/* Rodapé fixo */}
      <footer className="missoes-footer">
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Missoes;


