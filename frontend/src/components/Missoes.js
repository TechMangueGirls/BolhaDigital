import { useNavigate } from "react-router-dom";
import BottomNavigation from './BottomNavigation';
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

const Missoes = () => {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",         
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: "40px",
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
    marginBottom: "10px",
    fontSize: "1.8rem",
    wordWrap: "break-word",
  };

  const descriptionStyle = {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.1rem",
    wordWrap: "break-word",
  };

  const buttonStyle = {
    backgroundColor: "#0579b2",
    border: "none",
    color: "white",
    padding: "20px 24px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "16px auto",
    width: "100%",
    maxWidth: "500px",
    display: "block",
    textAlign: "left",
    boxSizing: "border-box",
    wordWrap: "break-word",
  };

  const spanStyle = {
    fontWeight: "normal",
    fontSize: "1rem",
    display: "block",
    marginTop: "6px",
    color: "white",
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
        <p style={descriptionStyle}>
          Explore suas missões abaixo e cumpra desafios para espalhar positividade!
        </p>

        <button style={buttonStyle} onClick={() => navigate("/post")}>
          Postagens
          <span style={spanStyle}>Veja e compartilhe as postagens mais recentes.</span>
        </button>

        <button style={buttonStyle} onClick={() => navigate("/recompensas")}>
          Recompensas
          <span style={spanStyle}>Acumule Bubbles e troque por recompensas.</span>
        </button>

        <button style={buttonStyle} onClick={() => navigate("/perfil")}>
          Perfil
          <span style={spanStyle}>Veja e personalize seu perfil.</span>
        </button>

        <button style={buttonStyle} onClick={() => navigate("/likes")}>
          Votação
          <span style={spanStyle}>Vote e contribua com uma bolha mais positiva.</span>
        </button>
      </div>

      <footer style={footerStyle}>
        <LogoutButton />
        <LogoFixa />
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Missoes;


