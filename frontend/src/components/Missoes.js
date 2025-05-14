import React from "react";
import { useNavigate } from "react-router-dom";

const Missoes = () => {
  const navigate = useNavigate();

  return (
    <div className="missoes-container">
      <h1>Missões</h1>
      <p>Explore suas missões abaixo e cumpra desafios!</p>

      <div className="container">
        <div className="card-button posts" onClick={() => navigate("/postagem")}>
          <strong>Postagens</strong>
          <span>Veja as postagens mais recentes.</span>
        </div>

        <div className="card-button recompensas" onClick={() => navigate("/recompensas")}>
          <strong>Recompensas</strong>
          <span>Confira as recompensas que você pode ganhar.</span>
        </div>

        <div className="card-button perfil" onClick={() => navigate("/perfil")}>
          <strong>Perfil</strong>
          <span>Veja e edite seu perfil.</span>
        </div>

        <div className="card-button votacao" onClick={() => navigate("/votacao")}>
          <strong>Votação</strong>
          <span>Participe da votação das missões.</span>
        </div>
      </div>
    </div>
  );
};

export default Missoes;
