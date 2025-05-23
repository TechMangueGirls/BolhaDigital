import React from "react";
import BottomNavigation from "./BottomNavigation"; // Importação do footer

const Votacao = () => {
  return (
    <div className="votacao-container" style={{ paddingBottom: "70px" }}>
      <h1>Votação</h1>
      <p>Participe da votação abaixo!</p>

      <div className="votacao-container">
        <div className="card-votacao">
          <div className="comentario">"Mesmo sem te conhecer, espero que seu dia seja incrível!"</div>
          <div className="botoes-voto">
            <button className="positivo">Positivo</button>
            <button className="negativo">Negativo</button>
          </div>
        </div>

        <div className="card-votacao">
          <div className="comentario">"Acordar cedo é horrível, ninguém merece isso."</div>
          <div className="botoes-voto">
            <button className="positivo">Positivo</button>
            <button className="negativo">Negativo</button>
          </div>
        </div>
      </div>

      {/* Rodapé fixo */}
      <footer className="page-footer">
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Votacao;
