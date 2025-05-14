import React from "react";

const Votacao = () => {
  return (
    <div className="votacao-container">
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
    </div>
  );
};

export default Votacao;
