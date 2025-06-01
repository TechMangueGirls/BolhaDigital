import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

const Votacao = () => {
  const frases = [
    "Cyberbullying é crime, sendo a prática de ofender, humilhar ou ameaçar alguém na internet pode levar à punição conforme a Lei 13.185/2015.",
    "Palavras machucam e espalhar ódio nas redes pode causar danos emocionais profundos, por isso use sua voz para apoiar, não ferir."
  ];

  const comentarioStyle = {
    fontSize: "1.1rem",
    marginBottom: "12px",
    color: "#333",
    textAlign: "center",
    padding: "0 16px"
  };

  const buttonLikeStyle = {
    backgroundColor: "#28a745", 
    border: "none",
    color: "white",
    padding: "16px",
    fontSize: "1.5rem",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "8px"
  };

  const buttonDislikeStyle = {
    backgroundColor: "#dc3545", 
    border: "none",
    color: "white",
    padding: "16px",
    fontSize: "1.5rem",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "8px"
  };

  const containerStyle = {
    backgroundColor: "#fff",
    paddingTop: "40px",
    textAlign: "center",
    minHeight: "100vh"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#0579b2", marginBottom: "10px" }}>Votação</h1>
      <p style={{ marginBottom: "30px" }}>
        Leia as frases abaixo e diga se você apoia essa mensagem.
      </p>

      {frases.map((frase, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <div style={comentarioStyle}>{frase}</div>
          <div>
            <button
              style={buttonLikeStyle}
              aria-label="Curtir"
              title="Curtir"
            >
              <FaThumbsUp />
            </button>
            <button
              style={buttonDislikeStyle}
              aria-label="Não curtir"
              title="Não curtir"
            >
              <FaThumbsDown />
            </button>
          </div>
        </div>
      ))}

      <footer>
        <LogoutButton />
        <LogoFixa />
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Votacao;


