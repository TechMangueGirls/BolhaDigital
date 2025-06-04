import { useNavigate } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import LogoFixa from "./LogoFixa";
import LogoutButton from "./LogoutBottom";

const MissoesDiarias = () => {
  const navigate = useNavigate();

  const missoes = [
    { titulo: "Dia", descricao: "Denuncie (em qualquer rede social), um comentário ofensivo", pontos: 100, rota: "/missao/dia" },
    { titulo: "Arte", descricao: "Elogie um artista (Desenhos, pinturas, canto, artesanato, etc)", pontos: 100, rota: "/missao/arte" },
    { titulo: "Música", descricao: "Indique uma música que faz você se sentir bem", pontos: 100, rota: "/missao/musica" },
    { titulo: "Filme", descricao: "Indique um filme que faz você se sentir bem", pontos: 100, rota: "/missao/filme" },
  ];

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: "80px",
    paddingLeft: "10px",
    paddingRight: "10px",
    boxSizing: "border-box",
  };

  const contentStyle = {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    flexGrow: 1,
  };

  const titleStyle = {
    color: "#0579b2",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.8rem",
    wordWrap: "break-word",
    fontWeight: "bold",
  };

  const cardStyle = {
    backgroundColor: "#00AEEF",
    borderRadius: "15px",
    color: "white",
    padding: "16px",
    marginBottom: "16px",
    position: "relative",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const missionTitle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
  };

  const missionDescription = {
    fontSize: "0.95rem",
    marginTop: "6px",
  };

  const pointsStyle = {
    position: "absolute",
    top: "12px",
    right: "16px",
    fontSize: "0.9rem",
    backgroundColor: "#fff",
    color: "#0579b2",
    borderRadius: "10px",
    padding: "4px 8px",
    fontWeight: "bold",
  };

  const arrowIconStyle = {
    position: "absolute",
    bottom: "12px",
    right: "16px",
    width: "20px",
    height: "20px",
  };

  const saldoButtonStyle = {
    backgroundColor: "#00AEEF",
    color: "white",
    border: "none",
    padding: "20px 24px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "30px auto",
    width: "100%",
    maxWidth: "500px",
    display: "block",
    textAlign: "left",
    boxSizing: "border-box",
    wordWrap: "break-word",
  };

  const footerStyle = {
    padding: "10px 0",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Missões</h1>

        {missoes.map((missao, index) => (
          <div
            key={index}
            style={cardStyle}
            onClick={() => navigate(missao.rota)}
          >
            <div style={missionTitle}>{missao.titulo}</div>
            <div style={missionDescription}>{missao.descricao}</div>
            <div style={pointsStyle}>{missao.pontos} pontos</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={arrowIconStyle}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        ))}

        <button
          style={saldoButtonStyle}
          onClick={() => navigate("/recompensas")}
        >
          Saldo e recompensas
        </button>
      </div>

      <footer style={footerStyle}>
        <BottomNavigation />
        <LogoFixa />
        <LogoutButton />
      </footer>
    </div>
  );
};

export default MissoesDiarias;
